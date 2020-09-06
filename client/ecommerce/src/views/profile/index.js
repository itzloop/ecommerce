//@ts-check

import React from 'react';
import {View, Text} from 'react-native';
import Login from './login';
import Profile from './profile';
import Register from './register';
import Settings from '../settings/index';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import IconButton from '../../componets/IconButton';
import {actions} from '../../scripts/redux/reducers/userReducer';
import {StackActions} from '@react-navigation/native';
import Colors from '_values/colors';
import Loading from '../../componets/Loading';

const AuthStack = createStackNavigator();
const Auth = ({navigation, route, user, logout, appReady}) => {
  React.useEffect(() => {
    if (appReady)
      navigation.dispatch(StackActions.replace(user ? 'MyProfile' : 'Login'));
  }, [appReady]);

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Loading" component={Loading} options={{}} />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="MyProfile"
        component={Profile}
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: '',
          headerLeft: () => (
            <IconButton
              name="settings-outline"
              size={30}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
          headerRight: () => (
            <IconButton
              name="exit-outline"
              size={40}
              onPress={logout}
              color={Colors.COLOR_RED}
            />
          ),
        }}
      />
      <AuthStack.Screen name="Settings" component={Settings} />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{animationEnabled: false, headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    user: state.user.user,
    appReady: !state.app.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
