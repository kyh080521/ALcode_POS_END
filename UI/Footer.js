import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

const Footer = () => {
    const [sum, setSum] = useState(0);

    return (
        <View style = {styles.footer}>
            <TextInput 
                style = {styles.footerT}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#9CCAFC',
    },

    footerT : {
        color : 'transparent',
    }
})

export default Footer;
