import db from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Gap } from "../../components/atoms";
import { Card, Header } from "../../components/molecules";
import { useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = db().collection("tiket")
      .where("idUser", "==", user?.uid)
      .get()
      .then(async (res) => {
        const temp = [];
        res.forEach(async (item) => {
          temp.push({
            id: item.id,
            ...item.data(),
          });
        });
        setData(temp);
      });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header title="My Ticket" />
      <ScrollView>
        <View style={styles.wrapper}>
          {

            data.map((item) => (
              <View key={item.id}>
                <Card
                  status={item.verified}
                  date={`${new Date(parseInt(item.awaldate)).toDateString()} - ${new Date(parseInt(item.awaltime)).toLocaleTimeString()}`}
                  id={item.id}
                  nama={item.nama}
                  type="ticket"
                  onPress={() => navigation.navigate("TicketView", { data: item })}
                />
                <Gap height={10} />

              </View>
            ))
          }

        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});
