import React, { useState } from "react";
import { useLogin } from "../../hooks/queries/Auth";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { mutate: loginUser } = useLogin();
  const handleLogin = e => {
    e.preventDefault();
    loginUser(userData);
  };

  const handleChangeUserData = e => {
    const { id, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <form action='' onSubmit={handleLogin}>
      <div className='w-full h-full justify-center flex flex-col items-center gap-4 mt-16'>
        <input
          value={userData.email}
          onChange={handleChangeUserData}
          type='email'
          id='email'
          className='w-[30vw] rounded-lg p-4 border border-black outline-none'
          placeholder='Email'
        />
        <input
          value={userData.password}
          onChange={handleChangeUserData}
          type='password'
          id='password'
          className='w-[30vw] rounded-lg p-4 border border-black outline-none'
          placeholder='Password'
        />
        <button className='px-12 py-4 rounded-lg text-white bg-gray-600 '>Login</button>
      </div>
    </form>
  );
};

export default Login;
