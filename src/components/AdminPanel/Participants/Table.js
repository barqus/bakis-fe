import React, { useState } from 'react'
import { format } from "date-fns";
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import useToken from '../../useToken'
import { DeleteRequest } from '../../../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnswersModal from './AnswersModal';

const ParticipantTable = ({ participants, setParticipants, setShowForm, setIsEditing, setEditingParticipant }) => {
    const notifyError = (errMsg = "Couldn't delete participant") => toast.error(errMsg);
    const notifySuccess = () => toast.success("Successfully deleted participant");
    const notifyQuestionsSuccess = () => toast.success("Success!");
    const { token } = useToken();
    const [showAnswersModal, setShowAnswersModal] = useState(false)
    const [participantID, setParticipantID] = useState(-1)

    const onDelete = async (participantID) => {
        await DeleteRequest("/participants/" + participantID, token)
            .then((response) => {
                if (response == null) {
                    notifyError()
                } else if (response.status !== 204) {
                    notifyError(response.data.message)
                }
                else {
                    notifySuccess()
                    participants = participants.filter(function (obj) {
                        return obj.id !== participantID;
                    });
                    setParticipants(participants)
                }
            })
    }

    return (
        <div className="mt-6 shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg"
            style={{
                background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
            }}>
            <table className="divide-y divide-purple-500 text-white">
                <thead className="font-bold bg-gradient-to-r from-purple-800 to-green-500 ">
                    <tr >
                        <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider">
                            Surname
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base uppercase tracking-wider">
                            Nickname
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base uppercase tracking-wider">
                            Summoner Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-base uppercase tracking-wider">
                            Twitch Channel
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-base uppercase tracking-wider">
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-base uppercase tracking-wider">
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-base uppercase tracking-wider">
                        </th>
                    </tr>
                </thead>
                <tbody style={{
                    background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
                }} className="bg-white bg-opacity-10   text-base font-semibold divide-y divide-purple-500">
                    {participants.map((item) => (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                {item.surname}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                {item.nickname}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                {item.summoner_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                {item.twitch_channel}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                <AiOutlineEdit onClick={() => { setShowForm(true); setIsEditing(true); setEditingParticipant(item) }} className=" text-2xl text-yellow-600 cursor-pointer inline" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                <AiOutlineDelete onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDelete(item.id) }} className="text-2xl text-red-600 cursor-pointer inline" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                <button onClick={() => {setShowAnswersModal(true); setParticipantID(item.id)}}
                                    className="flex bg-transparent hover:bg-green-400 text-green-400 font-semibold hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded" >
                                    Answer Questions
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            {showAnswersModal && <AnswersModal setShowForm={setShowAnswersModal} participantID={participantID} notifySuccess={notifyQuestionsSuccess}/>}
        </div>
    )
}

export default ParticipantTable