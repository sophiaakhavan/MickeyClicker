import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import {Auth} from 'aws-amplify';



const HomeScreen = ({navigation, props}) => {
    function signOut() {
        Auth.signOut()
          .then(() => {
            props.onStateChange('signedOut', null);
          })
          .catch(err => {
            console.log('err: ', err)
          })
      }
    return (
        <View style = {{ flex:1, justifyContent: 'center' }}>
            <View style = {{flex:1, backgroundColor: 'black'}}>
                <TouchableOpacity onPress={()=>signOut()}>
                    <Text style={styles.text2}>Sign out</Text>
                </TouchableOpacity>
                
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
    },
    text2: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
        top: '30%',
        textAlign: 'left',
        paddingHorizontal: 15,
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