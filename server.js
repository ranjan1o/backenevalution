const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/collegeDataBase', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
}
app.listen(3001, async (req,res) => {
    await connect();
    console.log("port is running")
})


