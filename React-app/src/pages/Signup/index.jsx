import React, { useState } from "react";
import { useSignUp } from "../../hooks/queries/Auth";

const SignUp = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    Confirmpassword: "",
    name: ""
  });
  const { mutate: createUser } = useSignUp();
  const handleSignUp = e => {
    e.preventDefault();
    if (userData.password !== userData.Confirmpassword)
      return alert("Passwords not matched");
    createUser({
      email: userData.email,
      password: userData.password,
      name: userData.name
    });
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
          value={userData.name}
          type='text'
          id='name'
          className='w-[30vw] rounded-lg p-4 border border-black outline-none'
          placeholder='Full Name'
          onChange={handleChangeUserData}
        />
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
        <input
          value={userData.Confirmpassword}
          type='password'
          id='Confirmpassword'
          className='w-[30vw] rounded-lg p-4 border border-black outline-none'
          placeholder='Confirm password'
          onChange={handleChangeUserData}
        />
        <button className='px-12 py-4 rounded-lg text-white bg-gray-600 '>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
