import axios from "axios";
import useToken from "../components/useToken";

const server = "http://localhost:9000"

export function PostRequest(url, body, token) {
  var response
  response = axios
    .post(server + url, body, { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      return response.data
    }).catch(error => {
      return null
    });
  return response
}

export const GetRequest = async (url, token) => {
  // const { token } = useToken();
  // console.log("TOKEN", token)
  const response = axios
    .get(server + url, { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      console.log("response", response)
      return response.data
    }).catch(error => {
      return error
    });

  return response
}
