import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

function Login() {
  const {axios,setToken}=useAppContext()
  const [email, setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handlesubmit= async (e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post('api/login',{email,password})
      if(data.success){
        setToken(data.token)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization']=data.token

      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-white">
      <div className="w-full max-w-md border border-indigo-200 rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.15)] px-6 sm:px-8 py-10">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900">
          <span className="text-indigo-600">Admin</span> Login
        </h1>

        <p className="text-center text-gray-700 text-sm sm:text-base mt-2 leading-6">
          Enter your credentials to access the admin
          <br className="hidden sm:block" />
          panel
        </p>

        <form  on onSubmit={handlesubmit} className="mt-10">
          <div>
            <label className="block text-gray-600 text-sm sm:text-base mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              required
              onChange={e=> setEmail(e.target.value)} value={email}
              className="w-full border-b-2 border-gray-300 px-2 py-2.5 outline-none text-gray-700 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="mt-7">
            <label className="block text-gray-600 text-sm sm:text-base mb-2">
              Password
            </label>

            <input
              type="password"
              onChange={e=> setPassword(e.target.value)} value={password}
              placeholder="••••••••••"
              required
              className="w-full border-b-2 border-gray-300 px-2 py-2.5 outline-none text-gray-700 focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md mt-7 cursor-pointer transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;