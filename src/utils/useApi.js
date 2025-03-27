import { useCallback } from "react";
import axios from "axios";
const baseUrl = "locahost:5000";
// const baseUrl = "https://contractor-crm-backend.vercel.app/api";

const useApi = () => {
  /**
   * Function to make an API request
   * @param {string} url - The API endpoint.
   * @param {object} options - Axios request options (method, headers, data, etc.).
   * @param {function} callBack
   * @returns {Promise<{ data: any, error: any }>}
   */
  const fetchData = useCallback(async (url, options = {}, callBack) => {
    let response = null;
    let error = null;
    try {
      const res = await axios({
        url: baseUrl + url,
        ...options,
        withCredentials: true,
        headers: {
          ...options?.headers,
          credentials: "include",
        },
      });
      callBack(response, true);
    } catch (err) {
      callBack(err.response, false);
      if (err.response?.data.message === "unauthenticated") {
      } else if (err.response?.data.message) {
        toast.error(err.response?.data.message);
      }
    }

    return { response, error };
  }, []);

  return { fetchData };
};

export default useApi;
