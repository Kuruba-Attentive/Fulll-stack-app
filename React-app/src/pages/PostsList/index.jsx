import React, { useState } from "react";
import PostDetails from "../../components/PostDetails";
import { useGetMe } from "../../hooks/queries/Auth";
import { useGetPosts } from "../../hooks/queries/Posts";

const ListOfPosts = () => {
  const [myPosts, setMyPosts] = useState(false);
  const { data: user } = useGetMe();
  const { data, isLoading, isFetching } = useGetPosts({
    ...(myPosts && { user: user._id })
  });

  const togglePosts = () => setMyPosts(prev => !prev);

  return (
    <>
      <div className='my-2 flex gap-8 justify-center'>
        {user?._id && (
          <>
            <button
              onClick={togglePosts}
              className='px-8 py-2'
              style={{ borderBottom: myPosts ? "1px solid black" : "" }}
            >
              My posts
            </button>
            <button
              onClick={togglePosts}
              className='px-8 py-2'
              style={{ borderBottom: !myPosts ? "1px solid black" : "" }}
            >
              All Posts
            </button>
          </>
        )}
      </div>
      {(isLoading || isFetching) && (
        <div className='w-full flex justify-center my-4'>Loading...</div>
      )}
      <div className='flex flex-col gap-4 items-center w-full mt-4'>
        {data?.map(post => (
          <PostDetails post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default ListOfPosts;
