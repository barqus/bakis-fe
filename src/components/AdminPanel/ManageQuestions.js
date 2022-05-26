import React, { useState, useEffect } from 'react'
import QuestionModal from './Questions/Modal'
import QuestionTable from './Questions/Table'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetRequest } from '../../utils/HandleRequest'

const ManageQuestions = () => {
    const [showForm, setShowForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [questions, setQuestions] = useState([])
    const [editingQuestion, setEditingQuestion] = useState(false)
    const [loading, setLoading] = useState(true)
    const notifySuccess = () => toast.success("Success!");

    useEffect(() => {
        const fetchQuestions = async () => {
            var results = await GetRequest("/questions")
            if (results.message != null) {
                setQuestions([])
                setLoading(false)
            } else {
                setQuestions(results.data)
                setLoading(false)
            }
        };
        fetchQuestions()
    }, [])

    return (
        <div className="text-lg">
            {!loading &&
                <>
                    <button onClick={() => { setShowForm(true); setIsEditing(false) }}
                        className="flex bg-transparent hover:bg-green-400 text-green-400 font-semibold hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded" >
                        Pridėti klausimą
                    </button>
                    {showForm ? <QuestionModal setShowForm={setShowForm} setQuestions={setQuestions}
                        questions={questions} notifySuccess={notifySuccess} isEditing={isEditing} editingQuestion={editingQuestion} /> : ""}

                    <QuestionTable questions={questions} setQuestions={setQuestions}
                        setShowForm={setShowForm} setIsEditing={setIsEditing} setEditingQuestion={setEditingQuestion} />
                </>
            }
            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default ManageQuestions