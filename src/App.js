/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar, StyleSheet,


  Text, View
} from 'react-native';



const App= () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
     
      <View style={styles.container}>
        <Text>Concert</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default App;
