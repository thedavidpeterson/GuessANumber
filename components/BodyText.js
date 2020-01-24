import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


const BodyText = props => {
    return (
        <Text style={styles.bodytext}>
            {props.children}
        </Text>

    );


};

const styles = StyleSheet.create({
    bodytext: {
        fontFamily: 'open-sans'
    }
    
});

export default BodyText;