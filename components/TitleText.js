import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


const TitleText = props => {
    return (
        <Text style={styles.bodytext}>
            {props.children}
        </Text>

    );


};

const styles = StyleSheet.create({
    bodytext: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
    }
    
});

export default TitleText;