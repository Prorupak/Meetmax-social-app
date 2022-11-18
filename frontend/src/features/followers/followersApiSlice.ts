import { IFollowers } from "@/types/types";
import { apiSlice } from "@/app/api/apiSlice";
import { setFollowers } from "./followersSlice";

const followersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation<IFollowers, { follow_id: string }>({
      query: ({ follow_id }) => ({
        url: `follow/${follow_id}`,
        method: "POST",
      }),
      transformResponse: (response: { data: IFollowers }) => response.data,
      invalidatesTags: ["Followers"],
    }),
    unfollowUser: build.mutation<IFollowers, { follow_id: string }>({
      query: ({ follow_id }) => ({
        url: `unfollow/${follow_id}`,
        method: "POST",
      }),
    }),
    getUserFollowers: build.query<IFollowers[], string>({
      query: (username) => `followers/${username}`,
      transformResponse: (response: { data: IFollowers[] }) => response.data,
      providesTags: ["Followers"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("follow", data);
          dispatch(setFollowers(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUserFollowing: build.query<IFollowers[], string>({
      query: (username) => `following/${username}`,
      transformResponse: (response: { data: IFollowers[] }) => response.data,
      providesTags: ["Followers"],
    }),
    suggestedUsers: build.query<any[], void>({
      query: () => `users/suggested`,
      transformResponse: (response: { data: any[] }) => response.data,
      providesTags: ["SuggestedUser"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useSuggestedUsersQuery,
} = followersApiSlice;
