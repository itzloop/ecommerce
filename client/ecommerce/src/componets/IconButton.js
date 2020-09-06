import React from 'react';
import {Pressable} from 'react-native';
import Colors from '../res/values/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const IconButton = ({
  style,
  name,
  size,
  onPress,
  color = Colors.COLOR_DARK,
}) => {
  return (
    <Pressable
      style={{
        padding: 10,
        ...style,
      }}
      onPress={onPress}>
      <Ionicons name={name} color={color} size={size}></Ionicons>
    </Pressable>
  );
};

IconButton.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
};

export default IconButton;
