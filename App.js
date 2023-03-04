import React from 'react';
import {
  StyleSheet, 
  View, 
} from 'react-native';
import Banner from './UI/Banner';
import Body from './UI/Body';
import Footer from './UI/Footer';

const App = () => { 
  return (
    <View style={styles.container}>
      <Banner />
      <Body />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;