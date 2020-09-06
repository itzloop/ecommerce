import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Colors from '../res/values/colors';
import {LineDotsLoader} from 'react-native-indicator';
const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <LineDotsLoader color={Colors.COLOR_RED} />
    </View>
  );
};

const showLoading = (view, isLoading) => {
  return isLoading ? Loading() : view();
};

export {showLoading};

export default Loading;
