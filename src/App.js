import './App.css';
import NavBar from './components/NavBar';
import Dropdown from './components/Dropdown';
import Footer from './components/Footer';
import Home from './pages/index.js';
import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Background from './components/assets/background.png';
import Register from './pages/Register';
import Login from './pages/Login';
import useToken from './components/useToken';
import UserContext from './components/UserContext';
import { GetRequest } from './utils/HandleRequest'
import Pickems from './pages/Pickems';
import Participants from './pages/Participants';
import Admin from './pages/Admin';
import History from './pages/History';
import NotFound from './pages/NotFound';
import Rules from './pages/Rules';
import Sponsors from './pages/Sponsors';
import TwitchRedirect from './pages/TwitchRedirect';
import ResetPassword from './pages/ResetPassword';
import ActivateRedirect from './pages/ActivateRedirect';
import PasswordRedirect from './pages/PasswordRedirect';
import Timeline from './pages/Timeline';

function App() {
  const { token, setToken, getRole } = useToken();
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userObject, setUserObject] = useState({ id: "", username: "", email: "" })
  const [participants, setParticipants] = useState([])

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)
      }
    }
    const fetchUsersData = async () => {
      try {
        var results = await GetRequest("/users/", token)
        setUserObject(results.data)
      } catch {
        // clearToken()
        window.location.reload(false);
      }
    };

    const fetchParticipants = async () => {
      var results = await GetRequest("/participants")
      if (results.message != null) {
        setParticipants([])
      } else {
        setParticipants(results.data.participants)
      }
    };

    window.addEventListener('resize', hideMenu)
    if (token !== null) {
      fetchUsersData()
    }

    fetchParticipants()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadingDone = () => {
    setLoading(false)
  }

  return (
    <div className="main_div">
      <img src={Background} className="image_background" alt="backgroud" onLoad={() => loadingDone()} />
      {!loading ?
        <UserContext.Provider value={userObject}>
          <div className="" >
            <NavBar toggle={toggle} />
            <Layout>
              <Dropdown isOpen={isOpen} />
              <div className="w-full flow-root justify-center">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="participants" element={<Participants participants={participants} />} />
                  <Route path="history" element={<History />} />
                  <Route path="signup" element={<Register />} />
                  <Route path="information" element={<Rules />} />
                  <Route path="sponsors" element={<Sponsors />} />
                  <Route path="timeline" element={<Timeline/>} />

                  <Route path="account/activate" element={<ActivateRedirect />} />
                  <Route path="twitchRedirect" element={<TwitchRedirect setToken={setToken} />} />
                  <Route path="login" element={<Login setToken={setToken} />} />
                  <Route path="password/request" element={<PasswordRedirect />} />
                  <Route path="password/reset" element={<ResetPassword />} />
                  <Route path="" element={<NotFound />} />
                  {getRole() === "admin" && <Route path="admin" element={<Admin participants={participants} setParticipants={setParticipants} />} />}

                  {token && <Route path="pickems" element={<Pickems participants={participants} />} />}
                  <Route path="*" element={<NotFound />} />
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
