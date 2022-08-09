const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    product: {
        type : String,
        require : [true , "Please select from Complaints" ],
        enum : ['College' , 'Hostel' , 'Field' , 'Mess']
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
