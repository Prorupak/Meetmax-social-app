import { IFollowers } from "@/types/types";
import { apiSlice } from "@/app/api/apiSlice";

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
  useSuggestedUsersQuery,
} = followersApiSlice;
