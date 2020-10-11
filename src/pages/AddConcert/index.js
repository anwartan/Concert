import db from "@react-native-firebase/firestore";
import React, { useState } from "react";
import {
  Alert, Image, PermissionsAndroid, StyleSheet, View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-picker";
import { useEffect } from "react/cjs/react.development";
import { ILGambar } from "../../assets";
import { Button, Gap, Input } from "../../components/atoms";
import { Header } from "../../components/molecules";
import { useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [data, setData] = useState({
    nama: "",
    harga: "",
    kategori: "",
    deskripsi: "",
    banner: "",
    awaldate: "",
    awaltime: "",
    akhirdate: "",
    akhirtime: "",
  });
  const [start, setStart] = useState({
    awaldate: "",
    awaltime: "",
  });
  const [end, setEnd] = useState({
    akhirdate: "",
    akhirtime: "",
  });
  const [kategori, setKategori] = useState([]);
  const setState = (val, field) => {
    setData({ ...data, [field]: val });
  };

  useEffect(() => {
    db().collection("kategori").get().then((res) => {
      const temp = [];
      res.forEach((item) => {
        temp.push({
          nama: item.data().nama,
        });
      });
      setKategori(temp);
    });
  }, []);

  const add = () => {
    const a = Object.values(data).every((o) => o !== "");
    const tmp = {
      ...data,
      like: 0,
      unlike: 0,
      penonton: 0,
      pendaftar: 0,
      idUser: user.uid,

    };
    if (a) {
      db().collection("acara").add(tmp).then((res) => {
        Alert.alert("Information", "Successfull");
        navigation.goBack();
      })
        .catch((err) => {
          Alert.alert("Information", "Failed");
        });
    } else {
      Alert.alert("Information", "All data is required");
    }
    console.log(data);
  };

  const takeBanner = async () => {
    const options = {

      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      quality: 0.5,
      axWidth: 200,
      maxHeight: 200,
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera "
            + "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchImageLibrary(options, (response) => {
        //   const source = { uri: response.uri };
          if (!response.didCancel) {
            const datagambar = `data:${response.type};base64, ${response.data}`;
            setState(datagambar, "banner");
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const change = (event) => {

  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Add Concert"
        type="with-backButton"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>

        <View style={styles.wrapper}>
          <Input
            placeHolder="Event Name"
            value={data.nama}
            onChange={(val) => setState(val, "nama")}
          />
          <Gap height={20} />
          <Input
            placeHolder="Price"
            value={data.harga}
            onChange={(val) => setState(val, "harga")}
          />
          <Gap height={20} />
          <Input
            type="datetime"
            mode="date"
            text="Start Date"
            onChange={(val) => setData({ ...data, awaldate: val })}
            value={new Date()}
          />
          <Gap height={20} />
          <Input
            text="Start Time"
            type="datetime"
            mode="time"
            onChange={(val) => setData({ ...data, awaltime: val })}
            value={new Date()}

          />
          <Gap height={20} />
          <Input
            type="datetime"
            mode="date"
            text="Edd Date"
            value={new Date()}
            onChange={(val) => setData({ ...data, akhirdate: val })}

          />
          <Gap height={20} />
          <Input
            text="End Time"
            type="datetime"
            mode="time"
            value={new Date()}
            onChange={(val) => setData({ ...data, akhirtime: val })}

          />
          <Gap height={20} />
          <Input
            type="picker"
            text="Choose Category"
            selectedValue={data.kategori}
            item={kategori}
            onChange={(val) => setState(val, "kategori")}
          />
          <Gap height={20} />
          <Input
            placeHolder="Description"
            value={data.deskripsi}
            onChange={(val) => setState(val, "deskripsi")}
          />
          <Gap height={20} />
          <Image source={data.banner !== "" ? { uri: data.banner } : ILGambar} style={{ width: "100%", height: 200 }} />
          <Gap height={20} />

          <Button text="Take Banner" onPress={takeBanner} />
          <Gap height={20} />
          <Button text="Add Concert" onPress={add} />

        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});
