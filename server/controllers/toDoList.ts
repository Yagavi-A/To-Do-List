import { Request, Response } from "express";
import { List } from "../models/toDoList";
import {v4 as uuidv4} from 'uuid'

const createList = async (req: Request, res: Response) => {
  req.body.uID = 'List' + uuidv4();
  const { Name, Category, Description, Deadline } = req.body; 
  console.log('Request body:', req.body);

  try {
    if (!Name || Name.trim() === "") {  
      return res.status(400).json({ message: "Name is required" });
    }

    const existingList = await List.findOne({ Name });  
    if (existingList) {
      return res.status(400).json({ message: "You have already created this list" });
    }

    const newList = new List({
      Name,
      Category,
      Description,
      Deadline,
    });

    const savedList = await newList.save();
    res.json({ message: "List is added successfully", savedList });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to add list", error: error.message });
  }
};

const readList = async (req: Request, res: Response) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch lists", error: error.message });
  }
}
const readOneList = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const list = await List.findOne({_id:id});
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch lists", error: error.message });
  }
}

const deleteList = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedList = await List.deleteOne({_id: id});  
    if (deletedList.deletedCount === 1) {
      res.json({ message: "List deleted successfully" });
    } else {
      res.status(404).json({ message: "List is not Found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error", error });
  }
}

const updateList = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const listObj = await List.findOneAndUpdate({ _id: id }, updateData, { new: true });
    if (!listObj) {
      return res.status(404).json({ message: 'List not found' });
    }
    await listObj.save();
    res.json(listObj);  // Return the updated list object
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};




export { createList, readList, deleteList, updateList, readOneList };
