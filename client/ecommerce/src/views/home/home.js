//@ts-check

import React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../scripts/redux/reducers/productsReducer';
import {FlatList} from 'react-native-gesture-handler';
import Loading from '../../componets/Loading';
import Product from '../../componets/Product';

const numOfCols = 2;

const Home = ({products, getProduct, loading, appReady}) => {
  React.useEffect(() => {
    if (appReady) getProduct();
  }, [appReady]);
  React.useEffect(() => {
    console.log(products);
  }, [products]);

  const item = ({item}) => {
    return <Text>{item.name}</Text>;
  };

  return (
    <View>
      {!appReady || loading ? (
        <Loading></Loading>
      ) : (
        <FlatList
          data={products}
          renderItem={({item}) => (
            <Product
              item={item}
              colnum={numOfCols}
              onPress={() => console.log('Click')}
            />
          )}
          numColumns={numOfCols}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.products.loading,
    products: state.products.products,
    appReady: !state.app.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: () => dispatch(actions.getProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
