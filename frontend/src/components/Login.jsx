import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
const Login = () => {

  const navigate= useNavigate();
  const {setAuthUser}=useAuth(JSON.parse(localStorage.getItem('chatapp'))|| null);
  const [userInput ,setUserInput] = useState({});
  const[loading,setloading]=useState(false);

  const handleInput = (e) => {
    setUserInput({
        ...userInput,[e.target.id]:e.target.value
    })
    }
    console.log(userInput)


  const handleSubmit = async(e) => {
    e.preventDefault();
    setloading(true);
    try{
       
        const login=await axios.post('/api/auth/login',userInput)
        const data=login.data;
        if(data.success===false){
            setloading(false)
            
            console.log('Login attempt with:', data.message);
          
        }
        toast.success(data.message)
        localStorage.setItem('chatapp',JSON.stringify(data))
       setAuthUser(data)
        setloading(false)
       navigate('/')
        }

    catch(error)
    {
        setloading(false);
console.log(error)
console.log(error?.response?.data?.message)
const message = error?.response?.data?.message || "Login failed. Try again.";
toast.error(message)
    }
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-300">
      <div className=" p-8 min-h-80 w-full max-w-md rounded-lg bg-slate-200 border-zinc-200 border-b-2 border-t-2 border-r-2 border-l-2 shadow-slate-100-lg">
        <div className="text-lg">
          <h1 className="font-semibold text-center text-2xl mb-6">Login</h1>
          <form 
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2" htmlFor="email">
                Email:
              </label>
              <input 
                className="w-full text-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="email" 
                id="email"
                name="email"
                 placeholder='Enter your email'
                value={userInput.email}
                onChange={handleInput}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block font-bold text-gray-700 mb-2" htmlFor="password">
                Password:
              </label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="password" 
                id="password"
                name="password"
               
                value={userInput.password}
                onChange={handleInput}
                required
              />
            </div>
            
            <button 
              className="bg-black text-white
               py-2 px-4 rounded-lg
                hover:bg-gray-800
                  transition duration-300 mx-auto w-40"
              type="submit"
            >
              {loading? "loading..":"Login"}
            </button>
            <div>
                <h6 className='text-sm text-center mt-2'>Don't you have an account ? 

            <Link to={"/register"}>
           <span className='text-cyan-900'> Register Now</span>
           </Link>
                    
                </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login