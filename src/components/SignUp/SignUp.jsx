import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";




const AwesomeToast = ({ message, icon }) => (
  <div className='animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-4 rounded-lg shadow-lg border-2 border-amber-300/20'>
    <span className='text-2xl mr-3 text-[#20180E]'>{icon}</span>
    <span className='font-semibold text-[#201B0E]'>{message}</span>
  </div>
 );

  export  const SignUp = () => {
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData ,setFormData] =useState({username : ' ' , email: '' , password: ''})

  const navigate = useNavigate();

  // for toast
useEffect(() => {
if (showToast) {
    const timer = setTimeout(() => {
        setShowToast(false);
        navigate('/login')

    } , 2000);

    return() => clearTimeout(timer);



}



}, [showToast , navigate])

const handleChange = (e) => 
  setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Sign Up Data:', formData);
  setShowToast(true);
};


  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#1a120b] p-4'>
      {showToast && <AwesomeToast message="Sign Up Successful" icon={<FaCheckCircle />} />}
      
      <div className='w-full max-w-md bg-gradient-to-br from-[#20180E] to-[#483728] p-8 rounded-xl shadow-lg border-4 border-amber-700/30 transform transition-all duration-300 hover:shadow-2xl'>
       <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform'>
  Create Account
</h1>

<form onSubmit={handleSubmit} className='space-y-4'>
<input
  type="text"
  name="username"
  placeholder="UserName"
  value={formData.username}
  onChange={handleChange}
  className="w-full px-4 py-3 rounded-lg bg-[#201805] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]"
  required
/>



   <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  className="w-full px-4 py-3 rounded-lg bg-[#201B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]"
  required
/>

<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-lg bg-[#20180E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]"
    required
  />


<button className='absolute inset-y-0 right-4 flex items-center text-amber-400 hover:text-amber-600  transition-all transform hover: scale-125 type' type='button' onClick={toggleShowPassword}>
    {showPassword ? <FaEyeSlash /> : <FaEye />}


</button>
  



</div>


<button
  type='submit'
  className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#201B0E] font-bold rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg'
>
  Sign Up
</button>



</form>

    <div className='mt-6 text-center'>
  <Link
  to='/login'
  className='group inline-flex items-center text-amber-400 hover:text-amber-600 transition-all duration-300'
>
  <FaArrowLeft
    className='mr-2 transform -translate-x-2 opacity-70 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300'
  />
  <span className='transform group-hover:-translate-x-2 transition-all duration-300'>
    Back To Login
  </span>
</Link>

</div>  







      </div>
    </div>
  );
};


