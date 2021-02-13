import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: "Text is reqired"
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})


const model = mongoose.model("Comment", CommentSchema);

export default model;