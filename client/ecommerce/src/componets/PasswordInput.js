//@ts-check

import React, {useState, useRef, useEffect} from 'react';
import {TextInput, Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../res/values/colors';

const default_size = 25;

const PasswordInput = ({
  placeholder,
  style,
  value,
  onChangeText,
  size = default_size,
}) => {
  const [visiblity, setVisiblity] = useState(false);
  const [h, setTop] = useState(0);
  const [h2, setBottom] = useState(0);
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        onLayout={(e) => setTop(e.nativeEvent.layout.height / 2)}
        placeholder={placeholder}
        style={{...styles.input, ...style}}
        secureTextEntry={!visiblity}
        value={value}
        onChangeText={onChangeText}></TextInput>
      <Pressable
        onLayout={(e) => setBottom(e.nativeEvent.layout.height / 2)}
        style={{...styles.eye, top: h, transform: [{translateY: -h2}]}}
        onPress={() => setVisiblity(!visiblity)}>
        <Ionicons
          size={size ? size : default_size}
          name={visiblity ? 'eye' : 'eye-off'}
          color={Colors.COLOR_DARK}></Ionicons>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
  eye: {
    position: 'absolute',
    right: 10,
  },
});

export default PasswordInput;
