import React from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { FaTwitch } from 'react-icons/fa';
import { ImExit } from 'react-icons/im'
import { useEffect, useState, createContext, useContext } from "react";
import { useLocation } from 'react-router-dom'
import Logo from './assets/fillq_logo_final.svg';
import useToken from './useToken';
import UserContext from './UserContext';
import { GetRequest } from '../utils/HandleRequest'

const NavBar = ({ toggle, userID, setUserID }) => {
    const [userInfo, setUserInfo] = useState({})
    const location = useLocation();
    const { token, setToken, clearToken } = useToken();
    const user = useContext(UserContext);


    const Logout = async () => {
        clearToken()
        window.location.reload(false);
    }


    return (
        <nav className="flex justify-between items-center h-16
                        filter drop-shadow-lg 
                        bg-gradient-to-r from-green-400 to-blue-500
                        relative shadow-sm text-white font-sans font-bold text-lg border-b-2 border-purple-900"
            style={{
                background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.7) 100%)"
            }}>
            <div></div>
            <div className="pr-8 md:block hidden">
                <NavLink to="/tournaments" className="p-4 hover:text-purple-400"><span className={location.pathname === "/tournaments" ? " text-purple-500" : ""}>Tournaments</span></NavLink>
                <NavLink to="/profile" className="p-4 hover:text-purple-400"><span className={location.pathname === "/profile" ? " text-purple-500" : ""}>My Profile</span></NavLink>
                {/* {user.username}
                My Profile */}
                <button onClick={() => Logout()} className="bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
                    <div className="text-lg">
                        <div>
                            Logout <ImExit className="inline ml-2" />
                        </div>
                    </div>
                </button>

                {/* <NavLink to="/signup" className="mx-2 bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded">Sign Up</NavLink>
                <NavLink to="/login" className="mx-2 bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded">Login</NavLink>
                 */}


                {/* <button onClick={() => onRegistration()} className="mx-2 bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
                    <div className="text-lg">
                        Sign Up
                    </div>
                </button>


                <button onClick={() => onLogin()} className="bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
                    <div className="text-lg">
                        Login
                    </div>
                </button> */}

                {/* <button onClick={() => accountAction()} className="bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
                    <div className="text-lg">
                        {userID === null ? <>PRISIJUNGTI <FaTwitch className="inline" /></> :
                            <div>
                                {userInfo.display_name} <ImExit className="inline ml-2" />
                            </div>}
                    </div>
                </button> */}
            </div>
        </nav>
    )
}

export default NavBar