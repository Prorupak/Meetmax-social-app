import { apiSlice } from "@/app/api/apiSlice";
import { INotificationsResponse } from "@/types/types";

const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.mutation<
      INotificationsResponse,
      { params: { offset?: number } }
    >({
      query: ({ params: { offset } }) => ({
        url: "/notifications",
        method: "GET",
        params: {
          offset,
        },
      }),
      transformResponse: (response: { data: INotificationsResponse }) =>
        response.data,
      invalidatesTags: ["Notifications"],
    }),
    getUnreadNotifications: builder.mutation<{ count: number }, void>({
      query: () => ({
        url: "/notifications/unread",
        method: "GET",
      }),

      transformResponse: (response: { data: { count: number } }) =>
        response.data,

      invalidatesTags: ["Notifications"],
    }),
    readNotification: builder.mutation<{ state: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),

      invalidatesTags: ["Notifications"],
    }),
    markAllRead: builder.mutation<{ state: string }, void>({
      query: () => ({
        url: "/notifications/mark-all-read",
        method: "PUT",
      }),

      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsMutation,
  useGetUnreadNotificationsMutation,
  useReadNotificationMutation,
  useMarkAllReadMutation,
} = notificationApiSlice;
