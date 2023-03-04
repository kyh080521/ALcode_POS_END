import React from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
} from 'react-native';
import 배경 from '../assets/배경.jpg';

const Background = () => {
    return (
        <View style = {styles.background} >
            <Image   
                source = {배경}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex : 0.0000001,
    }

})

export default Background