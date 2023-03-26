import { DEFAULT_QUERY_CONFIG, getToken } from "./../../constants/constants";
import { useMutation, UseMutationResult, useQuery } from "react-query";
import { makeURL } from "../../constants/constants";
import { showAlert } from "../../utils/apiUtils";

const URL = makeURL("users/");

interface ILoginRequest {
  email: string;
  password: string;
}

const loginUser = async (data: ILoginRequest) => {
  const response = await fetch(`${URL}login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then(data => data.json());
  return response;
};

const createUser = async (data: ILoginRequest) => {
  const response = await fetch(`${URL}register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then(data => data.json());
  return response;
};

const getUserDetails = async () => {
  const response = await fetch(`${URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(getToken() || "")
    }
  });
  return response.json();
};

export const useLogin = (
  config = {}
): UseMutationResult<any, any, ILoginRequest> => {
  return useMutation<any, any, ILoginRequest>(data => loginUser(data), {
    ...config,
    onSuccess: data => {
      if (data?.message) return showAlert(data.message);
      localStorage.setItem("token", JSON.stringify(data.token));
      window.location.href = "/";
    },
    onError: err => showAlert(err.message)
  });
};

export const useSignUp = (
  config = {}
): UseMutationResult<any, any, ILoginRequest> => {
  return useMutation<any, any, ILoginRequest>(data => createUser(data), {
    ...config,
    onSuccess: data => {
      if (data?.message) return showAlert(data.message);
      localStorage.setItem("token", JSON.stringify(data.token));
      window.location.href = "/";
    },
    onError: err => showAlert(err.message)
  });
};

export const useGetMe = (config = {}) => {
  return useQuery([`${URL}/me`], getUserDetails, {
    ...DEFAULT_QUERY_CONFIG,
    ...config
  });
};
