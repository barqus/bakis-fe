import React, { useState, useEffect } from 'react'
import { PostRequest, UpdateRequest } from '../../../utils/HandleRequest'
import useToken from '../../useToken'
import { ToastContainer, toast } from 'react-toastify';
import { GetRequest } from '../../../utils/HandleRequest'

const AnswersForm = ({ questions, participantID, notifySuccess, setShowForm }) => {
    const notifyError = (errMsg = "Couldn't add answer to question") => toast.error(errMsg);

    const [answers, setAnswers] = useState([]);
    const [answersToSubmit, setAnswersToSubmit] = useState([]);
    const { token } = useToken();
    useEffect(() => {

    const fetchAnswers= async () => {
        var results = await GetRequest("/answers/"+participantID).catch((err) => setAnswers([]))
        if (results == null || results.message != null) {
          setAnswers([])
          // setLoading(false)
        } else {
          setAnswers(results.data)
          // setLoading(false)
        }
      };    
      fetchAnswers()
    
      }, [])

    const submitAnswers = async (e) => {
        e.preventDefault();
        await PostRequest("/answers/", answersToSubmit, token)
            .then((response) => {
                if (response == null) {
                    notifyError()
                } else if (response.status !== 201) {
                    notifyError(response.data.message)
                }
                else {
                    notifySuccess()
                    // setQuestions([...questions, response.data.result[0]]);
                    setShowForm(false)
                }
            })
    }

    return (
        <div className="mx-16 mb-16 mt-8 px-6 rounded-md text-black">
            <form onSubmit={(e) => submitAnswers(e)}>
                {questions.map((item, i) => (
                    <div key={i}>
                        <div className="flex text-white text-left mb-1">
                            {item.question}
                        </div>
                        <div className="mb-4">
                            <textarea
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                type="text"
                                value={answers[i]}
                                onChange={(e) => {
                                    let temp_state = [...answers];
                                    let temp_element = { ...temp_state[i] };
                                    temp_element = e.target.value;
                                    temp_state[i] = temp_element;
                                    setAnswers(temp_state);

                                    let temp_state_2 = [...answersToSubmit];
                                    let temp_element_2 = { ...temp_state_2[i] };
                                    temp_element_2.answer = e.target.value;
                                    // temp_element_2.question = item.question
                                    temp_element_2.question_id = item.id
                                    temp_element_2.participant_id = participantID
                                    temp_state_2[i] = temp_element_2;
                                    setAnswersToSubmit(temp_state_2);
                                }}
                            />
                        </div>
                    </div>

                ))}
                <button className={`mt-3 text-white p-2 rounded-md text bg-green-500`}
                    type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default AnswersForm