import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function initDB() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    await db.on('connected', () => {
        console.log('connected to database')
    })

    await db.on('error', (err) => {
        console.log('Error occured', err)
    })
}


export default initDB;