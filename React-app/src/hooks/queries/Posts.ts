import { useMutation, UseMutationResult, useQuery, useQueryClient } from "react-query";
import { getToken, makeURL } from "../../constants/constants";
import { showAlert } from "../../utils/apiUtils";

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
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${JSON.parse(getToken())}` }
  });
  return response.json();
};

const deletePost = async (id: string) => {
  const response = await fetch(URL + "/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${JSON.parse(getToken())}` }
  });
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
    onSuccess: () => {
      queryClient.invalidateQueries(postKeys.list());
    },
    onError: e => {
      console.log(e);
      showAlert("Failed to create post");
    }
  });
};

export const useDeletePost = (id: string, config = {}): UseMutationResult<any> => {
  const queryClient = useQueryClient();
  return useMutation(() => deletePost(id), {
    ...config,
    onSuccess: () => queryClient.invalidateQueries(postKeys.list())
  });
};
