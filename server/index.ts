import express, {Application} from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

import { listRouter } from './routes/toDolist'
import { userRouter } from './routes/user';

require('dotenv').config();


const app: Application = express()
//app.use(express.static("../client"))
app.use(express.json())
app.use(cors());

const PORT: any = process.env.PORT || 5000;
const CONNECTION_URL: any = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL).then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err)
})
app.use(express.static("../client"))
app.use("/api/v1/user", userRouter);
app.use("/api/v1/list", listRouter);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

