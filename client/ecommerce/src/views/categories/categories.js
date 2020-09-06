//@ts-check

import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../scripts/redux/reducers/categoryReducer';
import {FlatList} from 'react-native-gesture-handler';
import Loading from '../../componets/Loading';
import Category from '../../componets/Category';

const Categories = ({loading, categories, get}) => {
  React.useEffect(() => {
    get();
  }, []);

  React.useEffect(() => {
    console.log(categories);
  }, [categories]);

  const item = ({item}) => {
    return <Text>{item?.description}</Text>;
  };

  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={categories}
          renderItem={Category}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.categories.loading,
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => {
      dispatch(actions.get());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
