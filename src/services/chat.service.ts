import {
    FilterQuery,
    QueryOptions,
} from "mongoose";
import ChatModel, { ChatDocument } from "../models/chat.model";
import MessageModel, { MessageDocument } from "../models/message.model";

export function findChat(
    query: FilterQuery<MessageDocument>,
    skip: number,
    limit: number,
    sort: object
  ) {
    return MessageModel.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);
}

export function findAll() {
    return ChatModel.find()
    .lean();
}