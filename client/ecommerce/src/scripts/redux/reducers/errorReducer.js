import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  errors: [],
};

const slice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      return {
        ...state,
        errors: state.errors.concat(action.payload),
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        errors: state.errors.filter((x) => x.type !== action.payload),
      };
    },
    clear: (state) => {
      return {
        ...state,
        errors: [],
      };
    },
  },
});
const actions = slice.actions;
const reducers = slice.reducer;
export {actions, reducers};

export default slice;
