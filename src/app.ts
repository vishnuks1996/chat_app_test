import express,{Request,Response} from "express";
import config from "config";
import logger from "./config";
import dbConnect from "./config/db"
import cors from "cors";
import env from'dotenv';
import chatRoutes from "./routes/chat.route";
import createError from "http-errors";
import errorHandler from './middlewares/error-handler.middleware';
import { CustomError } from './interfaces/custom-error';

env.config();

const port = config.get("port") as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dbConnect();

app.get("/",(req: Request,res: Response)=>{
    res.send("Api server set and running for Chat App");
});
app.use('/chat', chatRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new CustomError('Not Found', 404)
    next(error);
  });
  
// error handler
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server started in ${ port }`);
});