import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: {},
  },
  reducers: {
    initUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  initUser,
} = userSlice.actions;

export default userSlice.reducer;
