const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const employee = require('./routes/api/employee');
const products = require('./routes/api/product');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-requested-with,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
    next();

})


if (process.env.NODE_ENV === "production") {
    
    app.use(express.static('client/build/'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname , 'client','build','index.html'));
    });

}


//Bodyaparser Middleware 
app.use(bodyParser.json());

//db config
const db = process.env.MONGOURI || 'mongodb://127.0.0.1:27017/xyzproducts';

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology:true });

mongoose.connection.once('open', function () {
    console.log(`connection has been made `);
}).on('error', function (err) {
    console.log('connection errr', err);
})

//api routes
app.use('/api/employee/', employee);
app.use('/api/products/', products);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server started at port  ${port}`)); 