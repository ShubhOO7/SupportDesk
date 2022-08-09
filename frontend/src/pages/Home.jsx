import React from 'react'
import {Link} from 'react-router-dom'
import { FaQuestionCircle , FaTicketAlt  } from 'react-icons/fa';

function home() {
  return (
    <>
       <section className="heading">
            <h1 >What do you need to help with ?</h1>
            <p>  Please Choose from an option below.</p>
       </section>
       <Link to="/new-ticket" className="btn btn-reverse btn-block">            <FaQuestionCircle/> Register a new complaint
        </Link>
        <Link to="/tickets" className="btn btn-block">            
        <FaTicketAlt/> View Complaints
        </Link>
    </>
  )
}

export default home