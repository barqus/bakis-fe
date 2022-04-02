import React, { useState } from 'react'
import ManageParticipant from '../components/AdminPanel/ManageParticipant'
import ManageQuestions from '../components/AdminPanel/ManageQuestions'
import ManageSettings from '../components/AdminPanel/ManageSettings'

const Admin = ({ participants, setParticipants }) => {
  const [showManageParticipants, setShowManageParticipants] = useState(false)
  const [showManageQuestions, setShowManageQuestions] = useState(false)
  const [showManageSettings, setShowManageSettings] = useState(false)

  return (
    <div className="mt-12 text-center text-white text-3xl font-bold font-sans">
      <div className="bg-gray-900 bg-opacity-80 bg-transparent mt-6 rounded-xl pb-7">
        <div className=" bg-transparent pt-4 rounded-lg mr-6 ml-4">
          ADMIN PANEL
          <hr className="mb-7 mt-4" />
          <div className="mt-2 my-2 text-xl flex justify-between">
            <button onClick={() => { 
              setShowManageParticipants(!showManageParticipants); 
              setShowManageQuestions(false);
              setShowManageSettings(false);
             }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Manage Participants
            </button>
            <button onClick={() => { 
              setShowManageQuestions(!showManageQuestions); 
              setShowManageParticipants(false);
              setShowManageSettings(false);
            }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Manage Questions
            </button>
            <button onClick={() => { 
              setShowManageQuestions(false); 
              setShowManageParticipants(false);
              setShowManageSettings(!showManageSettings);
            }}
              className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
              Manage Settings
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin