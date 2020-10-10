import React, { FunctionComponent, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { fonts } from "../../utils";
import Button from "./Button";
type CustomType={
  placeHolder?:String,
  value?:String,
  onChange?:Function,
  onIconPress?:Function,
  editable:?Boolean,
  secureTextEntry:?Boolean,
  icon:?Any,
  keyboardType?:'default'|'number-pad'
}
const index:FunctionComponent<CustomType> = ({
  icon, placeHolder, value, onChange, onIconPress, editable,keyboardType,secureTextEntry
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container, focus ? styles.focus : styles.unfocus]}>
      <TextInput
      secureTextEntry={secureTextEntry}
       keyboardType={keyboardType}
        editable={editable}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {icon && <Button type="icon-only" icon={icon} onPress={onIconPress} />}

    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  focus: {
    borderColor: "blue",
  },
  unfocus: {
    borderColor: "grey",
  },
  input: {
    flex: 1,
    fontFamily: fonts.primary.Normal[600],
  },
});
