//@ts-check
import PropTypes from 'prop-types';
import {Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../res/values/colors';
const RedButton = ({onPress, style, text}) => {
  return (
    <Pressable onPress={onPress} style={{...styles.button_red, ...style}}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

RedButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  button_red: {
    height: 50,
    backgroundColor: Colors.COLOR_RED,
    margin: 'auto',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    color: Colors.COLOR_WHITE,
    fontSize: 18,
  },
});

export default RedButton;
