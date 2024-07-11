import { Router } from "express";
// import authRouter from "./auth.js";
import {waterRouter} from "./water.js";

const rootRouter = Router();

rootRouter.use('/water', waterRouter);
// rootRouter.use('/user', userRouter);



export default rootRouter;