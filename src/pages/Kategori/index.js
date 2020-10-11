import db from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image, StyleSheet, View, TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";
import { ICChoose } from "../../assets";
import { Button, Gap, Text } from "../../components/atoms";
import { colors, useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    db().collection("kategori").get().then((doc) => {
      const temp = [];
      doc.forEach((item) => {
        temp.push({
          id: item.id,
          ...item.data(),
        });
      });
      setData(temp);
    });
  }, []);
  const set = (kategori) => {
    db().collection("user").doc(user.uid).update({ kategori });
    navigation.replace("Home");
  };
  return (
    <ScrollView>

      <View style={styles.container}>
        <ICChoose width={200} height={200} />
        <Text variant="900" styles={styles.title}>Choose Favorite Category </Text>
        <Gap height={10} />

        <View style={styles.section}>
          {
                data.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => set(item.nama)}
                    style={{
                      marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <Image source={{ uri: item.gambar }} style={{ borderRadius: 10, width: 100, height: 100 }} />
                    <Gap width={10} />
                    <Text variant="600">{item.nama}</Text>
                    <Gap width={10} />
                  </TouchableOpacity>
                ))
            }

        </View>

      </View>
      {/* <View style={{ paddingHorizontal: 20 }}>

        <Button text="Next" onPress={() => console.log(kategori)} />
      </View> */}
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  section: {

  },
  wrapper: {
    marginVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
  },
});
