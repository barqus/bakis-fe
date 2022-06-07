import React, { useState } from 'react'
import { format } from "date-fns";
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import useToken from '../../useToken'
import { DeleteRequest } from '../../../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionTable = ({ questions, setQuestions, setShowForm, setIsEditing, setEditingQuestion }) => {
    const notifyError = (errMsg = "Nepavyko ištrinti klausimo") => toast.error(errMsg);
    const notifySuccess = () => toast.success("Klausimas sėkmingai ištrintas");
    const { token } = useToken();
    const onDelete = async (questionID) => {
        await DeleteRequest("/questions/" + questionID, token)
            .then((response) => {
                if (response == null) {
                    notifyError()
                } else if (response.status !== 204) {
                    notifyError(response.data.message)
                }
                else {
                    notifySuccess()
                    questions = questions.filter(function (obj) {
                        return obj.id !== questionID;
                    });
                    setQuestions(questions)
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
                            Klausimas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider"></th>
                        <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody style={{
                    background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
                }} className="bg-white bg-opacity-10   text-base font-semibold divide-y divide-purple-500">
                    {questions.map((item) => (

                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                {item.question}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                <AiOutlineEdit onClick={() => { setShowForm(true); setIsEditing(true); setEditingQuestion(item) }} className=" text-2xl text-yellow-600 cursor-pointer inline" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                <AiOutlineDelete onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDelete(item.id) }} className="text-2xl text-red-600 cursor-pointer inline" />
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuestionTable