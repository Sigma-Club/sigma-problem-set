import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    problem_name: {
        type: String,
        required: true
    },
    problem_link: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: [String],
        required: true
    }
})


const problem = mongoose.model('problem', problemSchema)

export default problem;