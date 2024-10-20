import { Hono } from "hono";
import { userRouter } from "./user";
import { adminRouter } from "./admin";

export const rootRouter = new Hono();

rootRouter.route('/user', userRouter)
rootRouter.route('/admin', adminRouter)