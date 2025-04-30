import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
const Register = () => {
    const {setAuthUser}=useAuth()
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fullname: '',
    email: '',
    gender: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInputData({
      ...inputData,
      [id]: value
    });
  };
  

  const selectGender=()=>{
    setInputData((prev)=>({
 ...prev ,gender:selectGender===inputData.gender?'':selectGender
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', inputData);
      const data = response.data;

      if (data.success === false) {
        setLoading(false);
        console.log('Register attempt with:', data.message);
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      localStorage.setItem('chatapp', JSON.stringify(data));
     setAuthUser(data)
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.log(error);
      const message = error?.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className= "bg-slate-200 border-zinc-800 p-8 min-h-80 w-full max-w-md rounded-lg shadow-lg">
        <h1 className="font-semibold text-center text-2xl mb-6">Register with Echo</h1>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2" htmlFor="fullname">
              Full name:
            </label>
            <input
              className="w-full text-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="fullname"
              placeholder="Enter your fullname"
              value={inputData.fullname}
              onChange={handleInput}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full text-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={inputData.email}
              onChange={handleInput}
              required
            />
          </div>



          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full text-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={inputData.username}
              onChange={handleInput}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-bold text-gray-700 mb-2" htmlFor="password">
              Create Password:
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Minimum length 8 characters"
              value={inputData.password}
              onChange={handleInput}
              required
            />
          </div>

          <div className="mb-4">
  <label className="block font-bold text-gray-700 mb-2">Gender:</label>
  <div className="flex gap-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="gender"
        id="gender"
        value="male"
        checked={inputData.gender === 'male'}
        onChange={handleInput}
        className="mr-2"
      />
      Male
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="gender"
        id="gender"
        value="female"
        checked={inputData.gender === 'female'}
        onChange={handleInput}
        className="mr-2"
      />
      Female
    </label>
  </div>
</div>


          <button
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 mx-auto w-40"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div>
                          <h6 className='text-sm text-center mt-2'>Already have an account ? 
          
                      <Link to={"/login"}>
                     <span className='text-cyan-900'> Login Now</span>
                     </Link>
                              
                          </h6>
                      </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
