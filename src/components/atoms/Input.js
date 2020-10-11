import React, { FunctionComponent, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from ".";
import { fonts } from "../../utils";
import Button from "./Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
type CustomType={
  placeHolder?:String,
  value?:String,
  onChange?:Function,
  onPress?:Function,  
  onIconPress?:Function,
  editable:?Boolean,
  secureTextEntry:?Boolean,
  icon:?Any,
  keyboardType?:'default'|'number-pad'|'email-address',
  mode:'time'|'date',
  type:'datetime'|'picker',
  show?:Boolean,
  selectedValue?:Any,
  item?:Array,
  date?:Any,
  text?:String,
}
const index:FunctionComponent<CustomType> = ({
  icon, placeHolder, value, onChange,onPress, onIconPress, 
  editable,keyboardType,secureTextEntry,type,mode,selectedValue,item,text
}) => {
  const [focus, setFocus] = useState(false);
  const [show,setShow] = useState(false)
  const change = async(event)=>{
    if(onChange){
      let a;
      if(event.type==="set"){
        a = event.nativeEvent.timestamp
        setShow(false)

      }else{
        a=""
        setShow(false)
      }
       onChange(a)
    }
  }
  if(type==="datetime"){
    return (


      <>
      <TouchableOpacity onPress={()=>{setShow(true)}} style={[styles.container, focus ? styles.focus : styles.unfocus,{height:50}]}>
        <Text styles={styles.input} >{text}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
        testID="dateTimePicker"
        value={value}
        mode={mode}
        is24Hour={true}
        display="spinner"
        
        onChange={change}
        />
        )}
    </>
  )
  }
  if(type==="picker"){
    return (

      <>
    <TouchableOpacity onPress={onPress} style={[styles.container, focus ? styles.focus : styles.unfocus,{height:50}]}>
    <Picker
      selectedValue={selectedValue}
      style={{height: 50, width: '100%'}}
      onValueChange={onChange}>
        <Picker.Item key={index} label={text} value={""} />

        {
          item.map((item,index)=>{
            return(

              <Picker.Item key={index} label={item.nama} value={item.nama} />
            )
          })
        }
    </Picker>
    </TouchableOpacity>
    </>
      )
  }
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
    fontFamily: fonts.primary.Normal[500],
  },
});
