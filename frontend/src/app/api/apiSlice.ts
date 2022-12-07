import { CustomError } from "@/types/types";
import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

const NextGenUrl = import.meta.env.VITE_NextGen_URL || "http://localhost:9005";
const NextGenApiVersion = import.meta.env.VITE_NextGen_API_VERSION || "v1";

const baseQuery = fetchBaseQuery({
  baseUrl: `${NextGenUrl}/api/${NextGenApiVersion}`,
  credentials: "same-origin",
  prepareHeaders: headers => {
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    Record<string, unknown>
  >,

  tagTypes: [
    "User",
    "Auth",
    "Feed",
    "Notifications",
    "Followers",
    "SuggestedUser",
    "Profile",
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder: any) => ({}),
});
