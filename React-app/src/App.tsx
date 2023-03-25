import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ListOfPosts from "./pages/PostsList";

const App = () => {
  return (
    <>
      <nav className='h-14 bg-gray-600 text-white flex justify-center items-center fixed top-0 w-full z-10 '>
        <div>Know about me...!</div>
      </nav>
      <div className='mt-14'>
        <Routes>
          <Route path='/' element={<ListOfPosts />} />
          <Route  path='/login' element={<Login />} />
          <Route path='/posts' element={<ListOfPosts />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
