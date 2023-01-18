const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://Shubh165:Shubh165!@chartcluster.srx78.mongodb.net/?retryWrites=true&w=majority ");

        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch(err){
        console.log(`Error : ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;