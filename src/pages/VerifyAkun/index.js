import React, { useState, useEffect } from "react";
import {
  Alert, Image, PermissionsAndroid, StyleSheet, Text, View,
} from "react-native";
import db from "@react-native-firebase/firestore";
import ImagePicker from "react-native-image-picker";
import { Button, Gap, Input } from "../../components/atoms";
import { Header } from "../../components/molecules";
import { useStateValue } from "../../utils";
import { ILGambar } from "../../assets";

const index = ({ navigation }) => {
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState({
    ktp: "",
  });
  const [gambar1, setGambar] = useState("");
  const onChange = (val, field) => {
    setData({ ...data, [field]: val });
  };
  useEffect(() => {

  }, []);
  const verifiedAccount = async () => {
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
        ImagePicker.launchCamera(options, (response) => {
        //   const source = { uri: response.uri };
          if (!response.didCancel) {
            const datagambar = `data:${response.type};base64, ${response.data}`;
            setGambar(datagambar);
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const send = () => {
    if (data.ktp && gambar1) {
      db().collection("user").doc(user?.uid).update({ ktp: data.ktp, gambarktp: gambar1 })
        .then((res) => {
          Alert.alert("Information", "Successfull");
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Information", "Failed");
        });
    } else {
      Alert.alert("Information", "No KTP or Picture is not exist");
    }
  };

  return (
    <View>
      <Header
        title="Verify Promotor"
        type="with-backButton"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>

        <Input placeHolder="No KTP" value={data.alamat} onChange={(val) => onChange(val, "ktp")} />
        <Gap height={10} />
        <Image source={gambar1 !== "" ? { uri: gambar1 } : ILGambar} style={{ width: "100%", height: 300 }} />
        <Gap height={10} />

        <Button text="Take Picture" onPress={verifiedAccount} />
        <Gap height={10} />
        <Button text="Verify" onPress={send} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});
