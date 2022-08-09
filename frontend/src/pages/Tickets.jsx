import { useEffect , useState } from 'react'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Tickets() {
const [data, setData] = useState();

useEffect(() => {
    axios.get('/api/tickets/')
   .then(response => {
    setData(response.data)
   })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}, [])


//   console.log(data);

  return (
      data ? 
    <>
      <BackButton url='/' />
      <h1>Complaints</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Department</div>
          <div>Status</div>
          <div>Description</div>
          <div></div>
        </div>
        {data.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>:
    <>
        <Spinner/>
    </>
  )
}

export default Tickets