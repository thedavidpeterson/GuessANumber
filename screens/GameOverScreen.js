import React from 'react';
import { View, Text, StyleSheet, Button, Image} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import { storeUrl } from 'expo/build/StoreReview/StoreReview';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <Image 
                style={styles.image} 
                resizeMode="contain"
                source={require('../assets/success.png')} />
            <BodyText>Your Phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text>  
              rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            <View style={styles.button}>
            <MainButton onPress={props.onRestart}>
            New Game
           </MainButton>
            </View>

        </View>

    );


};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width:"80%",
        height: 300,
        borderRadius: 100,

    },

    button:{
        marginTop: 20

    },

    highlight:{
        color: colors.primary,
        fontSize: 18,
        fontFamily: 'open-sans-bold',

    }
    
});

export default GameOverScreen;