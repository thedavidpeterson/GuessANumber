import React, {useState, useRef, useEffect} from 'react'; //useRef survives component rerenders
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import defaultStyles from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  };


  const renderListItem = (listlength, itemData) =>  (<View 
  style={styles.listItem}
  >
  <BodyText>#{listlength - itemData.index} </BodyText>
  <BodyText>{itemData.item}</BodyText>
</View>);



const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //The useState(generateRandomBetween) will only be considered on first render when
    //there is no current state. 
    // const [rounds, setRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100); //useRef survives component rerenders. Does not change unless called to change

    const { userChoice, onGameOver } = props; //Pulling out constants from props 

    
    useEffect(() => {
        if(currentGuess === userChoice){
          onGameOver(pastGuesses.length)  
        }
    },
    [currentGuess, userChoice, onGameOver]
    );


    const nextGuessHandler = direction => {
        if (
          (direction === 'lower' && currentGuess < props.userChoice) ||
          (direction === 'greater' && currentGuess > props.userChoice)
        ) {
          Alert.alert("Don't lie!", 'You know that this is wrong...', [
            { text: 'Sorry!', style: 'cancel' }
          ]);
          return;
        }
        if (direction === 'lower') {
          currentHigh.current = currentGuess;
        } else {
          currentLow.current = currentGuess +1;
        }
        const nextNumber = generateRandomBetween(
          currentLow.current,
          currentHigh.current,
          currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currRounds => currRounds+1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses])
      };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
        <Ionicons name='md-remove' size={24} color='white'/>
        </MainButton>

        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name='md-add' size={24} color='white'/>
        </MainButton>
      </Card>
      <View style={styles.list}>
      {/* <ScrollView>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length-index))}
        </ScrollView> */}
        <FlatList 
        keyExtractor={(item) => item} 
        data={pastGuesses} 
        renderItem={renderListItem.bind(this, pastGuesses.length)}/>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",



    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: "80%",


    },

    listItem:{
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 15,
      marginVertical: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    list:{
      flex: 1,
      width: '60%'

    }
});

export default GameScreen;