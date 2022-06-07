import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GetRequest } from '../utils/HandleRequest'


const TwitchRedirect = ({ setToken }) => {
    const location = useLocation();
    useEffect(() => {
        const fetchTwitchLogin = async () => {
            try {
                const twitchCode = new URLSearchParams(location.search).get("code")
                var results = await GetRequest("/auth/twitch/" + twitchCode)
                console.log("RES", results)
                setToken(results.data.token);
                window.location.replace("/");
            } catch {
              // clearToken()
              window.location.replace("/");
            }
          };


          fetchTwitchLogin()
        // axios.get(apiEndpoint, {withCredentials: true })
        //     .then(res => {
        //         const twitchUserID = res.data;
        //         localStorage.setItem('twitchCode', twitchUserID);
        //         setUserID(twitchUserID)
        //         navigate("/")
        //     })
        //     .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="grid justify-center mb-12  mt-12 text-center text-white text-3xl font-bold font-sans">
            Prašome palaukti...
        </div>
    )
}

export default TwitchRedirect