//@ts-check

import React from 'react';
import {View, Text, Pressable} from 'react-native';
import LocalStorage from '../../api/localStroage';
import Colors from '../../res/values/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton from '../../componets/IconButton';
import {connect} from 'react-redux';
import {actions} from '../../scripts/redux/reducers/userReducer';

const Settings = ({navigation, logout}) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          name="close-outline"
          size={40}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={() => LocalStorage.clear()}>
        <Ionicons
          name="trash-outline"
          color={Colors.COLOR_DARK}
          size={40}></Ionicons>
      </Pressable>
    </View>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    loading: state.user.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
