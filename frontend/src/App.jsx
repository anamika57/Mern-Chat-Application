import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './Home/Home';
import { VerifyUser } from './utils/VerifyUser';
import './index.css';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>


        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<VerifyUser/>} >

        <Route path="/" element={<Home/>} />
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
