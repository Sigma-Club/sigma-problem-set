import express from "express";
import dotenv from 'dotenv'
import initDB from './db/initDB.js'
import problem from './db/problemSchema.js'
import cors from 'cors'
import generateToken from './generateToken.js'
import protect from "./middleware.js";
dotenv.config()

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors({
    origin: ["https://sigmaproblemset.netlify.app/", "http://localhost:3000"],
}))

const token = generateToken(process.env.ADMIN_ID)

app.get('/', (req, res) => {

    problem.find({})
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message
            })
        })
})

app.post('/', protect, (req, res) => {
    const { problemName, tagsList, problemLink } = req.body;
    const new_problem = new problem({
        problem_name: problemName,
        tags: tagsList,
        problem_link: problemLink
    })

    new_problem.save()
        .then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json({
                message: error.message
            })
        })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    initDB()
    console.log(`Server is running on http://localhost:${port}`)
})