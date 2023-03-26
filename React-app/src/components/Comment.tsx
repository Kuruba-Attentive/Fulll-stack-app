import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useQueryClient } from "react-query";
import { useGetMe } from "../hooks/queries/Auth";
import { commentKeys, useDeleteComment } from "../hooks/queries/Comments";

const Comment = ({ comment, post, isMyPost }: any) => {
  const { mutateAsync } = useDeleteComment(comment._id);
  const queryClient = useQueryClient();
  const { data: user } = useGetMe();

  return (
    <div className='flex gap-2 items-center'>
      <div className='whitespace-nowrap'>{comment?.user?.name} :</div>
      <div className='bg-white my-2 p-2 rounded-lg w-full  '>
        {comment?.comment}
      </div>
      {(comment?.user?._id === user?._id || isMyPost) && (
        <button
          className='text-xl'
          onClick={() => {
            mutateAsync(comment._id).then(() =>
              queryClient.invalidateQueries(commentKeys.list(post))
            );
          }}
        >
          <AiOutlineDelete />
        </button>
      )}
    </div>
  );
};

export default Comment;
