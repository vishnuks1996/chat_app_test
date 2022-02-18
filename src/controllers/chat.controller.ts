import { Request, Response } from "express";
import { get } from "lodash";
import {
    findAll,
    findChat
} from "../services/chat.service";

export async function listAllChat(req: Request, res: Response) {
    let newChats: Array<object> = [];
    let chats = await findAll();
    let messages = await findChat({ $in: chats.map(chat => chat._id) }, 0, 1, {createdAt: -1});
    chats.forEach(chat => {
       let message = messages.find(message => message.chatId == chat._id);
       newChats.push({chat, message})
    })

    return res.status(200).send({newChats, message: 'Data retrieved successfully'});
}

export async function getChatById(req: Request, res: Response) {
    let chatId = get(req, "params.chatId");
    let skip = get(req, "query.skip");
    let limit = get(req, "query.limit");
    const messages = await findChat({ chatId }, skip, limit, {});
    return res.status(200).send({messages, message: 'Data retrieved successfully'});
}