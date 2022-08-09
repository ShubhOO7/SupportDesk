const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel'); 


// Getting all tickets
const getTickets = asyncHandler( async (req , res) =>{

    const tickets = await Ticket.find()

    res.status(200).json(tickets);
})

//Creating a single ticket
const getTicket = asyncHandler(async (req, res) => {
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (!ticket) {
      res.status(404)
      throw new Error('Complaint not found')
    }
  
    res.status(200).json(ticket)
})


// Create a new ticket
const createTicket = asyncHandler( async (req , res) =>{

    const {product , description} = req.body

    if(!product || !description  ){
        res.status(401);
        throw new Error('Please add a product and description');
    }
    

     const ticket = await Ticket.create({
         product,
         description,
         status : 'new' 
     })

    res.status(201).json(ticket);
})


//Delete a single ticket
const deleteTicket = asyncHandler(async (req, res) => {
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (!ticket) {
      res.status(404)
      throw new Error('Complaint not found')
    }

    await Ticket.remove();

    res.status(200).json({success: true})
})

//Updata a single ticket
const updateTicket = asyncHandler(async (req, res) => {
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (!ticket) {
      res.status(404)
      throw new Error('Ticket not found')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body , {new : true})

    res.status(200).json(updatedTicket)
})


module.exports = {
    getTickets , 
    getTicket , 
    createTicket,
    deleteTicket,
    updateTicket
}
