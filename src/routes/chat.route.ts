import { Router } from 'express';
import {
    listAllChat,
    getChatById
} from '../controllers/chat.controller';

const router = Router();

router.get('/', listAllChat);
router.get('/:chatId', getChatById);

export default router;