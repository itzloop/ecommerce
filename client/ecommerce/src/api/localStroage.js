//@ts-check

import AsyncStorage from '@react-native-community/async-storage';
class LocalStroage {
  keys = {
    user: 'user',
  };

  wrappers = {
    getUser: async () => await this.getData(this.keys.user, true),
  };

  async storeData(key, value) {
    try {
      let val;
      if (typeof value === 'object') val = JSON.stringify(value);
      else val = value;
      await AsyncStorage.setItem(key, val);
    } catch (e) {
      console.log(e);
    }
  }

  async getData(key, isObject) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null
        ? isObject
          ? JSON.parse(jsonValue)
          : jsonValue
        : null;
    } catch (e) {
      return e;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      throw e;
    }
  }
}

const localStorage = new LocalStroage();

export default localStorage;
