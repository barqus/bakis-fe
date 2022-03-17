import './App.css';
import NavBar from './components/NavBar';
import Dropdown from './components/Dropdown';
import Footer from './components/Footer';
import Home from './pages/index.js';
import Participants from './pages/Participants';
import React, { useState, useEffect, useContext, createContext } from "react";
// import {Route} from "react-router-dom"
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TwitchRedirect from './pages/TwitchRedirect';
import Pickems from './pages/Pickems';
import Highlights from './pages/Highlights';
import Sponsors from './pages/SponsorPage.js';
import Background from './components/assets/background.png';
import fetchDataCall from './components/utils/fetchApi'
import Spinner from './components/utils/Spinner';
import Rules from './pages/RulesAndPrizes';
import Register from './pages/Register';
import Login from './pages/Login';
import Tournaments from './pages/Tournaments';
import useToken from './components/useToken';
import { useLocation } from 'react-router-dom'
import UserContext from './components/UserContext';
import { GetRequest } from './utils/HandleRequest'
import MyProfile from './pages/MyProfile';

function App({ hideLoader }) {
  const { token, setToken, clearToken } = useToken();
  const [isOpen, setIsOpen] = useState(false)
  const [userID, setUserID] = useState(null)
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [userObject, setUserObject] = useState({id: "", username: "", email: ""})

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)
      }
    }

    const fetchData = async () => {
      try {
        var results =  await GetRequest("/users/",token)
        setUserObject(results.data)
      } catch {
        clearToken()
        window.location.reload(false);
      }
    };

    window.addEventListener('resize', hideMenu)
    
    if (token !== null) {
      fetchData()
    }
  }, [])
  const location = useLocation();
  if (!token) {
    if (location.pathname === "/register") {
      return <Register setToken={setToken} />
    } else {
      return <Login setToken={setToken} />
    }
  }
  const loadingDone = () => {
    hideLoader()
    setLoading(false)

  }

  //  {/* <div className=" bg-cover bg-no-repeat bg-center bg-fixed" style={{ backgroundImage: `url(${Background})` }} > */}
  return (
    <div className="main_div">
      <img src={Background} className="image_background" alt="backgroud" onLoad={() => loadingDone()} />
      {!loading ?
        <UserContext.Provider value={userObject}>
          <div className="" >
            <NavBar toggle={toggle} userID={userID} setUserID={setUserID} />
            <Layout>
              <Dropdown isOpen={isOpen} toggle={toggle} userID={userID} setUserID={setUserID} />
              <div>
                <Routes>
                  <Route exact path="/" element={<Home participants={participants} />} />
                  <Route path="/dalyviai" element={<Participants participants={participants} />} />
                  <Route path="/pickems" element={<Pickems participants={participants} />} />
                  {/* <Route path="/video" element={<Highlights />} /> */}
                  <Route path="/taisykles" element={<Rules />} />
                  <Route path="/remejai" element={<Sponsors />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/tournaments" element={<Tournaments />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/login" element={<Login setToken={setToken} />} />
                  <Route path="/twitchRedirect" element={<TwitchRedirect userID={userID} setUserID={setUserID} />} />
                </Routes>
              </div>
            </Layout>
            <Footer />
          </div>
        </UserContext.Provider>
        : null
      }

    </div>

  );
}

export default App;
