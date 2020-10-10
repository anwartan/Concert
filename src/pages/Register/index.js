import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ICRegister } from "../../assets";
import {
  Button, Gap, Input, Link,
} from "../../components/atoms";
import { Typography } from "../../utils";

const index = () => (
  <ScrollView>

    <View style={styles.container}>
      {/* <Text>hello</Text> */}
      <View>
        <View style={{ alignItems: "center" }}>

          <ICRegister height={200} width={200} />
        </View>
        <Gap height={20} />
        <Input placeHolder="Username" />
        <Gap height={20} />
        <Input placeHolder="Password" secureTextEntry />
        <Gap height={20} />
        <Input placeHolder="Re Password" secureTextEntry />

      </View>
      <Gap height={20} />

      <View>
        <Button text="Register" />
        <Gap height={15} />
        <Link size={Typography.h7} text="Back To Login" />
      </View>

    </View>
  </ScrollView>
);

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
});
