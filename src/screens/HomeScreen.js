import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";

const HomeScreen = ({navigation}) => {
    return (
        <View style = {{ flex:1, justifyContent: 'center' }}>
            <View style = {{flex:1, backgroundColor: 'black'}}>
                <Text style={styles.text}>Welcome to Mickey Mouse CrackHouse</Text>
            </View>
            <View style={styles.box}>
                <Image source={require('../../assets/head.png')} style={styles.img}/>
                <TouchableOpacity onPress={() => navigation.navigate('Play')}>
                    <Text style={styles.butt}>Start the Game</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        top: '30%',
        textAlign: 'center',
        paddingVertical: 1,
    },
    box: {
        backgroundColor: 'red',
        flex:3
    },
    butt: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 40,
        top: '100%',
        textAlign: 'center',
        backgroundColor: 'black'
    },
    img: {
        height: 200,
        width: 200,
        top: 10,
        alignSelf: 'center',
        resizeMode: 'contain'
    }
});

export default HomeScreen;