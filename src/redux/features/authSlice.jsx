import { createSlice } from "@reduxjs/toolkit";

let username = "";
let role = "";
const userSlice = createSlice({
  name: "user",
  initialState: { username, role },
  reducers: {
    user: (state, action) => {
      console.log("entered slice", action);
      console.log(action.payload);
      state.username = action.payload;
      return;
    },
    role: (state, action) => {
      console.log("entered slice", action);
      console.log(action.payload);
      state.role = action.payload;
      return;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
