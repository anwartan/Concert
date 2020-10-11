import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/firestore";

import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ICLogin } from "../../assets";
import {
  Button, Gap, Input, Link,
} from "../../components/atoms";
import { Typography } from "../../utils";

const index = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChange = (val, field) => {
    setData({ ...data, [field]: val });
  };
  const onLogin = () => {
    if (data.email === "" || data.password === "") {
      Alert.alert("Information", "Email and Password is not exist");
    } else {
      auth().signInWithEmailAndPassword(data.email, data.password)
        .then(async (res) => {
          const user = await db().collection("user").doc(res.uid);
          Alert.alert("Information", "Login was succesfull");
        }).catch((err) => {
          console.log(err);
          Alert.alert("Information", "Something was wrong");
        });
    }
  };
  return (
    <ScrollView>

      <View style={styles.container}>
        {/* <Text>hello</Text> */}
        <View>
          <View style={{ alignItems: "center" }}>

            <ICLogin height={200} width={200} />
          </View>
          <Gap height={20} />
          <Input
            placeHolder="email"
            onChange={(val) => onChange(val, "email")}
          />
          <Gap height={20} />
          <Input
            placeHolder="Password"
            onChange={(val) => onChange(val, "password")}
            secureTextEntry
          />
        </View>
        <Gap height={15} />

        <View>
          <Button text="Login" onPress={onLogin} />
          <Gap height={15} />
          <Link size={Typography.h7} text="Go To Register" onPress={() => navigation.navigate("Register")} />
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
