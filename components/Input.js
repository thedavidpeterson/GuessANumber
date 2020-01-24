import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return <TextInput {...props} style={{...styles.inputstyle, ... props.style}} />;

};

const styles = StyleSheet.create({
    inputstyle: {
        height: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 20
    }

});

export default Input;
