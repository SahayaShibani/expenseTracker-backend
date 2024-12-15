const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const {readdirSync} = require('fs')
const app = express();

const incomeRoute = require('./routes/transactions')
require('dotenv').config();
const PORT = process.env.PORT || 5000

// middleware
app.use(express.json());
app.use(cors())

// routes

app.use("/api" ,incomeRoute)



const server = () => {
    db();
    app.listen(PORT , ()=>{
        console.log('====================================');
        console.log(`Listening to the port ${PORT}`);
        console.log('====================================');
    }) 
}

server()