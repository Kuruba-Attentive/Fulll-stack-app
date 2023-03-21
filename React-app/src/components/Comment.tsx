import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useQueryClient } from "react-query";
import { commentKeys, useDeleteComment } from "../hooks/queries/Comments";

const Comment = ({ comment, post }: any) => {
  const { mutateAsync } = useDeleteComment(comment._id);
  const queryClient = useQueryClient();
  return (
    <div className='flex gap-4'>
      <div className='bg-white my-2 p-2 rounded-lg w-full  '>{comment?.comment}</div>
      <button
        className='text-2xl'
        onClick={() => {
          mutateAsync(comment._id).then(() => queryClient.invalidateQueries(commentKeys.list(post)));
        }}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};

export default Comment;
