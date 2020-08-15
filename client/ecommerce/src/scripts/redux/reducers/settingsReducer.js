import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    reques_load: (state) => state,
    load: (state, action) => {
      console.log('hello');
      state.lang = action.payload;
      return state;
    },
    update: (state, action) => {
      state.lang = action.payload;
      return state;
    },
  },
});

export default slice;
