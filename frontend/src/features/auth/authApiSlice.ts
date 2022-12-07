import { useRef } from "react";
import { apiSlice } from "@/app/api/apiSlice";
import {
  ILoginResponse,
  IRegisterResponse,
  ICheckSession,
} from "@/types/types";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      ILoginResponse,
      { username: string; password: string }
    >({
      query: body => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      transformResponse: (response: { data: ILoginResponse }) => {
        return response.data;
      },
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { user } = data;
          dispatch(setCredentials(user));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    emailLogin: builder.mutation<{ redirect: string }, { username: string }>({
      query: ({ username }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: { username },
      }),
      transformResponse: (response: { data: { redirect: string } }) =>
        response.data,
    }),
    register: builder.mutation<IRegisterResponse, string>({
      query: body => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: IRegisterResponse }) => {
        return response.data;
      },
      transformErrorResponse: response => {
        console.log("response", response);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<null, string>({
      query: (body: string) => ({
        url: "/auth/logout",
        method: "Delete",
        body,
      }),
    }),
    checkSession: builder.query<ICheckSession, void>({
      query: () => ({
        url: "/auth/check-session",
        method: "GET",
      }),
      transformResponse: (response: { data: ICheckSession }) => {
        return response.data;
      },
      providesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { user } = data;
          dispatch(setCredentials(user));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    checkSessionMut: builder.mutation<ICheckSession, void>({
      query: () => ({
        url: "/auth/check-session",
        method: "GET",
      }),
      transformResponse: (response: { data: ICheckSession }) => {
        return response.data;
      },
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { user } = data;
          dispatch(setCredentials(user));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    recoverAccount: builder.mutation<null, { email: string }>({
      query: ({ email }) => ({
        url: "/auth/account/recover",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<
      null,
      { user_id: string; token: string; password: string }
    >({
      query: body => ({
        url: "/auth/account/reset-password",
        method: "POST",
        body,
      }),
    }),
    accountVerification: builder.mutation<null, string>({
      query: (body: string) => ({
        url: "/auth/account/verify",
        method: "POST",
        body,
      }),
    }),
    accountVerificationToken: builder.query<null, string>({
      query: (token: string) => ({
        url: `/auth/account/verify/${token}`,
        method: "GET",
      }),
    }),
    googleOAuth: builder.mutation<{ data: any }, string>({
      query: url => ({
        url: url,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckSessionQuery,
  useAccountVerificationMutation,
  useAccountVerificationTokenQuery,
  useRecoverAccountMutation,
  useResetPasswordMutation,
  useGoogleOAuthMutation,
  useCheckSessionMutMutation,
  useEmailLoginMutation,
} = authApiSlice;
