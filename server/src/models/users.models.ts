import { Document, Schema, model, isValidObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import omit from "lodash.omit";
import { IPost } from "./post.models";

enum EProvider {
  facebook = "facebook",
  google = "google",
  password = "password",
}

export enum EGender {
  male = "male",
  female = "female",
  other = "other",
}

export interface IUser extends Document {
  email?: string;
  _id?: string;
  username?: string;
  password?: string;
  provider?: EProvider;
  provider_id?: string;
  provider_access_token?: string;
  provider_refresh_token?: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  info?: {
    bio?: string;
    birthday: string;
    gender?: EGender;
  };
  bookmarks?: Array<IPost["_id"]>;
  profilePicture?: string;
  coverPicture?: string;
  fullName?: string;
  // dateJoined: Date | string;

  toUserJSON(): IUser;
  toProfileJSON(): IUser;
  passwordMatch(password: string): Promise<boolean>;
  isBookmarked(id: string): boolean;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      maxlength: 64,
      validate: {
        validator: (email: string) => {
          const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(email);
        },
        message: "{value} is not a valid email",
      },
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 4,
      maxlength: 32,
      validate: {
        validator: (username: string) => {
          const regex = /^[a-z]+_?[a-z0-9]{1,}?$/gi;
          return regex.test(username);
        },
        message: "Username must be preceded with letters followed by _ or numbers eg: john_123 | john123",
      },
    },

    provider: {
      type: String,
      default: EProvider.password,
      enum: Object.values(EProvider),
    },

    provider_id: {
      type: String,
      default: null,
    },

    provider_access_token: String,
    provider_refresh_token: String,

    firstName: {
      type: String,
      maxlength: 32,
    },

    lastName: {
      type: String,
      maxlength: 32,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    info: {
      bio: {
        type: String,
        maxlength: 256,
        default: "",
      },
      birthday: {
        type: Date,
      },
      gender: {
        type: String,
        default: EGender.other,
        enum: Object.values(EGender),
      },
    },
    profilePicture: {
      //cloudinary
      type: Object,
      default: {},
    },
    coverPhoto: {
      type: Object,
      default: {},
    },

    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    dateJoined: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, opt) {
        delete ret.password;
        delete ret.provider_access_token;
        delete ret.provider_refresh_token;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      getters: true,
      transform: function (doc, ret, opt) {
        delete ret.password;
        delete ret.provider_access_token;
        delete ret.provider_refresh_token;
        return ret;
      },
    },
  },
);

// virtuals to get fullName
userSchema.virtual("fullName").get(function (this: IUser) {
  const { firstName, lastName } = this;
  return firstName && lastName ? `${firstName} ${lastName}` : null;
});

userSchema.methods.passwordMatch = function (this: IUser, password) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.toUserJSON = function () {
  const user = omit(this.toObject(), ["password", "facebook", "createdAt", "updatedAt", "bookmarks"]);

  return user;
};

userSchema.methods.toProfileJSON = function (this: IUser) {
  return {
    id: this._id,
    username: this.username,
    fullName: this.fullName,
    firstName: this.firstName,
    profilePicture: this.profilePicture,
  };
};

userSchema.methods.isBookmarked = function (this: IUser, postID) {
  console.log(postID);
  if (!isValidObjectId(postID)) return false;

  return this.bookmarks.some(bookmark => {
    return bookmark._id.toString() === postID.toString();
  });
};

userSchema.pre("save", async function (this: IUser, next) {
  if (this.info.gender === null) this.info.gender = EGender.other;
  if (this.firstName === null) this.firstName = "";
  if (this.lastName === null) this.lastName = "";
  if (this.profilePicture === null) this.profilePicture = "";
  if (this.coverPicture === null) this.coverPicture = "";
  if (this.info.birthday === null) this.info.birthday = "";

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  console.log("user");

  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log("pre save", user.password);
    next();
  } else {
    next();
  }
});

const userModel = model<IUser>("User", userSchema);

export default userModel;
