import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:42009",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosClient.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_ACCESS_KEY);
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem(TOKEN_LOCAL_STORAGE_ACCESS_KEY);
//       localStorage.removeItem(USER_LOCAL_STORAGE_ACCESS_KEY);
//       window.location.href = "/login?token-expired";
//       return;
//     }

//     throw error;
//   }
// );

export { axiosClient };
