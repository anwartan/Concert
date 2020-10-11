import React, { useState, useEffect } from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import db from "@react-native-firebase/firestore";
import { ILGambar } from "../../assets";
import { Gap, Text } from "../../components/atoms";
import { Card, Header } from "../../components/molecules";
import { colors, Typography } from "../../utils";

const index = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = db().collection("acara").onSnapshot((res) => {
      const temp = [];
      res.forEach((item) => {
        temp.push({
          id: item.id,
          ...item.data(),
        });
      });
      setData(temp);
    });
    return fetch;
  });
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <ScrollView>
        <View style={styles.wrapper}>
          <Gap height={20} />

          <View style={styles.section}>
            <Text variant="600" styles={styles.sectionTitle}>
              New Concert
            </Text>
            <Gap height={20} />

            <ScrollView horizontal style={{ marginHorizontal: -20 }}>
              <Gap width={20} />

              {
                data.map((item) => (

                  <View key={item.id}>
                    <Card
                      source={{ uri: item.banner }}
                      nama={item.nama}
                      date={new Date(item.awaldate).toDateString()}
                      harga={`Rp. ${item.harga}`}
                      onPress={() => navigation.navigate("Concert", { data: item })}
                    />
                  </View>
                ))
              }

            </ScrollView>
          </View>
          <Gap height={20} />
          <View style={styles.section}>
            <Text variant="600" styles={styles.sectionTitle}>
              Today
            </Text>
            {
               data.map((item) => (
                 <View key={item.id}>

                   <Gap height={20} />
                   <Card
                     date={new Date(item.awaldate).toDateString()}
                     source={{ uri: item.banner }}
                     type="secondary"
                     nama={item.nama}
                     harga={`Rp. ${item.harga}`}
                     onPress={() => navigation.navigate("Concert", { data: item })}

                   />
                 </View>
               ))
            }

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: Typography.h7,
  },
});
