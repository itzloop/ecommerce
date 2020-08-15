//@ts-check

import React from 'react';
import {View, Text} from 'react-native';
import Login from './login';
import Profile from './profile';
import Register from './register';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();
const Auth = ({navigation, route}) => {
  if (route.state)
    navigation.setOptions({tabBarVisible: route.state.index === 0});

  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen name="Profile" component={Profile} />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{animationEnabled: false}}
      />
    </AuthStack.Navigator>
  );
};
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    loading: state.user.loading,
  };
};
export default connect(mapStateToProps)(Auth);
