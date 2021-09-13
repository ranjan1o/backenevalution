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
        ref: 'batchs',
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
        const user = await Student.find().populate('batchId').lean().exec()
        return res.status(200).json({user})
    }
    catch{
        res.send("something wenr =t wrong")
        
    }
})
app.get("/agegreater18", async (req, res) => {
    try {
        const user = await Student.find({"age":{$gt:18}}).populate('batchId').lean().exec()
        return res.status(200).json({user})
    }
    catch{
        console.log("error");
        
    }
})
app.get("/noOfmanandWomen", async (req, res) => {
    var man = 0;
    var women = 0;
    try {
        const user = await Student.find().lean().exec()
        user.map(a => {
            if (a.gender =="Male") {
                man++;
            }
            else {
                women++;
            }
        })
        return res.status(200).json({"man":man,"women":women})
    }
    catch{
        console.log("error");
        
    }
})
app.get("/noStudents", async (req, res) => {
    let count = 0;
    try {
        const user = await Student.find().lean().exec()
        user.map(a => {
            count++;
        })
        return res.status(200).json({"Total Student":count})
    }
    catch{
        console.log("error");
        
    }
})
app.get("/MostInbatch", async (req, res) => {
    let count = 0;
    try {
        const user = await Student.find({"batchId":"613f1a323cebec0b444a8cfc"}).lean().exec()
        user.map(a => {
            count++;
        })
        return res.status(200).json({"batch":count})
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


