import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

const Banner = () => {
    return (
        <View style = {styles.banner}>
           <View style = {{
                flex : 1,
                flexDirection: 'row',

           }}>
                <View style = {styles.bannerButtonViewFr}>
                    <Text style = {styles.bannerButton}>
                        Sales Entry
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        Stock In
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        Stock Out
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        Inventories
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        Sales Records
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        P.T.Cash
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        Reports
                </Text>
                </View>
                <View style = {styles.bannerButtonView}>
                    <Text style = {styles.bannerButton}>
                        Admin
                </Text>
                </View>
                <View style = {styles.bannerButtonViewEnd}>
                <Text style = {styles.bannerButton}>
                    
                </Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    banner: {
        flex : 1,
        backgroundColor : '#9CCAFC'
    },
    bannerButtonViewFr: {
        backgroundColor : '#065bb8',
        alignContent: "center",
        justifyContent: "center",
        flex : 1,
    },
    bannerButtonView: {
        backgroundColor : '#9CCAFC',
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        
    },
    bannerButtonViewEnd: {
        backgroundColor : '#9CCAFC',
        alignContent: "center",
        justifyContent: "center",
        flex : 3,
    },
    bannerButton: {
        marginRight : 10,
        textAlign : 'center',
        flex : 1,
        color : 'white',
        alignItems : 'center',
        justifyContent : 'center',
    },

})

export default Banner;