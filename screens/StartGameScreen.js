import React, {useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Image

} from 'react-native';

import Card from '../components/Card';
import ButtonStyle from '../components/ButtonStyle';
import colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHander = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
       setEnteredValue(''); 
       setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', [{text:'Okay', style:'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput; 

    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text>You Selected:</Text>
            <NumberContainer> {selectedNumber} </NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                Start Game!
            </MainButton>
        </Card>
    }
 
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Image  //As the image is from the web, we NEED to set the width and height, it is not retreived 
                fadeDuration={3000}
                source={{uri: 'http://clipart-library.com/images_k/forest-silhouette-wallpaper/forest-silhouette-wallpaper-23.png' }}
                resizeMode="cover"
                style={styles.image}

                />
            <Card style={styles.inputContainer}>
                <BodyText>Select a number</BodyText>
                <Input style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={2} 
                    onChangeText = {numberInputHander}
                    value = {enteredValue}
                    />
                <View style={styles.buttonContainer}>
                    <ButtonStyle>
                    <Button 
                        title="Confirm" 
                        onPress={confirmInputHandler} 
                        color={colors.primary}/>
                    </ButtonStyle>
                    <ButtonStyle>
                    <Button 
                        title="Reset" 
                        onPress={resetInputHandler} 
                        color={colors.accent} />
                    </ButtonStyle>
                   
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },

    inputContainer:{
        width: 300,
        maxWidth: "80%",   //If the device is too small, it won't exceed 80%
        alignItems: 'center',
        marginTop: 20
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
       width: 50,
       textAlign: 'center',
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
        

    },
    image:{
        width: '90%',
        height: '30%',
        borderRadius: 10,
        marginTop: 40,
    }



    
});

export default StartGameScreen;