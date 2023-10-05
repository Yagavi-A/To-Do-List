import { Router } from "express";
import { userLogin, userSignUp } from "../controllers/user";

const userRouter: Router = Router();
userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignUp);

export { userRouter }