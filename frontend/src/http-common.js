import axios from "axios";
const APIUrl = `${import.meta.env.VITE_APP_API_URL}`


export default axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-type": "application/json",
   
  }
});
