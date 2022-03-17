import React, { useState, useEffect } from 'react';
import TournamentModal from '../components/Tournament/TournamentModal'
import TournamentTable from '../components/Tournament/TournamentTable';
import { GetRequest } from '../utils/HandleRequest'
import useToken from '../components/useToken';
import { ToastContainer, toast } from 'react-toastify';

const Tournaments = () => {
  const [showForm, setShowForm] = useState(false)
  const { token } = useToken();
  const [tournaments, setTournaments] = useState([])
  const notifySuccess = () => toast.success("Tournament created");

  const getTournaments = async () => {
    const tournamentsFromRequest = await GetRequest("/tournaments/", token)
    console.log("tournamentsFromRequest", tournamentsFromRequest)
    if (tournamentsFromRequest == null) {
      setTournaments([])
    } else {
      setTournaments(tournamentsFromRequest.data)
    }
  };

  useEffect(() => {
    getTournaments()
  }, [])

  return (
    <>
      <div className="flex justify-center flex-col">
        <button className="mt-3 w-64 text-white p-2 rounded-md text bg-purple-500" onClick={() => setShowForm(true)} >Create Tournament</button>
        {showForm ? <TournamentModal setShowForm={setShowForm} setTournaments={setTournaments} tournaments={tournaments} notifySuccess={notifySuccess} /> : ""}
        <TournamentTable tournaments={tournaments} />
        <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
      </div>
    </>
  )
}

export default Tournaments