import { IPost, IProfile, IUserState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
  data: null,
  posts: [],
  postsOffset: 0,
  followers: [],
  followersOffset: 0,
  following: [],
  followingOffset: 0,
  bookmarks: [],
  bookmarksOffset: 0,
  developer: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileInfo: (state, action: PayloadAction<IProfile>) => {
      const { payload: user } = action;

      return {
        ...state,
        data: {
          ...state.data,
          fullName: user.fullName,
          firstName: user.firstName,
          LastName: user.lastName,
          info: user.info,
        },
      } as any;
    },
    updateCoverPhoto: (state, action: PayloadAction<string>) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            coverPhoto: action.payload,
          },
        };
      }

      return state;
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            profilePicture: action.payload,
          },
        };
      }

      return state;
    },
    updateProfilePostLikes: (
      state,
      action: PayloadAction<{
        postID: string;
        state: boolean;
        likesCount: number;
      }>,
    ) => {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postID) {
            return {
              ...post,
              isLiked: action.payload.state,
              likesCount: action.payload.likesCount,
            };
          }
          return post;
        }),
      };
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    addPostToProfile: (state, action: PayloadAction<IPost>) => {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    },
    deletePostFromProfile: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        posts: state.posts.filter(post => {
          if (post.id !== action.payload) {
            return post;
          }
        }),
      };
    },
    updatePostFromProfile: (state, action: PayloadAction<IPost>) => {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              ...action.payload,
            };
          }

          return post;
        }),
      };
    },
    setPostsOffset: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        postsOffset: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearProfile: (state, action: PayloadAction) => {
      return initialState;
    },
  },
});

export const {
  updateProfileInfo,
  updateCoverPhoto,
  updateProfilePicture,
  updateProfilePostLikes,
  setPosts,
  addPostToProfile,
  deletePostFromProfile,
  updatePostFromProfile,
  setPostsOffset,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
