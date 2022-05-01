import React, { useState } from 'react'
import ManageParticipant from '../components/AdminPanel/ManageParticipant'
import ManageQuestions from '../components/AdminPanel/ManageQuestions'
import ManageSettings from '../components/AdminPanel/ManageSettings'
import ManageUsers from '../components/AdminPanel/ManageUsers'

const Admin = ({ participants, setParticipants }) => {
  const [showManageParticipants, setShowManageParticipants] = useState(false)
  const [showManageQuestions, setShowManageQuestions] = useState(false)
  const [showManageSettings, setShowManageSettings] = useState(false)
  const [showManageUsers, setShowManageUsers] = useState(false)

  return (
    <div className="mt-12 text-center text-white text-3xl font-bold font-sans">
      <div className="bg-gray-900 bg-opacity-80 bg-transparent mt-6 rounded-xl pb-7">
        <div className=" bg-transparent pt-4 rounded-lg mr-6 ml-4">
          ADMINISTRATORIAUS SKYDELIS
          <hr className="mb-7 mt-4" />
          <div className="mt-2 my-2 text-xl flex justify-between">
            <button onClick={() => { 
              setShowManageParticipants(!showManageParticipants); 
              setShowManageQuestions(false);
              setShowManageSettings(false);
              setShowManageUsers(false);
             }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Valdyti dalyvius
            </button>
            <button onClick={() => { 
              setShowManageQuestions(!showManageQuestions); 
              setShowManageParticipants(false);
              setShowManageSettings(false);
              setShowManageUsers(false);
            }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Valdyti klausimus
            </button>
            <button onClick={() => { 
              setShowManageQuestions(false); 
              setShowManageParticipants(false);
              setShowManageSettings(!showManageSettings);
              setShowManageUsers(false);
            }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Valdyti nustatymus
            </button>
            <button onClick={() => { 
              setShowManageQuestions(false); 
              setShowManageParticipants(false);
              setShowManageSettings(false);
              setShowManageUsers(!showManageUsers);
            }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Valdyti naudotojus
            </button>
            {/* <button
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Manage Settings
            </button> */}
          </div>

          <div className="mt-6 flex justify-center">
            {showManageParticipants && <ManageParticipant participants={participants} setParticipants={setParticipants} />}
            {showManageQuestions && <ManageQuestions />}
            {showManageSettings && <ManageSettings />}
            {showManageUsers && <ManageUsers />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin