import React, { useState } from 'react'
import ParticipantModal from './Participants/Modal'
import ParticipantTable from './Participants/Table'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageParticipant = ({ participants, setParticipants }) => {
    const [showForm, setShowForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingParticipant, setEditingParticipant] = useState(false)

    const notifySuccess = () => toast.success("Pavyko!");

    return (
        <div className="text-lg">
            <button onClick={() => { setShowForm(true); setIsEditing(false) }}
                className="flex bg-transparent hover:bg-green-400 text-green-400 font-semibold hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded" >
                Pridėti dalyvį
            </button>
            {showForm ? <ParticipantModal setShowForm={setShowForm} setParticipants={setParticipants}
                participants={participants} notifySuccess={notifySuccess} isEditing={isEditing} editingParticipant={editingParticipant} /> : ""}
            <ParticipantTable participants={participants} setParticipants={setParticipants}
                setShowForm={setShowForm} setIsEditing={setIsEditing} setEditingParticipant={setEditingParticipant}/>
            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default ManageParticipant