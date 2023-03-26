import React, { useState } from "react";
import PostDetails from "../../components/PostDetails";
import { useCreatePost } from "../../hooks/queries/Posts";

const initState = {
  body: "",
  caption: ""
};
const CreatePost = () => {
  const [postData, setPostData] = useState(initState);

  const { mutate: createPost, data } = useCreatePost();
  const handleChange = e => {
    const { id, value } = e.target;
    setPostData({ ...postData, [id]: value });
  };

  console.log(data);
  return (
    <>
      {" "}
      <form
        onSubmit={e => {
          e.preventDefault();
          createPost(postData);
          setPostData(initState);
        }}
        className='w-full flex flex-col gap-2 mt-4 py-4 justify-center items-center bg-white'
      >
        <input
          type='text'
          placeholder='caption'
          id='caption'
          className='outline-none border border-black px-4 py-2 rounded-lg w-[50vw]'
          value={postData.caption}
          onChange={handleChange}
          required
        />
        <textarea
          id='body'
          cols='60'
          rows='5'
          className='outline-none border border-black p-4 rounded-lg w-[50vw]'
          value={postData.body}
          onChange={handleChange}
          required
        />
        <button className='px-6 py-2 text-white bg-gray-600 rounded-lg'>
          post
        </button>
      </form>
      {/* {data && <PostDetails data={data} />} */}
    </>
  );
};

export default CreatePost;
