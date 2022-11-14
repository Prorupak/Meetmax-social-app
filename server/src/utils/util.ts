import { IUser } from "@/models/users.models";
import Filter from "bad-words";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (value !== null && typeof value === "object" && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

interface IResponseStatus {
  status_code: number;
  success: Boolean;
  data: any;
  error: any;
  timestamp: string | Date;
}

const initStatus: IResponseStatus = {
  status_code: 404,
  success: false,
  data: null,
  error: null,
  timestamp: null,
};

const sessionizeUser = (user: Partial<IUser>) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  profilePicture: user.profilePicture,
});

const makeResponseJson = (data: any, success = true) => {
  return {
    ...initStatus,
    status_code: 200,
    success,
    data,
    timestamp: new Date(),
  };
};

const newBadWords = [
  "gago",
  "puta",
  "animal",
  "porn",
  "amputa",
  "tangina",
  "pota",
  "puta",
  "putangina",
  "libog",
  "eut",
  "iyot",
  "iyutan",
  "eutan",
  "umiyot",
  "karat",
  "pornhub",
  "ptngina",
  "tngina",
];

const filterWords = new Filter();
filterWords.addWords(...newBadWords);

export { makeResponseJson, sessionizeUser, filterWords };
