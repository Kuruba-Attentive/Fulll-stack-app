import React, { useState } from "react";
import PostDetails from "../../components/PostDetails";
import { useCreatePost, useGetPosts } from "../../hooks/queries/Posts";

const initState = {
  body: "",
  caption: ""
};
const ListOfPosts = () => {
  const { data, isLoading, isFetching } = useGetPosts();
  const [postData, setPostData] = useState(initState);
  const { mutate: createPost } = useCreatePost();
  const handleChange = e => {
    const { id, value } = e.target;
    setPostData({ ...postData, [id]: value });
  };
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          createPost(postData);
          setPostData(initState);
        }}
        className='w-full flex flex-col gap-2 mt-4 py-4 justify-center items-center sticky top-14 bg-white'
      >
        <input
          type='text'
          placeholder='caption'
          id='caption'
          className='outline-none border border-black px-4 py-2 rounded-lg w-[40vw]'
          value={postData.caption}
          onChange={handleChange}
          required
        />
        <textarea
          id='body'
          cols='60'
          rows='3'
          className='outline-none border border-black p-4 rounded-lg w-[40vw]'
          value={postData.body}
          onChange={handleChange}
          required
        />
        <button className='px-6 py-2 text-white bg-gray-600 rounded-lg'>post</button>
      </form>
      {(isLoading || isFetching) && <div className='w-full flex justify-center my-4'>Loading...</div>}
      <div className='flex flex-col gap-4 items-center w-full mt-4'>
        {data?.map(post => (
          <PostDetails post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default ListOfPosts;
