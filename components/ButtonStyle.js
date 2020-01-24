import React from 'react';
import {View, StyleSheet} from 'react-native';

const ButtonStyle = props => {
    return (
        <View style={{ ...styles.button, ...props.style }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '40%',
    }

});

export default ButtonStyle;