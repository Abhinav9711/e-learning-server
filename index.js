require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const { connectDb } = require('./dbConnection/connect');
const userRouter = require('./router/routes')

const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
app.use('/student', userRouter);
app.use('/', (req, res) => {
    res.send("Welcome to the E - Learning System");
})

const start = async () => {
    try {
        await connectDb();
        app.listen(port, function () {
            console.log(`server is running on port: `, port);
        })
    }
    catch (error) {
        console.log(error);
    }
}

start();
