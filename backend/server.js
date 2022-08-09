//Backend Framework Express is used inside Nodejs
const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config({ path: "../.env" })
const PORT = process.env.PORT || 3000;
const {errorHandler} = require('./Middleware/errorMiddleware')
const connectDB = require('./config/db')

const app = express();

// Previously we user Body Parser library to destruct the object data but not express handle itself
app.use(express.json());
app.use(express.urlencoded({extendend : false}));


//Connection to Database
connectDB();




//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production'){
    // Set build folder as statics
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*' , (req, res) => res.sendFile(__dirname , '../' , 'frontend' , 'build' , 'index.html'))
}else{
    app.get('/', (req, res) =>{
        res.status(200).json({message : "Welcome to support Desk DB"});
    })
}

// Error handlers routes
app.use(errorHandler);


app.listen(PORT , ()=> console.log(`Server started listening on ${PORT}`));


