import React from "react";

const Login = () => {
  return (
    <div className='w-full h-full justify-center flex flex-col items-center gap-4 mt-16'>
      <input type='text' className='w-[30vw] rounded-lg p-4 border border-black outline-none' placeholder='Email' />
      <input type='text' className='w-[30vw] rounded-lg p-4 border border-black outline-none' placeholder='Password' />
      <button className="px-12 py-4 rounded-lg text-white bg-gray-600 ">Login</button>
    </div>
  );
};

export default Login;
