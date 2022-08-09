import React from 'react'
import {useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import {useSelector , useDispatch } from 'react-redux'; 
import {register , reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

// Password and Password2 matching side
import {toast} from 'react-toastify'; 

function Register() {

  const navigate = useNavigate();
  const [formData , setFormData] = useState({
      name : '',
      email : '',
      password : '',
      password2 : '',
  })
  const {name, email, password, password2} = formData; 

  const dispatch = useDispatch(); 

  const {user , isLoading , isSuccess , isError, message } = useSelector(state => state.auth ); 

  useEffect(() => {
      if(isError){
          toast.error(message);
      }
      // Redirect when loged in 

      if(isSuccess || user ){
          navigate('/');
      }

      dispatch(reset() );
  },[isSuccess ,isError , user , message , navigate , dispatch  ])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
      e.preventDefault();
      if(password !== password2) {
          toast.error('Passwords do not match');
      }else{
          const userData = {
              name,
              email,
              password
          }

          dispatch(register(userData));
      }
  }

  if(isLoading) {
      return <Spinner/>
  }
  
  return (
    <>
       <section className="heading">
           <h1>
               <FaUser/> Register
           </h1>
           <p> Please create an account </p>
       </section>

       <section className="form">
           <form onSubmit={onSubmit} >
                <div className="form-group">
                     <input 
                     type="text" 
                     className="form-control" 
                     name='name' 
                     id="name" 
                     placeholder="Enter Your Name" 
                     value={name} 
                     onChange={onChange}>
                     </input>
                </div>
                <div className="form-group">
                     <input 
                     type="email" 
                     className="form-control" 
                     name='email' 
                     id="email" 
                     placeholder="Enter Your Email" 
                     value={email} 
                     onChange={onChange}>
                     </input>
                </div>
                <div className="form-group">
                     <input 
                     type="password" 
                     className="form-control" 
                     name='password' 
                     id="password" 
                     placeholder="Enter Password" 
                     value={password} 
                     onChange={onChange}>
                     </input>
                </div>
                <div className="form-group">
                     <input 
                     type="password" 
                     className="form-control" 
                     name='password2' 
                     id="password2" 
                     placeholder="Confirm Password" 
                     value={password2} 
                     onChange={onChange}>
                     </input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit
                    </button>
                </div>
           </form>
       </section>

    </>
  )
}

export default Register