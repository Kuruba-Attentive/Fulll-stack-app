import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useCreateComment, useGetComments } from "../hooks/queries/Comments";
import { useDeletePost } from "../hooks/queries/Posts";
import Comment from "./Comment";

const PostDetails = ({ post: { _id, body, caption } }: any) => {
  const { data } = useGetComments(_id, {
    enabled: !!_id
  });
  const [comment, setComment] = useState("");
  const { mutate: createComment } = useCreateComment();
  const { mutate: deletePost } = useDeletePost(_id);

  const handleChange = e => {
    setComment(e.target.value);
  };
  return (
    <div div className='bg-gray-50 rounded-lg shadow-sm w-[50%] p-4'>
      <p className='text-lg font-bold flex justify-between'>
        <div>{caption}</div>
        <button
          className='text-2xl'
          onClick={() => {
            deletePost(_id);
          }}
        >
          <AiFillDelete />
        </button>
      </p>
      <p className=''>{body}</p>
      <div className='font-bold my-4'>Comments</div>
      <input
        type='text'
        placeholder='comment...'
        value={comment}
        onChange={handleChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            createComment({ comment: comment, post: _id });
            setComment("");
          }
        }}
        className='border border-black outline-none p-2 bg-inherit rounded-lg w-full'
      />
      <div className=''>{data && data.map(comment => <Comment comment={comment} post={_id} />)}</div>
    </div>
  );
};

export default PostDetails;
