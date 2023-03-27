import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useGetMe } from "../hooks/queries/Auth";
import { useCreateComment, useGetComments } from "../hooks/queries/Comments";
import { useDeletePost } from "../hooks/queries/Posts";
import { getFirstName } from "../utils/helpers";
import Comment from "./Comment";

const PostDetails = ({ post }: any) => {
  const { _id, body, caption, user: postOwner } = post || {};
  const { data } = useGetComments(_id, {
    enabled: !!_id
  });
  const [comment, setComment] = useState("");
  const { mutate: createComment } = useCreateComment();
  const { mutate: deletePost } = useDeletePost(_id);
  const { data: user } = useGetMe();

  const handleChange = e => {
    setComment(e.target.value);
  };
  return (
    <div className='bg-gray-50 rounded-lg shadow-sm w-[50%] p-4'>
      <div className='text-lg font-bold flex justify-between'>
        <div>
          <span>Author : {getFirstName(postOwner?.name)}</span>
          <br />
          <span className='mt-2'>{caption}</span>
        </div>
        {user?._id === postOwner?._id && (
          <button
            className='text-2xl'
            onClick={() => {
              deletePost(_id);
            }}
          >
            <AiFillDelete />
          </button>
        )}
      </div>
      <p className=''>{body}</p>
      <p className='font-bold my-4'>Comments</p>
      <input
        type='text'
        placeholder='comment...'
        value={comment}
        onChange={handleChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            createComment({ comment: comment, post: _id, user: user?._id });
            setComment("");
          }
        }}
        className='border border-black outline-none p-2 bg-inherit rounded-lg w-full'
      />
      <div className=''>
        {data?.map(comment => (
          <Comment
            key={comment?._id}
            comment={comment}
            post={_id}
            isMyPost={user?._id === postOwner?._id}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
