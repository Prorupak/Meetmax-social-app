import { Document, model, Schema } from "mongoose";
import { IMessage } from "./message.models";
import { IUser } from "./users.models";

export interface IChat extends Document {
  participants: Array<IUser["_id"]>;
  lastMessage: IMessage["_id"];
}

const ChatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { getters: true, virtuals: true } },
);

export default model<IChat>("Chat", ChatSchema);
