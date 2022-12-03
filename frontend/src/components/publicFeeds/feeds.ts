export const feedIds = ["feeds"] as const;

export const activeFeedIds: FeedID[] = [];

export type FeedID = typeof feedIds[number];
