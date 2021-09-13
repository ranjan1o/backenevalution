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
app.use(express.json())
//student schema
const studentSchema = new mongoose.Schema({
    first_Name: { type: String, requred: true },
    last_Name: { type: String, requred: true },
    age: { type: Number, requred: true },
    gender:{ type: String, requred: true },
    course_name:{type:String,requred:true},
})
//creating model for schema
const Student = mongoose.model('students', studentSchema);

app.post('/students', async (req, res) => {
    try {
        const user = await Student.create(req.body)
        console.log(user);
    }
    catch (err) {
        res.send("error ocured");
    }
})
app.get("/students", async (req, res) => {
    try {
        const user = await Student.find().lean().exec()
        
    }
    catch {
        console.log("error");
        
    }
})


app.listen(3001, async (req,res) => {
    await connect();
    console.log("port is running")
})


