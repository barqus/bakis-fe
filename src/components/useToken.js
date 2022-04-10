import { useState } from 'react';
import jwt_decode from 'jwt-decode';
export default function useToken() {
  const clearToken = () => {
    localStorage.removeItem('token');
  };


  const getToken = () => {
    try {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        return null
      }
      const userToken = JSON.parse(tokenString);

      let decodedToken = jwt_decode(tokenString);

      let currentDate = new Date();
      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return null
      } else {

        return userToken
      }
    } catch (err) {
      clearToken()
      return null
    }

  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const getRole = () => {
    try {
      let decodedToken = jwt_decode(token);
      return decodedToken.role;
    } catch {
      return null
    }
  }

  const getUserID = () => {
    try {
      let decodedToken = jwt_decode(token);
      return decodedToken.user_id;
    } catch {
      return null
    }
  }

  return {
    clearToken,
    setToken: saveToken,
    token,
    getRole,
    getUserID,
  }
}