import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Connect } from 'aws-amplify-react';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import {createUser} from '../graphql/mutations.js';
import awsExports from '../aws-exports';


Amplify.configure({
    ...awsExports,
    Analytics: {
      disabled: true,
    },
  });

const HomeScreen = ({navigation, props}) => {

    // const userDetails = `mutation createUser{
    //     createUser(input: {hiscore: 0}) {
    //       id
    //       name
    //       hiscore
    //     }
    //   }`;
    
    const addUser = async () => {
        let idl = await Auth.currentAuthenticatedUser();
        const user_var = await API.graphql(graphqlOperation(createUser, {
            input: {
                id: idl.attributes.sub,
                hiscore: 0,
                name: "name"
            },
        }));
        // const userInfo = user_var.data.createUser;
        console.log('new user: ', user_var);
    };

    useEffect(()=> {
        addUser();
    }, []);

    function signOut() {
        Auth.signOut()
          .then(() => {
            props.onStateChange('signedOut', null);
          })
          .catch(err => {
            console.log('err: ', err)
          })
      };
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