//@ts-check

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Linking,
} from 'react-native';
import Colors from '../../res/values/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utils from '../../scripts/utils';
import LocalStroage from '../../api/localStroage';
import {connect} from 'react-redux';
import userSlice from '../../scripts/redux/reducers/userReducer';
import RedButton from '../../componets/RedButton';
import PasswordInput from '../../componets/PasswordInput';

const Login = ({navigation, route, login, user}) => {
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.settings}
        onPress={() => navigation.push('Settings')}>
        <Ionicons
          name="settings-outline"
          color={Colors.COLOR_DARK}
          size={40}></Ionicons>
      </Pressable>
      <View style={styles.singup_form}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.input}></TextInput>
        <PasswordInput
          value={password}
          onChangeText={setPass}
          placeholder="Enter Password"
          style={styles.input}></PasswordInput>
        <Pressable onPress={() => Utils.copy('my text')}>
          <Text style={styles.forgotpass}>Forgot Password?</Text>
        </Pressable>
        <RedButton
          onPress={() => login(email, password)}
          text={'SIGN IN'}></RedButton>
        <Pressable onPress={() => navigation.push('Register')}>
          <Text style={styles.red_text}>Create a New Account</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={styles.line}></View>
        <View>
          <Text
            style={{
              color: Colors.COLOR_GRAY_DARK,
              marginTop: 25,
              textAlign: 'center',
            }}>
            By logging in or signing up you accept our{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
              }}
              onPress={() => Linking.openURL('https://www.google.com/')}>
              rules terms and services
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(userSlice.actions.login({email, password}));
    },
    auth_success: () => dispatch(userSlice.actions.auth_success.type),
    signup: (email, password) =>
      dispatch(userSlice.actions.signup({email, password})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  singup_form: {
    marginTop: 100,
    width: '88%',
    justifyContent: 'center',
    flex: 20,
    zIndex: -1,
  },
  input: {
    backgroundColor: Colors.COLOR_GRAY_LIGHT,
    borderRadius: 6,
    margin: 'auto',
    marginBottom: 15,
    padding: 15,
  },
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

  forgotpass: {
    color: Colors.COLOR_BLUE,
  },
  red_text: {
    color: Colors.COLOR_RED,
    alignSelf: 'center',
    marginTop: 30,
  },
  footer: {
    width: '88%',
    flex: 4,
  },
  line: {
    borderBottomColor: Colors.COLOR_GRAY_LIGHT,
    borderBottomWidth: 1,
  },
  settings: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
