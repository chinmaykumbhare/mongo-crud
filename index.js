const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');

const server = express();
server.set('view engine', 'ejs');

const db = "mongodb://localhost:27017/training";

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected");
    } catch (error) {
        throw error;
    }
}

connectDB();

const empModel = require('./db/employeeSchema');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/', async(request, response) => {
    
    let data = [];

    const listEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:8090/data');
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };
    
    data = await listEmployees();
    console.log(data);

    response.render('home', {data});
});

server.post('/add', (request, response) => {
    const name = request.body.name;
    const img = request.body.img;

    console.log(name);
    console.log(img);

    const insertData = new empModel({ name: name, image: img });
    insertData.save((err) => {
        if (err) response.send('Entry Already Added');
        response.send('Entry Added successfully');
    })
});

server.get('/data', (request, response) => {
    empModel.find({}, (err, data) => {
        if (err) throw err;
        response.send(data);
    })
});

server.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    empModel.deleteOne({ _id: id }, (err) => {
        if (err) throw err;
        response.send("Data Deleted Successfully");
    })
})

server.put('/update/:id', (request, response) => {
    const id = request.params.id;
    const name = request.body.name;
    const img = request.body.img;

    empModel.updateOne({ _id: id }, { $set: { name: name, image: img } }, (err) => {
        if (err) throw err;
        response.send("Details updated successfully");
    });
})

server.listen(8090);