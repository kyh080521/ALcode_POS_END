import React from 'react';
import {
  StyleSheet, 
  View, 
} from 'react-native';
import Banner from './UI/Banner';
import Body from './UI/Body';
import { StatusBar } from 'react-native';



const App = () => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="" backgroundColor={'transparent'} translucent={true} hidden = {true} />
      <View style = {{flex : 1}}> 
        <Banner />
      </View>
      <View style = {{flex : 15}}>
        <Body />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyView: {
    flex : 10,
    flexDirection: 'row'
  }
});

export default App;