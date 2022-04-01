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

    return ( 
        <div className={isOpen ? 'grid grid-rows-6 text-center items-center bg  text-white font-sans font-bold text-lg' : 'hidden'}  onClick={toggle}
        style={{background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 1) 100%)"}}>
            {/* TODO: FIX THIS (MOBILIE) */}
            <NavLink to="/dalyviai" className={location.pathname === "/dalyviai" ? " text-purple-500 hover m-8"  : " hover:text-purple-400"}>DALYVIAI</NavLink>
            {/* <NavLink to="/video" className="p-4 hover:text-purple-400"><span className={location.pathname === "/video" ? " text-purple-500" : ""}>HIGHLIGHTS</span></NavLink> */}
            <NavLink to="/pickems" className={location.pathname === "/pickems" ? " text-purple-500 m-8"  : " hover:text-purple-400"}>PICK'EM</NavLink>
            <NavLink to="/taisykles" className={location.pathname === "/taisykles" ? " text-purple-500  m-8"  : "hover:text-purple-400"}>TAISYKLĖS</NavLink>
            <NavLink to="/remejai" className={location.pathname === "/remejai" ? " text-purple-500 m-8"  : " hover:text-purple-400"}>RĖMĖJAI</NavLink>

        </div>
    )
}

export default Dropdown
