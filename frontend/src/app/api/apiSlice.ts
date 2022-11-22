/* eslint-disable @typescript-eslint/ban-types */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const meetmaxUrl = import.meta.env.VITE_MEETMAX_URL || "http://localhost:9005";
const meetmaxApiVersion = import.meta.env.VITE_MEETMAX_API_VERSION || "v1";

const baseQuery = fetchBaseQuery({
  baseUrl: `${meetmaxUrl}/api/${meetmaxApiVersion}`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,

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
