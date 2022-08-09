const express = require('express')
const router = express.Router();
const {getTickets , createTicket, getTicket , deleteTicket , updateTicket } = require('../controllers/ticketController')

router.get('/' , getTickets);

router.post('/' , createTicket);

router.get('/:id' , getTicket);

router.post('/:id' , deleteTicket);

router.put('/:id' , updateTicket);

module.exports = router;