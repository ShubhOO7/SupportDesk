import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <>
    <Router>
        <div className="container">
        <Header/>
            <Routes>
                <Route path="/" element = {<Home/>} />
                <Route path="/login" element = {<Login/>} /> <Route path="/register" element = {<Register />} />
                <Route path="/new-ticket" element = {<PrivateRoute/>} >
                    <Route path="/new-ticket" element={<NewTicket/>} />
                   
                </Route>
                <Route path="/tickets" element = {<PrivateRoute/>} >
                    <Route path="/tickets" element={<Tickets />} /> 
                </Route>
                
            </Routes>
        </div>
    </Router>
    <ToastContainer/> 
    </>
  );
}

export default App;
