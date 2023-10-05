import express, { Application } from 'express'
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const app:Application = express();

const auth = (token:string)=>{
    try{
        if(!token)
        {
            return({success:false, message: "Error!Token was not provided."});
        }
        const decodedToken = jwt.verify(token,((process.env.TOKEN_KEY as unknown) as string) );
        return decodedToken;
    }
    catch(error) 
    {
        return "Authorization Failed";
    }
}

export {auth}