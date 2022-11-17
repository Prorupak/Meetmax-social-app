export interface CustomError {
  data: {
    status_code: number;
    error: {
      message: string;
      title: string;
    };
  };
}

export interface ILoginResponse {
  auth: IAuth;
  user: IUser;
}

export interface IRegisterResponse {
  data: IUser;
}

export interface ICheckSession {
  auth: IAuth;
  user: IUser;
}

export interface IAuth {
  id: string;
  email: string;
  username: string;
}

export interface ISettingsState {
  theme: "light" | "dark";
}

export interface INewsFeed {
  items: IPost[];
  hasNewFeed: boolean;
  offset: number;
}

export interface IPost {
  id: string;
  privacy: "public" | "private" | "follower";
  photos: Record<string, any>[];
  comments: any[];
  description: string;
  likes: any[];
  author: IUser;
  commentsCount: number;
  likesCount: number;
  isBookmarked: boolean;
  isLiked: boolean;
  isOwnPost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  profilePicture?: string | Record<string, any>;
  isEmailValidated: boolean;
  [prop: string]: any;
}

export interface IHelperState {
  targetComment: IComment | null;
  targetPost: IPost | null;
}

export interface IModalState {
  isOpenDeleteComment: boolean;
  isOpenDeletePost: boolean;
  isOpenEditPost: boolean;
  isOpenPostLikes: boolean;
}

export interface IComment {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  depth: number;
  replyCount: number;
  likesCount: number;
  post_id: string;
  isOwnComment: boolean;
  isPostOwner: boolean;
  isLiked: boolean;
  author: IUser;
}

export interface IChatItemsState {
  username: string;
  id: string;
  offset: number;
  profilePicture?: string | Record<string, any>;
  fullname: string;
  minimized: boolean;
  chats: IMessage[];
}

export interface IChatState {
  items: IChatItemsState[];
  active: string;
}

export interface IProfile {
  _id: string;
  id: string;
  username: string;
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  info: {
    bio: string;
    birthday: string;
    gender: string;
  };
  isEmailValidated: boolean;
  profilePicture?: string | Record<string, any>;
  isOwnProfile: boolean;
  coverPhoto?: string | Record<string, any>;
  dateJoined: Date | string;
  followingCount: number;
  followersCount: number;
  [prop: string]: any;
}

export interface IPostState {
  user_id: string;
  items: IPost[];
  offset: number;
}

export interface IUserState {
  data: IProfile | null;
  posts: IPost[];
  postsOffset: number;
  followers: IProfile[];
  followersOffset: number;
  following: IProfile[];
  followingOffset: number;
  bookmarks: IBookmark[];
  bookmarksOffset: number;
  developer: IProfile | null;
}

export interface INotification {
  id: string;
  initiator: IProfile;
  target: IProfile;
  createdAt: Date;
  type: string;
  unread: boolean;
  link: string;
}

export interface INotificationsResponse {
  notifications: INotification[];
  count: number;
  unreadCount: number;
}

export interface IMessage {
  id: string;
  from: IUser;
  to: IUser;
  text: string;
  createdAt: Date;
  seen: boolean;
  unseenCount?: number;
  isOwnMessage?: boolean;
}

export interface IFollowers {
  isFollowing?: boolean;
  id?: string;
  username?: string;
  email?: string;
  profilePicture?: Record<string, unknown>;
}

export interface IBookmark {
  id: string;
  isBookmarked: boolean;
  post: IPost;
  createdAt: Date;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
}

export interface ICreatePost {
  description: string;
  photos?: [];
}

export interface IFetchParams {
  offset?: number;
  limit?: number;
  skip?: number;
  q?: string;
  type?: string;
  sort?: "asc" | "desc";
}

export interface IError {
  status_code: number;
  data: any;
  error: {
    message: string;
    title: string;
    type: string;
  };
  success: boolean;
  timestamp: string | Date;
  [prop: string]: any;
}

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IFileHandler<T> {
  imageFile: T;
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    callback?: (file?: IImage) => void,
  ) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}

export interface IPreferenceState {
  theme: "light" | "dark";
  targetComment: IComment | null;
  targetPost: IPost | null;
  hasSentVerificationMail: boolean;
  sendVerificationMailError: any;
  isOpenVerificationMessage: boolean;
}
