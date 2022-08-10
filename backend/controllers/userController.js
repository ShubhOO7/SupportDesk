const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel')




// asyncHandler = Handling only expection inside of async express route  ---- alternative of try and catch
// try and catch because mongoose returns promise 
const registerUser = asyncHandler( async (req , res) =>{
    // console.log(req.body)
    const {name, email , password} = req.body

    // Validation of data coming from client
    if(!name || !email || !password ){
        // return res.status(404).json({message : "Invalid username or password or email"})

        // console.log(name);
        // console.log(email);
        // console.log(password);
        // Now using ErrorHandler
        res.status(400);
        throw new Error("Please Include all Fields ");
    }

    // Find if user is already exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    // Hashing Password and bycrpting it 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt); 

    // Create new User 
     const user = await User.create({
         name,
         email,
         password : hashedPassword
     })

     if(user){
         res.status(201).json({
             _id : user._id,
             name : user.name,
             email : user.email, 
             token : generateToken(user._id)
         })
     }else{
         res.status(400);
         throw new Error("Invalid User Data ");
     }

})


const loginUser = asyncHandler( async (req , res) =>{
    const { email , password} = req.body

    // Validation of data coming from client
    if( !email || !password ){
        // return res.status(404).json({message : "Invalid email or password "})

        // console.log(email);
        // console.log(password);
        // Now using ErrorHandler
        res.status(400);
        throw new Error("Please Include all Fields ");
    }


    const user  = await User.findOne({email});
    // Check User and password match 
    if(user && (await bcrypt.compare(password, user.password)) ){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("Invalid Email Or Password ");
    }

})


// Generate Json web token

const generateToken = (id) => {
    return jwt.sign({id } , process.env.JWT_SECRET  , {
        expiresIn: '30d'
    })
}


module.exports ={
    registerUser,
    loginUser,
}



