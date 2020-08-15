//@ts-check

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
    token: '',
  },
  loading: false,
};

const slice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          password: action.payload.password,
        },

        loading: true,
      };
    },
    signup: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },

        loading: true,
      };
    },
    auth_success: (state, action) => {
      const user = state.user;
      const data = action.payload;
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...user,
          token: data.token,
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
  },
});

export default slice;
