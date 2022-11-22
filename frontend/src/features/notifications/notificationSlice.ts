import { INotificationsResponse } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";

const initialState: INotificationsResponse = {
  notifications: [],
  count: 0,
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload.notifications;
      state.count = action.payload.count;
      state.unreadCount = action.payload.unreadCount;
    },
    notificationCount(state, action) {
      // increment the count by 1 of the notification that matches the id
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload.id,
      );
      console.log("notificationCheck", notification);
    },
    notificationUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
  },
});

export const { setNotifications, notificationCount, notificationUnreadCount } =
  notificationSlice.actions;

export const selectNotifications = (state: { notifications: RootState }) =>
  state.notifications;

export default notificationSlice.reducer;
