import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {

    const  {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);


    const logoutHandler=async()=>{
        setLoading(true)
        try {

            console.log("hellooo");
             await axios.get(`${server}/users/logout`,
            {
                 withCredentials:true,
        });
    
        toast.success("logout successfully");
        setIsAuthenticated(false);
        setLoading(false)
    //    { return <Navigate to={"/login"}/> }
       } catch (error) {
            toast.error("unable to logout");
           console.log(error);
           setIsAuthenticated(true);
           setLoading(false);
        }
        
    };

    
    console.log(isAuthenticated);

  return (
      <nav className='header'>
        <div>
            <h2>Todo App.</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {
                isAuthenticated?(<button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>):
                (<Link to={"/login"}>Login</Link>)
            }
            
            
        </article>
      </nav>
  )
}

export default Header