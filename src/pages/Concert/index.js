import React from "react";
import {
  Image, ImageBackground, StyleSheet, View,
} from "react-native";
import {
  ICBackButton, ICCalendar, ICTicket, ILBackground, ILFullBlack, ILGambar,
} from "../../assets";
import { Button, Gap, Text } from "../../components/atoms";
import { colors, Typography } from "../../utils";

const index = () => (
  <View style={styles.container}>
    <ImageBackground source={ILGambar} style={styles.wrapper}>
      <Image style={{ width: "100%", height: "100%" }} source={ILFullBlack} />
      <View style={styles.detail}>
        <Button type="icon-only" icon={<ICBackButton fill="#fff" />} />
        <View style={styles.wrapperDetail}>

          <Text styles={styles.title} variant="900">Nama Konser</Text>
          <Gap height={10} />
          <View style={{ flexDirection: "row" }}>

            <ICCalendar fill="#fff" />
            <Gap width={10} />
            <Text styles={styles.text} variant="400">
              Tgl
            </Text>
          </View>
          <Gap height={10} />

          <View style={{ flexDirection: "row" }}>
            <ICTicket width={24} height={24} fill="#fff" />
            <Gap width={10} />
            <Text styles={styles.text} variant="400">Biaya</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
    <View style={styles.content}>
      <View>

        <Text styles={styles.titleSection} variant="600">Detail</Text>
        <Text
          styles={styles.contentSection}
          variant="500"
        >
          jfdksajfdlsajfldsaljjfdksjfkdsjakfjdsfjjdsajkfldsjaklfjdlksjaklfjdslkajflkdsjlfjsda
        </Text>
      </View>

      <View>
        <View style={styles.wrapperFeature}>
          <Text styles={styles.textFeature} variant="600">Price</Text>
          <Text
            styles={[styles.textFeature, styles.price]}
            variant="600"
          >
            Rp. 20.000

          </Text>
        </View>
        <Button text="Buy Ticket" />
      </View>
    </View>
  </View>
);

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: { width: "100%", height: 330, position: "relative" },
  detail: {
    position: "absolute",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: Typography.h7,
    color: colors.text.secondary,

  },
  title: {
    fontSize: Typography.h4,
    color: colors.text.secondary,

  },
  wrapperDetail: {
    flex: 1,
    marginLeft: 20,
    marginTop: 40,
  },
  content: {
    flex: 1,
    marginTop: -50,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-between",
  },
  titleSection: {
    fontSize: 20,
  },
  wrapperFeature: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  textFeature: {
    fontSize: 20,
    color: colors.text.primary,
  },
  price: {
    color: colors.header.primary,
  },
});
