export const URL = "http://localhost:5050/";

export const makeURL = (url: string) => URL + url;

export const DEFAULT_QUERY_CONFIG = {
  staleTime: 1800000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: false,
  retry: 0
};

export const getToken = () => localStorage.getItem("token") || "";
