//@ts-check

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  loading: true,
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    appReady: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

const reducers = slice.reducer;
const actions = slice.actions;

export {reducers, actions};

export default slice;
