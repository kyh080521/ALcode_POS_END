import React from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import 코드페어 from '../assets/코드페어.png';

const Banner = () => {
    return (
        <View style = {styles.banner}>
            <Image 
                source = {코드페어} 
                style = {styles.logo}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    banner: {
        flex: 2,
        borderBottomWidth : 3,
        borderBottomColor : '#5A5AFF',
        backgroundColor : '#9CCAFC',
    },

    logo: {
        alignItems : 'center',
        justifyContent : 'center',
        height: 100,
        width : 400,
        marginTop : 50,
    },
})

export default Banner;