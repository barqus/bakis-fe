import axios from "axios";

const server = "https://fillq-backend.azurewebsites.net"
// const server = "http://localhost:9000"
export const UpdateRequest = async (url, body, token) => {
  var headers = { headers: {} }
  if (token) {
    headers = { headers: { "Authorization": `Bearer ${token}` } }
  }

  return axios
    .put(server + url, body, headers)
    .then((response) => {
      return response
    }).catch(error => {
      if (error.response.status === 403) {
        localStorage.removeItem('token');
        window.location.replace("/");
      }
      return error.response
    });
}

export const PostRequest = async (url, body, token) => {
  var headers = { headers: {} }
  if (token) {
    headers = { headers: { "Authorization": `Bearer ${token}` } }
  }

  return axios
    .post(server + url, body, headers)
    .then((response) => {
      return response
    }).catch(error => {
      if (error.response.status === 403) {
        localStorage.removeItem('token');
        window.location.replace("/");
      }
      return error.response
    });
}

export const GetRequest = async (url, token) => {
  var headers = { headers: {} }
  if (token) {
    headers = { headers: { "Authorization": `Bearer ${token}` } }
  }
  const response = axios
    .get(server + url, headers)
    .then((response) => {
      return response
    }).catch(error => {
      if (error.response.status === 403) {
        localStorage.removeItem('token');
        window.location.replace("/");
      }
      return error
    });
    
  return response
}

export const DeleteRequest = async (url, token) => {
  var headers = { headers: {} }
  if (token) {
    headers = { headers: { "Authorization": `Bearer ${token}` } }
  }

  return axios
    .delete(server + url, headers)
    .then((response) => {
      return response
    }).catch(error => {
      if (error.response.status === 403) {
        localStorage.removeItem('token');
        window.location.replace("/");
      }
      return error.response
    });
}
