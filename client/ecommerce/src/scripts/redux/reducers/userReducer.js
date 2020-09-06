//@ts-check

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

const slice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    signup: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    auth_success: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        user: {
          ...data,
        },
        loading: false,
      };
    },
    logout: () => initialState,
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    initialize: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    getProfile: (state) => {
      return {...state, loading: true};
    },
    getProfileSuccess: (state, action) => {
      return {...state, ...action.payload, loading: false};
    },
  },
});

const actions = slice.actions;
const reduecrs = slice.reducer;
export {actions, reduecrs};
export default slice;
