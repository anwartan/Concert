import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ICLogin } from "../../assets";
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

          <ICLogin height={200} width={200} />
        </View>
        <Gap height={20} />
        <Input placeHolder="Username" />
        <Gap height={20} />
        <Input placeHolder="Password" secureTextEntry />
      </View>
      <Gap height={15} />

      <View>
        <Button text="Login" />
        <Gap height={15} />
        <Link size={Typography.h7} text="Go To Register" />
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
