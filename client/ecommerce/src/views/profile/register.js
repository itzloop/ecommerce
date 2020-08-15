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
import {connect} from 'react-redux';
import userSlice from '../../scripts/redux/reducers/userReducer';
import RedButton from '../../componets/RedButton';
import PasswordInput from '../../componets/PasswordInput';

const Register = ({navigation, route, signup}) => {
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.singup_form}>
        <TextInput
          value={name}
          onChangeText={setname}
          placeholder="Enter Name"
          style={styles.input}></TextInput>
        <TextInput
          value={email}
          autoCompleteType="email"
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.input}></TextInput>
        <PasswordInput
          value={password}
          onChangeText={setPass}
          placeholder="Enter Password"
          style={styles.input}></PasswordInput>
        <RedButton
          onPress={() => signup(name, email, password)}
          text={'SIGN UP'}></RedButton>
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
            By registering in or signing up you accept our{' '}
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

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    loading: state.user.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password) => {
      dispatch(userSlice.actions.login({email, password}));
    },
    auth_success: () => dispatch(userSlice.actions.auth_success.type),
    signup: (name, email, password) =>
      dispatch(userSlice.actions.signup({name, email, password})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  singup_form: {
    marginTop: 50,
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
