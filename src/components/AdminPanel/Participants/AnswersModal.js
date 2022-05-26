import React, { useEffect, useState } from 'react'
import useKeypress from '../../UseKeypress'
import { useRef } from 'react';
import useOutsideAlerter from '../../UseOutsideAlerter';
import { AiOutlineClose } from 'react-icons/ai'
import ParticipantForm from './Form';
import { GetRequest } from '../../../utils/HandleRequest'
import AnswersForm from './AnswersForm';

const AnswersModal = ({ setShowForm, setParticipants, participants, notifySuccess, isEditing, editingParticipant,participantID }) => {
  const [questions, setQuestions] = useState([])
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowForm);
  useKeypress('Escape', () => {
    setShowForm(false)
  });

  useEffect(() => {

    const fetchQuestions = async () => {
      var results = await GetRequest("/questions").catch((err) => setQuestions([]))
      if (results == null || results.message != null) {
        setQuestions([])
        // setLoading(false)
      } else {
        setQuestions(results.data)
        // setLoading(false)
      }
    };

    fetchQuestions()


  }, [])



  return (
    <div
      className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      style={{ background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.7) 100%)" }} >
      <div className="relative my-12 mx-auto max-w-8xl w-max min-w-max">
        <div className="border-2 border-opacity-20 rounded-lg shadow-lg relative flex flex-col bg-gray-900 outline-none focus:outline-none" ref={wrapperRef}>
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-gradient-to-r from-purple-800 to-green-500 ">
            <h3 className="text-3xl font-semibold text-white">
              {isEditing ? "EDIT" : "ADD"} ANSWERS
            </h3>
            <div className=" cursor-pointer p-1 ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
              <AiOutlineClose onClick={() => setShowForm(false)} />
            </div>
          </div>
          <div className="flex justify-center">
            <AnswersForm questions={questions} participantID={participantID} setShowForm={setShowForm} notifySuccess={notifySuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswersModal