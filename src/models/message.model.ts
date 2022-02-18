import mongoose from "mongoose";
import { ChatDocument } from "./chat.model";

export interface MessageDocument extends mongoose.Document {
    chatId: ChatDocument["_id"];
    sender: string;
    recevier: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    chatId: {
        type: String, 
        required: true
    },
    sender: { 
        type: String, 
        required: true
    },
    recevier: { 
        type: String, 
        required: true
    },
    message: { 
        type: String, 
        required: true
    }
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", messageSchema);

export default Message;
