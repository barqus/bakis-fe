import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetRequest } from '../utils/HandleRequest'

const server = "https://fillq-backend-test.azurewebsites.net"

const ActivateRedirect = ({ setToken }) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchActivate = async () => {
            try {
                const twitchCode = new URLSearchParams(location.search).get("code")
                await GetRequest("/auth/confirm/" + twitchCode)
                // setToken(results.data.token);
                window.location.replace("/");
            } catch {
              // clearToken()
              window.location.replace("/");
            }
          };

          fetchActivate()
    }, []);

    return (
        <div className="grid justify-center mb-12  mt-12 text-center text-white text-3xl font-bold font-sans">
            Prašome palaukti...
        </div>
    )
}

export default ActivateRedirect