import {Router} from "express";
import { createList, deleteList, readList, updateList, readOneList} from "../controllers/toDoList";

const listRouter: Router = Router();

listRouter.post("/create",createList);
listRouter.get("/all", readList);
listRouter.delete("/:id",deleteList);
listRouter.get("/readOneList/:id",readOneList)
listRouter.post("/update/:id",updateList);

export {listRouter}

