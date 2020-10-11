import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/firestore";

import React, { useState } from "react";
import {
  Alert, ScrollView, StyleSheet, View,
} from "react-native";
import { ICRegister } from "../../assets";
import {
  Button, Gap, Input, Link,
} from "../../components/atoms";
import { Typography } from "../../utils";

const index = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const onChange = (val, field) => {
    setData({ ...data, [field]: val });
  };
  const onRegister = () => {
    if (data.email === "" || data.password === "") {
      Alert.alert("Information", "Email and Password is not exist");
    } else if (data.password === data.repassword) {
      auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(async (res) => {
          const newUser = {
            email: res.user.email,
            nama: res.user.email.split("@")[0],
            gender: "",
            verified: false,
            role: "user",
            kategori: "",
            uid: res.user.uid,
            ktp: "",
            gambar: "",
          };
          await db().collection("user").doc(newUser.uid).set(newUser);
          Alert.alert("Information", "Register Succesfull");
        }).catch((err) => {
          console.log(err.message);
          Alert.alert("Information", "Something was wrong");
        });
    } else {
      Alert.alert("Information", "Password is not match");
    }
  };
  return (
    <ScrollView>

      <View style={styles.container}>
        {/* <Text>hello</Text> */}
        <View>
          <View style={{ alignItems: "center" }}>

            <ICRegister height={200} width={200} />
          </View>
          <Gap height={20} />
          <Input
            value={data.email}
            placeHolder="Email"
            keyboardType="email-address"
            onChange={(val) => onChange(val, "email")}
          />
          <Gap height={20} />
          <Input
            value={data.password}
            placeHolder="Password"
            onChange={(val) => onChange(val, "password")}
            secureTextEntry
          />
          <Gap height={20} />
          <Input
            value={data.repassword}
            placeHolder="Re Password"
            onChange={(val) => onChange(val, "repassword")}
            secureTextEntry
          />

        </View>
        <Gap height={20} />

        <View>
          <Button text="Register" onPress={onRegister} />
          <Gap height={15} />
          <Link size={Typography.h7} text="Back To Login" onPress={() => navigation.goBack()} />
        </View>

      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
});
