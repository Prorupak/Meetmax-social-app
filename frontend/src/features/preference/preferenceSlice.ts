import { IComment, IPost, IPreferenceState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IPreferenceState = {
  theme: "light",
  language: "en",
  targetComment: null,
  targetPost: null,
  sendVerificationMailError: null,
  hasSentVerificationMail: false,
  isOpenVerificationMessage: false,
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<"en" | "np" | "fr">) => {
      state.language = action.payload;
    },
    setTargetComment: (state, action: PayloadAction<IComment | null>) => {
      state.targetComment = action.payload;
    },
    setTargetPost: (state, action: PayloadAction<IPost | null>) => {
      state.targetPost = action.payload;
    },
    setHasSentVerificationMail: (state, action: PayloadAction<boolean>) => {
      state.hasSentVerificationMail = action.payload;
    },
    setSendVerificationMailError: (state, action: PayloadAction<any>) => {
      state.sendVerificationMailError = action.payload;
    },
    setIsOpenVerificationMessage: (state, action: PayloadAction<boolean>) => {
      state.isOpenVerificationMessage = action.payload;
    },
    closeVerificationMessage: (state) => {
      state.isOpenVerificationMessage = false;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  setTargetComment,
  setTargetPost,
  setHasSentVerificationMail,
  setSendVerificationMailError,
  setIsOpenVerificationMessage,
  closeVerificationMessage,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;
