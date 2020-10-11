import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import db from "@react-native-firebase/firestore";
import { Header, ItemConcert } from "../../components/molecules";
import { useStateValue } from "../../utils";
import { Gap } from "../../components/atoms";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
  useEffect(() => {
    db().collection("acara").where("idUser", "==", user?.uid).get()
      .then((res) => {
        const temp = [];
        res.forEach((item) => {
          temp.push({
            id: item.id,
            ...item.data(),
          });
        });
        setData(temp);
      });
  }, []);
  return (
    <View>
      <Header
        title="My Concert"
        type="with-backButton"
        onBackPress={() => navigation.goBack()}
      />
      <View>
        {data.map((item) => (
          <View key={item.id}>
            <ItemConcert
              nama={item.nama}
              harga={`Rp ${item.harga}`}
              source={{ uri: item.banner }}
              tanggal={new Date(item.awaldate).toDateString()}
              kode={item.id}
              terjual={item.pendaftar}
              penonton={item.penonton}
            />
            <Gap height={10} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
