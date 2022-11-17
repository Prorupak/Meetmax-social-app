import { RootState } from "@/app/store/store";
import { createCachedSelector } from "re-reselect";

import { createSlice } from "@reduxjs/toolkit";
import { IFollowers } from "@/types/types";

const initialState: IFollowers = {
  isFollowing: false,
  id: "",
  username: "",
  email: "",
  profilePicture: {},
};

const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      console.log("setFollowers", action.payload);
      return action.payload;
    },
  },
});

export const selectFollowers = ({ root }: RootState) => root.followers;

// memoized selector
export const getFollowers = createCachedSelector(
  selectFollowers,
  (_: RootState, username: string) => username,
  (followers, username) => followers,
)((_: RootState, username: string) => username);

export const { setFollowers } = followersSlice.actions;

export default followersSlice.reducer;
