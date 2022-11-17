import { createSlice } from "@reduxjs/toolkit";
import { INewsFeed, IPost } from "@/types/types";

const initialState: INewsFeed = {
  items: [],
  hasNewFeed: false,
  offset: 0,
};

const newsfeedSlice = createSlice({
  name: "newsfeed",
  initialState,
  reducers: {
    addNewsFeed(state, action) {
      state.items = [...state.items, ...action.payload];
      state.offset += action.payload.length;
    },

    setHasNewFeed(state, action) {
      state.hasNewFeed = action.payload;
    },
    clearNewsFeed(state) {
      state.items = [];
      state.offset = 0;
      state.hasNewFeed = false;
    },
    updateNewsFeed(state, action) {
      const { posts } = action.payload;
      const { items } = state;
      const newItems = items.map((post: IPost) => {
        if (posts.id === post.id) {
          return posts;
        }
        return post;
      });
      console.log(`updatedNewsfeed`, newItems);
      state.items = newItems;
    },
    updatePostLikes(state, action) {
      const { likesCount, likeState, postID } = action.payload;
      const updatedItems = state.items.map((post: IPost) => {
        if (post.id === postID) {
          return {
            ...post,
            likesCount,
            isLiked: likeState,
          };
        }
        return post;
      });
      console.log(`updatedItems`, updatedItems);
      state.items = updatedItems;
    },
  },
});

export const { addNewsFeed, setHasNewFeed } = newsfeedSlice.actions;
export default newsfeedSlice.reducer;
