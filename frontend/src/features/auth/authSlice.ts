import { IUser } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = IUser | null;

const initialState: IUser | null = null as TAuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
      return state;
    },
    logOut: state => {
      state = null;
      return state;
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      if (state) {
        state = {
          ...state,
          profilePicture: action.payload,
        };
      }
    },
  },
});

export const { setCredentials, logOut, updateProfilePicture } =
  authSlice.actions;
export default authSlice.reducer;
