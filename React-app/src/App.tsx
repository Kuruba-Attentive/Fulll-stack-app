import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useGetMe } from "./hooks/queries/Auth";
import Login from "./pages/Login";
import ListOfPosts from "./pages/PostsList";
import SignUp from "./pages/Signup";

const App = () => {
  const { data } = useGetMe();
  return (
    <>
      <nav className='h-14 bg-gray-600 text-white flex justify-between items-center fixed top-0 w-full z-10 '>
        <div className='ml-20'>Know about me...!</div>
        <div className='mr-20 flex justify-center items-center'>
          {data?.email ? (
            <div className='rounded-[50%] flex justify-center items-center h-12 w-12 bg-white text-gray-600 text-2xl font-bold'>
              {data.email?.at(0)}
            </div>
          ) : (
            <button>
              <Link to='/login'>Login</Link>
            </button>
          )}
        </div>
      </nav>
      <div className='mt-14'>
        <Routes>
          <Route path='/' element={<ListOfPosts />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/posts' element={<ListOfPosts />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
