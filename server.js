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
    first_Name: { type: String, required: true },
    last_Name: { type: String, required: true },
    age: { type: Number, required: true },
    gender:{ type: String, required: true },
    course_name: { type: String, required: true },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batch',
        required: true
    }
})
//batch scema
const batchSchema = new mongoose.Schema({
    batchName:{type:String,required:true}
})

//creating model for schema
const Student = mongoose.model('students', studentSchema);
// creating model for batch
const Batch=mongoose.model('batchs',batchSchema)
app.post('/students', async (req, res) => {
    try {
        const user = await Student.create(req.body)
        console.log(user);
        res.send("done")
    }
    catch (err) {
        res.send("error ocured");
    }
})
app.get("/students", async (req, res) => {
    try {
        res.send("hi") 
    }
    catch{
        console.log("error");
        
    }
})

//batch crud
app.post('/batch', async (req, res) => {
    try {
        console.log("inside batch")
        const user = await Batch.create(req.body)
    
        console.log(user);
        res.send("done")
    }
    catch (err) {
        res.send("error ocured");
    }
})

app.listen(3001, async (req,res) => {
    await connect();
    console.log("port is running")
})


