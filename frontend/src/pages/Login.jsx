import React from 'react'
import {useState , useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import {useSelector , useDispatch } from 'react-redux'; 
import {login , reset } from '../features/auth/authSlice'
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'


function Login() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const {user , isLoading , isSuccess , isError, message } = useSelector(state => state.auth);  
  

//   if(use)
  const [formData , setFormData] = useState({
      name : '',
      email : '',
      password : '',
      password2 : '',
  })

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
      e.preventDefault(); 

      const userData = {
          email,
          password
      }

      dispatch(login(userData));
  }
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

  if(isLoading) {
      return <Spinner/>
  }

  const { email, password} = formData; 
  return (
    <>
       <section className="heading">
           <h1>
               <FaSignInAlt/> Login
           </h1>
           <p> Please Login to get Support</p>
       </section>

       <section className="form">
           <form onSubmit={onSubmit} >
                
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
                    <button type="submit" className="btn btn-block">Submit
                    </button>
                </div>
           </form>
       </section>

    </>
  )
}

export default Login