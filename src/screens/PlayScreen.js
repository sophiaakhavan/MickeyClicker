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

const PlayScreen = ({navigation}) => {

    const [timerOn, setTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(0); //start at 0 seconds
    const [clicksPerSecond, setClicksPerSecond] = useState(0); //average cps

    const [counter, setCounter] = useState(0); //count the #clicks for displaying total clicks
    const [clicks, setClicks] = useState(0); //count clicks for calculating cps

    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const scale = animation.interpolate({inputRange, outputRange});

    //every second, update second to +1
    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            setSeconds(secs=>{return secs+1});
        }, 1000);
    }

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
    }

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
            <Text style={styles.fear}>Do Not Be Afraid</Text>
            <Text style={styles.fear}>Click The Rat</Text>
            <Text style={styles.click}>Clicks: {counter}</Text>
            <Animated.View style={[styles.button, {transform: [{scale}]}]}>
                <TouchableWithoutFeedback
                onPress={() => {
                    setCounter(counter+1);
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
    fear: {
        fontSize:45,
        fontWeight:'bold',
        alignSelf: 'center',
        color: 'plum',
        fontStyle: 'italic',
        top: "4%",
        padding: 10
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
        top: "5%",
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