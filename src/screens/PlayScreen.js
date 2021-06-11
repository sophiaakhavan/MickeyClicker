import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Animated
} from 'react-native';
import BackgroundTimer from "react-native-background-timer";
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { listUsers } from '../graphql/queries';
import { Connect } from 'aws-amplify-react';
import { CommentText, Grid, Header, Input, List, Segment } from 'semantic-ui-react';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import {updateUser} from '../graphql/mutations.js';
import {getUser} from '../graphql/mutations.js';
import { isDecimalLiteral } from '@babel/types';


Amplify.configure(awsconfig);



const PlayScreen = ({navigation}) => {


    const [timerOn, setTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(0); //start at 0 seconds
    const [clicksPerSecond, setClicksPerSecond] = useState(0); //average cps

    //need to make a global state variable that updates when counter updates
    //and a local state variable that is counter for clicks


    const [counter, setCounter] = useState(0); //count the #clicks for displaying total clicks
    const [clicks, setClicks] = useState(0); //count clicks for calculating cps

    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const scale = animation.interpolate({inputRange, outputRange});

    const [users, setUsers] = useState([]);
    const [awsCount, setAwsCount] = useState([]); //global variable, only change if counter exceeds its value


    //retreive current hiscore from aws
    const fetchScore = async () => {
        try {
            let idl = await Auth.currentAuthenticatedUser();
            console.log('id: ', idl.attributes.sub);

            const currentUser = await API.graphql(
                graphqlOperation(queries.getUser, {
                    id: idl.attributes.sub,
                }),
            );
            //console.log('stats: ', currentUser.data.getUser);
            const userScore = currentUser.data.getUser.hiscore;
            console.log('user score', userScore);

            setAwsCount(userScore);
        } catch (error) {
            console.log('error on fetching user score', error);
        }
    }
    useEffect(()=> {
        fetchScore();
    }, []);

    const fetchUsers = async () => {
        try {
            const userData = await API.graphql(graphqlOperation(listUsers));
            const userList = userData.data.listUsers.items;
            console.log('user list', userList);
            setUsers(userList);
        } catch (error) {
            console.log('error on fetching users', error);
        }
    };
    useEffect(()=> {
        fetchUsers();
    }, []);

    //update hiscore, function called inside touchableopacity if counter exceeds hiscore
    const updateAws = async () => {
        let idl = await Auth.currentAuthenticatedUser();
        await API.graphql(
            graphqlOperation(mutations.updateUser, {
              input: {
                id: idl.attributes.sub,
                hiscore: awsCount,
              },
            }),
          );
    };

    //every second, update second to +1
    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            setSeconds(secs=>{return secs+1});
        }, 1000);
    };

    // Runs when timerOn value changes to start or stop timer
    useEffect(() => {
        if (timerOn) startTimer();
        else BackgroundTimer.stopBackgroundTimer();
        return () => {
            BackgroundTimer.stopBackgroundTimer();
        };
    }, [timerOn]);

    //displays the time
    const clockify = () => {
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds
        return {
            displaySecs,
          }
    };

    //animation of rat
    const onPressIn = () => {
        Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        }).start();
    };

    return (
        <View style={{backgroundColor:'lavender', flex: 1}}>
            <Text style={styles.hiscorestyle}>Beat your high score: {awsCount}</Text>
            <Text style={styles.fear}>Do Not Be Afraid</Text>
            <Text style={styles.fear}>Click The Rat</Text>
            <Text style={styles.click}>Clicks: {counter}</Text>
            <Animated.View style={[styles.button, {transform: [{scale}]}]}>
                <TouchableWithoutFeedback
                onPress={() => {
                    setCounter(counter+1);
                    setAwsCount(aws=> {
                        if(counter>aws){
                            aws=counter;
                        }
                        console.log(aws);
                        updateAws();
                        return aws;
                    });
                    setClicks(clicks+1);
                    setClicksPerSecond(avg=> {
                        avg = Math.floor(clicks / seconds);
                        return avg;
                    });
                }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                        <Image
                            style={styles.imageStyle}
                            source={require('../../assets/mickey.png')}
                        />
                </TouchableWithoutFeedback>
            </Animated.View>
            <TouchableOpacity onPress={() => setTimerOn(true)}>
                <Text style={styles.click2}>start timer</Text>
            </TouchableOpacity>
            <Text style={styles.clicktemp}>{clockify().displaySecs} Secs</Text>
            <Text style={styles.clicksec}>Clicks per second: {clicksPerSecond}</Text>

        </View>
    );
};



const styles = StyleSheet.create({
    hiscorestyle: {
        fontSize:20,
        fontWeight:'bold',
        alignSelf: 'center',
        color: 'plum',
        fontStyle: 'italic',
        top: "2%",
        padding: 1
    },
    fear: {
        fontSize:30,
        fontWeight:'bold',
        alignSelf: 'center',
        color: 'plum',
        fontStyle: 'italic',
        top: "5%",
        padding: 7
    },
    imageStyle: {
        height: 300,
        width: 300,
        alignSelf: 'center',
        padding: 10,
        top: "20%"
    },
    click: {
        alignSelf: 'center',
        fontSize: 30,
        top: "6%",
        fontWeight: 'bold',
        color: 'plum'
    },
    clicksec: {
        alignSelf: 'center',
        fontSize: 25,
        padding: 5,
        fontWeight: 'bold',
        color: 'plum'
    },
    clicktemp: {
        alignSelf: 'center',
        fontSize: 25,
        padding: 20,
        top: "2%",
        fontWeight: 'bold',
        color: 'plum'
    },
    click2 : {
        alignSelf: 'center',
        fontSize: 30,
        padding: 30,
        top: "60%",
        fontWeight: 'bold',
        color: 'plum'
    }
});

export default PlayScreen;