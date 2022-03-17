import React from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { FaTwitch } from 'react-icons/fa';
import { ImExit } from 'react-icons/im'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

const Dropdown = ({isOpen, toggle, userID, setUserID}) => {
    const [userInfo, setUserInfo] = useState({})
    const location = useLocation();
    const endPoint = "http://localhost:8080/api/v1/user/"
    useEffect(() => {
        if(userID !== null) {
            const apiEndpoint = endPoint + userID
            axios.get(apiEndpoint)
                .then(res => {
                    setUserInfo(res.data)
                })
                .catch(
                    () => {
                        console.log("HERRE")
                        setUserID(null)
                    }
                )
        }
    }, [])

    const accountAction = () => {
        if (userID === null) {
            const REACT_APP_TWITCH_CLIENT_ID="by7zl6rwazu7ks1z6sby63bnwq1267"
            const REACT_APP_TWITCH_REDIRECT_URI = "https://www.fillq.lt/twitchRedirect"
            var twitchLoginURI = `https://id.twitch.tv/oauth2/authorize?client_id=${REACT_APP_TWITCH_CLIENT_ID}&response_type=code&scope=user:read:email&redirect_uri=${REACT_APP_TWITCH_REDIRECT_URI}`
            window.location.href = twitchLoginURI
        }
        else {
            localStorage.removeItem("twitchCode")
            setUserID(null)
        }
    }
    return ( 
        <div className={isOpen ? 'grid grid-rows-6 text-center items-center bg  text-white font-sans font-bold text-lg' : 'hidden'}  onClick={toggle}
        style={{background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 1) 100%)"}}>
            <NavLink to="/dalyviai" className={location.pathname === "/dalyviai" ? " text-purple-500 hover m-8"  : " hover:text-purple-400"}>DALYVIAI</NavLink>
            {/* <NavLink to="/video" className="p-4 hover:text-purple-400"><span className={location.pathname === "/video" ? " text-purple-500" : ""}>HIGHLIGHTS</span></NavLink> */}
            <NavLink to="/pickems" className={location.pathname === "/pickems" ? " text-purple-500 m-8"  : " hover:text-purple-400"}>PICK'EM</NavLink>
            <NavLink to="/taisykles" className={location.pathname === "/taisykles" ? " text-purple-500  m-8"  : "hover:text-purple-400"}>TAISYKLĖS</NavLink>
            <NavLink to="/remejai" className={location.pathname === "/remejai" ? " text-purple-500 m-8"  : " hover:text-purple-400"}>RĖMĖJAI</NavLink>
            <button onClick={() => accountAction()} className="bg-transparent hover:bg-purple-400 m-8 text-purple-400 font-semibold hover:text-white  border border-purple-400 hover:border-transparent rounded" >
                <div className="text-lg">
                    {userID === null ? <>PRISIJUNGTI <FaTwitch className="inline"/></> : 
                    <div>
                        {/* <img src={userInfo.profile_image_url} className="object-contain w-6 inline rounded-lg border border-purple-400 mr-6" alt="user avatar"></img>  */}
                        {userInfo.display_name} <ImExit className="inline ml-2"/>
                    </div>}
                </div> 
            </button>
        </div>
    )
}

export default Dropdown
