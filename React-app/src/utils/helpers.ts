export const logoutUser = (redirect?: string) => {
  localStorage.removeItem("token");
  if (redirect) window.location.href = redirect;
  window.location.reload();
};

/**
 * It takes a URL and an object of key/value pairs and returns a URL with the key/value pairs added as
 * query parameters
 * @param {string} url - string - The URL to add the query parameters to.
 * @param params - {
 * @returns A function that takes a url and params and returns a url with the params added to it.
 */
export const addQueryParamsToURL = (url: string, params = {}) => {
  return (url +=
    "?" +
    Object.keys(params)
      .map(key => key + "=" + encodeURIComponent(params[key]))
      .join("&"));
};

export const getFirstName = (name: string) => name.split(" ")[0];
