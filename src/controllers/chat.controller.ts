import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import {
    findAll,
    findChat
} from "../services/chat.service";
import { CustomError } from '../interfaces/custom-error';

export async function listAllChat(req: Request, res: Response, next: NextFunction) {
    let newChats: Array<object> = [];
    try {
        let chats = await findAll();
        let messages = await findChat({ $in: chats.map(chat => chat._id) }, 0, 1, { createdAt: -1 });
        chats.forEach(chat => {
            let message = messages.find(message => message.chatId == chat._id);
            newChats.push({ chat, message })
        })
        return res.status(200).send({ newChats, message: 'Data retrieved successfully' });
    } catch (error) {
        next(error)
    }
}

export async function getChatById(req: Request, res: Response, next: NextFunction) {
    let chatId = get(req, "params.chatId");
    let skip = get(req, "query.skip");
    let limit = get(req, "query.limit");
    try {
        const messages = await findChat({ chatId }, skip, limit, {});
        if (!messages.length) throw new CustomError('Chat not found', 404);
        return res.status(200).send({ messages, message: 'Data retrieved successfully' });
    } catch (error) {
        next(error)
    }
}