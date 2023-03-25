import { useMutation, UseMutationResult, useQuery, useQueryClient } from "react-query";
import { makeURL } from "../../constants/constants";

const postKeys = {
  posts: "posts",
  list: (...args: any[]) => [postKeys.posts, ...args]
};

const URL = makeURL("posts");
const getPostsList = async () => {
  const list = await fetch(URL);
  return await list.json();
};

interface IPostBody {
  body: string;
  caption: string;
  user: string;
}

const createPost = async (data: IPostBody) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  return response;
};

const deletePost = async (id: string) => {
  const response = await fetch(URL + "/" + id, { method: "DELETE" });
  return response;
};

export const useGetPosts = () => {
  return useQuery(postKeys.list(), getPostsList, {
    retry: 0,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false
  });
};

export const useCreatePost = (): UseMutationResult<any, any, IPostBody> => {
  const queryClient = useQueryClient();
  return useMutation(data => createPost(data), {
    onSuccess: () => queryClient.invalidateQueries(postKeys.list())
  });
};

export const useDeletePost = (id: string, config = {}): UseMutationResult<any> => {
  const queryClient = useQueryClient();
  return useMutation(() => deletePost(id), {
    ...config,
    onSuccess: () => queryClient.invalidateQueries(postKeys.list())
  });
};
