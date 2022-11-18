import { apiSlice } from "@/app/api/apiSlice";
import { ILoginResponse, IRegister, IRegisterResponse, ICheckSession } from "@/types/types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, IRegister>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      transformResponse: (response: { data: ILoginResponse }) => {
        return response.data;
      },
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<IRegisterResponse, string>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: IRegisterResponse }) => {
        return response.data;
      },
      transformErrorResponse: (response) => {
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
    checkSession: builder.mutation<ICheckSession, void>({
      query: () => ({
        url: "/auth/check-session",
        method: "GET",
      }),
      transformResponse: (response: { data: ICheckSession }) => {
        return response.data;
      },
      invalidatesTags: ["Auth"],
      transformErrorResponse: (response) => {
        console.log("response", response);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useCheckSessionMutation } =
  authApiSlice;
