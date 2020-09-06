import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
};

const slice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    get: (state) => ({
      ...state,
      loading: true,
    }),
    get_success: (state, action) => {
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    },
  },
});
const actions = slice.actions;
const reducers = slice.reducer;
export {actions, reducers};

export default slice;
