import { useMutation, UseMutationResult, useQuery, useQueryClient } from "react-query";
import { makeURL } from "../../constants/constants";

export const commentKeys = {
  comments: ["comments"],
  list: (...args: any[]) => [...commentKeys.comments, ...args]
};

const URL = makeURL("comments");

const getComments = async (postId: string) => {
  const response = await fetch(`${URL}/?post=${postId}`);
  return response.json();
};

interface ICreateCommentBody {
  comment: string;
  post: string;
}

interface ICommentDetailResponse extends ICreateCommentBody {
  _id: string;
}

const makeComment = async (body: ICreateCommentBody) => {
  const res: ICommentDetailResponse = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json" }
  }).then(res => res.json());
  return res;
};

const deleteComment = async (id: string) => {
  const response = await fetch(URL + "/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });
  return response;
};

export const useGetComments = (postId: string, config = {}) => {
  return useQuery(commentKeys.list(postId), () => getComments(postId), {
    retry: 0,
    ...config,
    refetchOnWindowFocus: false,
    refetchOnReconnect: "always"
  });
};

export const useCreateComment = (): UseMutationResult<any, any, ICreateCommentBody> => {
  const queryClient = useQueryClient();
  return useMutation<any, any, ICreateCommentBody>(data => makeComment(data), {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries(commentKeys.list(data?.post), {
        refetchInactive: true,
        exact: false
      });
    }
  });
};

export const useDeleteComment = (commentId:string, config = {}): UseMutationResult<any, any, ICommentDetailResponse> => {
  return useMutation<any, any, ICommentDetailResponse>(() => deleteComment(commentId), {
    ...config
  });
};
