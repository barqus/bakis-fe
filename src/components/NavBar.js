import React from 'react'
import { NavLink } from 'react-router-dom'
import { ImExit } from 'react-icons/im'
import { useContext } from "react";
import { useLocation,useNavigate } from 'react-router-dom'
import useToken from './useToken';
import UserContext from './UserContext';
import Logo from './assets/fillq_logo_final.svg';

const NavBar = ({ toggle, userID, setUserID }) => {
    let navigate = useNavigate();


    const location = useLocation();
    const { token, clearToken, getRole } = useToken();
    const user = useContext(UserContext);

    const Logout = async () => {
        clearToken()
        navigate("/");
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
            <div className="flex items-center">
                <NavLink to="/" className="p-4">
                    <img src={Logo} width="75" alt="fillq logo" />
                </NavLink>
                {getRole() === "admin" &&
                    <NavLink to="/admin" className="p-4 hover:text-purple-400">
                        <span className={location.pathname === "/admin" ? " text-purple-500" : ""}>
                            Administratoriaus skydelis
                        </span>
                    </NavLink>
                }

            </div>

            <div className="pr-8 md:block hidden">
                <NavLink to="/history" className="p-4 hover:text-purple-400"><span className={location.pathname === "/history" ? " text-purple-500" : ""}>Žaidimų istorija</span></NavLink>
                <NavLink to="/participants" className="p-4 hover:text-purple-400"><span className={location.pathname === "/participants" ? " text-purple-500" : ""}>Dalyviai</span></NavLink>
                <NavLink to="/information" className="p-4 hover:text-purple-400"><span className={location.pathname === "/information" ? " text-purple-500" : ""}>Informacija</span></NavLink>
                <NavLink to="/sponsors" className="p-4 hover:text-purple-400"><span className={location.pathname === "/sponsors" ? " text-purple-500" : ""}>Rėmėjai</span></NavLink>
                {token ?
                    <>
                        <NavLink to="/pickems" className="p-4 hover:text-purple-400"><span className={location.pathname === "/pickems" ? " text-purple-500" : ""}>Pickems</span></NavLink>
                        {/* <NavLink to="/profile" className="p-4 hover:text-purple-400"><span className={location.pathname === "/profile" ? " text-purple-500" : ""}>My Profile</span></NavLink> */}
                        <button onClick={() => Logout()} className="bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
                            <div className="text-lg">
                                <div>
                                    Atsijungti <ImExit className="inline ml-2" />
                                </div>
                            </div>
                        </button>
                    </> :
                    <>
                        {/* <NavLink to="/signup" className="mx-2 bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded">Registruotis</NavLink> */}
                        <NavLink to="/login" className="mx-2 bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded">Prisijungti</NavLink>
                    </>
                }
            </div>
        </nav>
    )
}

export default NavBar