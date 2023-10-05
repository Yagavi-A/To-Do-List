import { Request, Response } from "express"
import { User } from '../models/user'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { auth } from "../service/auth";
import {v4 as uuidv4} from "uuid";

dotenv.config();
const SALT_ROUNDS: any = Number(process.env.SALT_ROUNDS);


const getJwtToken = (user: any, email: string) => {

    return jwt.sign( { user_id: user.uID, email }, ((process.env.TOKEN_KEY as unknown) as any), { expiresIn: "1h" })
}

const userLogin = async(req:Request,res:Response)=>{
    try{
        const {uEmail ,uPassword} = req.body;
        const user: any = await User.findOne({ uEmail: uEmail });
        if(user && await (bcrypt.compare(uPassword,user.uPassword))){
            console.log("Login successful");
            const token = getJwtToken(user, uEmail)
            user.uToken = token
            await user.save();
            res.json(user);
        }
        else res.send("Invalid credentials");
    }
    catch (err){
        res.status(500).send(err);
    }
}

const userSignUp = async (req: Request, res: Response) => {
    req.body.uPassword = await bcrypt.hash(req.body.uPassword, SALT_ROUNDS)
    req.body.uID = 'USER' + uuidv4()
    const newUser = new User(req.body)
    newUser.save().then(() => {
        res.json({ message: "Created successfully" })
    }).catch((err) => {
        res.status(500).json({ message: err })
    })
}


export { userLogin, userSignUp }