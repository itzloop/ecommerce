import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  prodcuts: null,
  loading: false,
};

const slice = createSlice({
  name: 'prodcuts',
  initialState: initialState,
  reducers: {
    getProduct: (state) => ({
      ...state,
      loading: true,
    }),
    prodcutGetSuccess: (state, action) => {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    },
  },
});
const actions = slice.actions;
const reducers = slice.reducer;
export {actions, reducers};

export default slice;
