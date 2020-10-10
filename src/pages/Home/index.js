import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ILGambar } from "../../assets";
import { Gap, Text } from "../../components/atoms";
import { Card, Header } from "../../components/molecules";
import { colors, Typography } from "../../utils";

const index = () => (
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

          <ScrollView horizontal>
            <Card
              source={ILGambar}
              nama="Konser Online"
              date="10/10/2010"
              harga="Rp. 20.000"
            />
            <Gap width={20} />
            <Card nama="Konser Online" date="10/10/2010" harga="Rp. 20.000" />

          </ScrollView>
        </View>
        <Gap height={20} />
        <View style={styles.section}>
          <Text variant="600" styles={styles.sectionTitle}>
            Today
          </Text>
          <Gap height={20} />

          <Card
            source={ILGambar}
            type="secondary"
            nama="Konser Online"
            date="10/10/2010"
            harga="Rp. 20.000"
          />
          <Gap height={20} />
          <Card
            type="secondary"
            nama="Konser Online"
            date="10/10/2010"
            harga="Rp. 20.000"
          />

        </View>
      </View>
    </ScrollView>
  </View>
);

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
