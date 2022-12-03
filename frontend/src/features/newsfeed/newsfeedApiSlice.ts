import { IFetchParams, IPost } from "@/types/types";
import { apiSlice } from "@/app/api/apiSlice";

const newsFeedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNewsFeed: builder.query<IPost[], { params: IFetchParams }>({
      query: ({ params }) => ({
        url: "/feed",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetNewsFeedQuery } = newsFeedApiSlice;
