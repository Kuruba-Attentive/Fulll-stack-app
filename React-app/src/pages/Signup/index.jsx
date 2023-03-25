import React, { useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleSignUp = e => {
    e.preventDefault();
  };

  const handleChangeUserData = e => {
    const { id, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <form action='' onSubmit={handleSignUp}>
      <div className='w-full h-full justify-center flex flex-col items-center gap-4 mt-16'>
        <input
          value={userData.email}
          type='email'
          id='email'
          className='w-[30vw] rounded-lg p-4 border border-black outline-none'
          placeholder='Email'
          onChange={handleChangeUserData}
        />
        <input
          value={userData.password}
          type='password'
          id='password'
          className='w-[30vw] rounded-lg p-4 border border-black outline-none'
          placeholder='Password'
          onChange={handleChangeUserData}
        />
        <button className='px-12 py-4 rounded-lg text-white bg-gray-600 '>Login</button>
      </div>
    </form>
  );
};

export default SignUp;
