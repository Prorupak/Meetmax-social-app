import { apiSlice } from "@/app/api/apiSlice";
import {
  IProfile,
  IFetchParams,
  IPost,
  IAPIParams,
  IBookmark,
  IFollowers,
} from "@/types/types";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchProfile: builder.query<IProfile, string>({
      query: username => ({
        url: `/user/${username}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IProfile }) => response.data,
      providesTags: (result, error, username) =>
        result
          ? [{ type: "Profile", username }]
          : [{ type: "Profile", username }],
    }),
    fetchPostByUsername: builder.query<
      IPost[],
      { username: string; params?: IAPIParams }
    >({
      query: ({ username, params }) => ({
        url: `/${username}/post`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: IPost[] }) => response.data,
      providesTags: (result, error, { username }) =>
        result
          ? [{ type: "Profile", username }]
          : [{ type: "Profile", username }],
    }),
    fetchUserFollowers: builder.query<IFollowers[], string>({
      query: username => `followers/${username}`,
      transformResponse: (response: { data: IFollowers[] }) => response.data,
      providesTags: ["Followers"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("follow", data);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    fetchUserFollowing: builder.query<IFollowers[], string>({
      query: username => `following/${username}`,
      transformResponse: (response: { data: IFollowers[] }) => response.data,
      providesTags: ["Followers"],
    }),
    fetchBookmarks: builder.query<
      IBookmark[],
      { username: string; params?: IFetchParams }
    >({
      query: ({ username, params }) => ({
        url: `/${username}/bookmarks`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: IBookmark[] }) => response.data,
    }),
  }),
});

export const {
  useFetchProfileQuery,
  useFetchPostByUsernameQuery,
  useFetchBookmarksQuery,
  useFetchUserFollowersQuery,
  useFetchUserFollowingQuery,
} = profileApiSlice;
