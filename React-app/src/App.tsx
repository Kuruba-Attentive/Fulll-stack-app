import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useGetMe } from "./hooks/queries/Auth";
import ListOfPosts from "./pages/PostsList";
import { logoutUser } from "./utils/helpers";

const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const CreatePost = React.lazy(() => import("./pages/CreatePost"));
const App = () => {
  const { data } = useGetMe();
  return (
    <>
      <nav className='h-14 bg-gray-600 text-white flex justify-between items-center fixed top-0 w-full z-10 '>
        <div className='ml-20 font-bold font-sans text-xl'>
          <Link to='/'> Know about me...!</Link>
        </div>
        <div className='mr-20 flex justify-center items-center'>
          {data?.name ? (
            <>
              <div
                title={data?.name}
                className='rounded-[50%] relative h-12 w-12 bg-white text-gray-600 text-2xl font-bold flex justify-center items-center'
              >
                <div className='mt-[-.25rem]'>{data.name?.at(0)}</div>
              </div>
              <button
                className='ml-4 bg-black text-white px-4 py-2 rounded-lg'
                onClick={logoutUser}
              >
                Logout
              </button>
            </>
          ) : (
            <button className='ml-4 bg-black text-white px-4 py-2 rounded-lg'>
              <Link to='/login'>Login</Link>
            </button>
          )}
        </div>
      </nav>
      <div className='mt-14'>
        <React.Suspense
          fallback={
            <div className='w-[100vw] h-[100vh] grid place-items-center text-2xl font-extrabold'>
              Loading ...
            </div>
          }
        >
          <Routes>
            <Route path='/' element={<ListOfPosts />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </React.Suspense>
      </div>
    </>
  );
};

export default App;
