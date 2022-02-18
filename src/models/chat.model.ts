import mongoose from "mongoose";

export interface ChatDocument extends mongoose.Document {
  user_1: string;
  user_2: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new mongoose.Schema(
  {
    user_1: { 
        type: String, 
        required: true
    },
    user_2: { 
        type: String, 
        required: true
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model<ChatDocument>("Chat", chatSchema);

export default Chat;
