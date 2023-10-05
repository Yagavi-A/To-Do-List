import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    Name: {
        type: String,
        unique: true,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Deadline: {
        type: String,
        required: true
    }
});

const List = mongoose.model("List", listSchema);
export { List };
