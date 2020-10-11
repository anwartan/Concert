import db from "@react-native-firebase/firestore";
import React, { useState } from "react";
import {
  Alert, Image, PermissionsAndroid, StyleSheet, TouchableOpacity, View,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import {
  Button, Gap, Input, Link,
} from "../../components/atoms";
import { Header } from "../../components/molecules";
import { useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState(user);
  const onChange = (val, field) => {
    setData({ ...data, [field]: val });
  };
  const save = () => {
    db().collection("user").doc(user?.uid).update(data)
      .then((res) => {
        dispatch({ type: "UPDATE_USER", user: data });
        Alert.alert("Information", "Successfull");
      })
      .catch((err) => {
        Alert.alert("Information", "Failed");
      });
  };
  const verify = () => {
    db().collection("user").doc(user?.uid).get()
      .then((res) => {
        console.log(res.data());
        if (res.data().ktp && res.data().verified === false) {
          Alert.alert("Information", "Waiting from Administrator");
        } else if (res.data().verified) {
          Alert.alert("Information", "Account was verified");
        } else {
          navigation.navigate("VerifyAkun");
        }
      });
  };
  const chooseImage = async () => {
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
            onChange(datagambar, "gambar");
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <Header
        title="Edit Account"
        type="with-backButton"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={chooseImage}>
          <Image style={styles.image} source={{ uri: data.gambar }} />
          <Gap height={20} />
        </TouchableOpacity>
        <Input placeHolder="Full Name" value={data.nama} onChange={(val) => onChange(val, "nama")} />
        <Gap height={10} />
        <Input editable={false} placeHolder="Email" value={data.email} onChange={(val) => onChange(val, "email")} />
        <Gap height={10} />

        <Input
          type="picker"
          text="Choose Gender"
          selectedValue={data.gender}
          item={[{ nama: "Laki-laki" }, { nama: "Perempuan" }]}
          onChange={(val) => onChange(val, "gender")}
        />
        <Gap height={20} />
        <Button text="Save" onPress={save} />
        <Gap height={20} />
        <Link text="Verified Account" size={20} onPress={verify} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
});
