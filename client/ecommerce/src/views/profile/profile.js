//@ts-check

import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../scripts/redux/reducers/userReducer';
import Loading from '../../componets/Loading';
const Profile = ({user, loading, getProfile, navigation}) => {
  React.useEffect(() => {
    console.log('getProfile');
    getProfile();
  }, []);
  // React.useEffect(() => console.log(user), [user]);
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Text>
          {user
            ? `Hello ${user.name}. Email: ${user.email}`
            : 'Should not happen'}
        </Text>
      )}
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
    getProfile: () => dispatch(actions.getProfile()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
