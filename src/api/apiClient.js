import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://shiva39.pythonanywhere.com/api",
});

export default apiClient;
