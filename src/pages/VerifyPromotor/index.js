import React, { useState, useEffect } from "react";
import {
  Alert, StyleSheet, Text, View,
} from "react-native";
import db from "@react-native-firebase/firestore";
import { Button, Gap, Input } from "../../components/atoms";
import { Header } from "../../components/molecules";
import { useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState({
    nama: user.nama,
    email: user.email,
    alamat: "",
    verified: false,
  });
  const onChange = (val, field) => {
    setData({ ...data, [field]: val });
  };
  useEffect(() => {

  }, []);
  const send = () => {
    if (data.email && data.nama && data.alamat) {
      db().collection("promotor").doc(user?.uid).set(data)
        .then((res) => {
          Alert.alert("Information", "Successfull");
        })
        .catch((err) => {
          Alert.alert("Information", "Failed");
        });
    } else {
      Alert.alert("Information", "Name or Address is not exist");
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

        <Input placeHolder="Full Name" value={data.nama} onChange={(val) => onChange(val, "nama")} />
        <Gap height={10} />
        <Input editable={false} placeHolder="Email" value={data.email} onChange={(val) => onChange(val, "email")} />
        <Gap height={10} />
        <Input placeHolder="Address" value={data.alamat} onChange={(val) => onChange(val, "alamat")} />
        <Gap height={10} />

        <Button text="Send" onPress={send} />
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
