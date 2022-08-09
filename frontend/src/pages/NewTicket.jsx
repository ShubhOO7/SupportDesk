import { useState } from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'


function NewTicket() {
    const { user } = useSelector((state) => state.auth)

    // const API_URL = 'http://localhost:3000/api/tickets/'

  const name = (user.name)
  const email = (user.email)
  const [product, setProduct] = useState('Hostel')
  const [description, setDescription] = useState('')
  const [ok , setOk] = useState(true);

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const ticketData = {

        product: product,
        description: description,
    }
    fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(ticketData),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    // .then(data => console.log(data)); 

    navigate('/tickets')
  }
  const onChange = (e) => {
    setDescription(e.target.value) 
    description.length > 25 ? setOk(false) : setOk(true);
    description.length < 200 ? setOk(false) : setOk(true);
    description.length > 180 ? toast.error("Register Complaint with 350 words") : console.log();;
  }

  

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Raise a Complaint</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        
    <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' className='form-control' value={name} name='name' disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
          <div className='form-group'>
            <label htmlFor='product'>Area of Concern</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='College'>College</option>
              <option value='Hostel'>Hostel</option>
              <option value='Mess'>Mess</option>
              <option value='Feilds'>Feilds</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block' 
            disabled = {ok}>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket