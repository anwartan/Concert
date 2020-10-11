import React, { useEffect, useState } from "react";
import {
  Alert,
  Image, PermissionsAndroid, StyleSheet, View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-picker";
import db from "@react-native-firebase/firestore";
import {
  Button, Gap, Input, Text,
} from "../../components/atoms";
import { Header, PaymentDetail } from "../../components/molecules";
import { useStateValue } from "../../utils";

const index = ({ navigation, route }) => {
  const { data } = route.params;
  const [{ user }] = useStateValue();
  const [pesanan, setPesanan] = useState({
    idAcara: data.id,
    idUser: user.uid,
    namaAcara: data.nama,
    awaldate: data.awaldate,
    awaltime: data.awaltime,
    buktiPembayaran: "",
    noRekening: "",
    total: data.harga,
  });
  const set = (val, field) => {
    setPesanan({ ...pesanan, [field]: val });
  };
  const chooseImage = async () => {
    const options = {

      title: "Select Picture",
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
        ImagePicker.showImagePicker(options, (response) => {
        //   const source = { uri: response.uri };
          if (!response.didCancel) {
            const datagambar = `data:${response.type};base64, ${response.data}`;
            set(datagambar, "buktiPembayaran");
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkout = () => {
    const a = Object.values(pesanan).every((o) => o !== "");
    if (a) {
      db().collection("tiket").add(pesanan).then((res) => {
        Alert.alert("Information", "Successfull");
      })
        .catch((err) => {
          Alert.alert("Information", "Failed");
        });
      navigation.goBack();
    } else {
      Alert.alert("Information", "Please check again");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const temp = {
        nama: user?.nama,
        gender: user?.gender,
        email: user?.email,
      };
      const a = Object.values(temp).every((o) => o !== "");
      if (a === false || user?.verified === false) {
        Alert.alert("Information",
          "Before Checkout, You must complete your data and verified account",
          [
            {
              text: "Cancel",
              onPress: () => navigation.goBack(),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate("EditAccount") },
          ],
          { cancelable: false });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Transaction"
        type="with-backButton"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>

        <View style={styles.wrapper}>
          <Text styles={{ fontSize: 20, alignSelf: "center" }} variant="600">Transfer To BCA</Text>

          <Text styles={{ fontSize: 30, marginVertical: 10, alignSelf: "center" }} variant="900">111111111</Text>

          <Text styles={{ fontSize: 20, alignSelf: "center" }} variant="600">Please check the checkout</Text>
          <Gap height={10} />

          <View style={{ width: "100%" }}>
            <Image />
            <PaymentDetail label="Concert Name" value={data.nama} />
            <PaymentDetail label="Concert Category" value={data.kategori} />
            <PaymentDetail label="Price" value={data.harga} />
            <PaymentDetail label="Count" value="1" />
            <PaymentDetail label="Concert Start" value={`${new Date(data.awaldate).toDateString()} - ${new Date(data.awaltime).toLocaleTimeString()}`} />
            <PaymentDetail label="Concert End" value={`${new Date(data.akhirdate).toDateString()} - ${new Date(data.akhirtime).toLocaleTimeString()}`} />
            <PaymentDetail label="Your Name" value={user?.nama} />
            <PaymentDetail label="Your Gender" value={user?.gender} />

            <PaymentDetail label="Your Email" value={user?.email} />

          </View>
          <Input placeHolder="Input No Rekening" editable onChange={(val) => set(val, "noRekening")} />
          <Gap height={10} />
          <Button text="Take Picture" onPress={chooseImage} />
          <Gap height={10} />
          {pesanan.buktiPembayaran !== "" && <Image style={styles.image} source={{ uri: pesanan.buktiPembayaran }} />}
          <Gap height={10} />

          <Button text="Check Out Now" onPress={checkout} />

        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
