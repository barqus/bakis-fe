import React from 'react'
import useKeypress from '../UseKeypress'
import { useRef } from 'react';
import useOutsideAlerter from '../UseOutsideAlerter';
import { AiOutlineClose } from 'react-icons/ai'
import TournamentForm from './TournamentForm';

const TournamentModal = ({ setShowForm, setTournaments, tournaments, notifySuccess }) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowForm);
    useKeypress('Escape', () => {
        setShowForm(false)
    });

    return (
        <div
            className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{ background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.7) 100%)" }} >
            <div className="relative my-12 mx-auto max-w-8xl w-max min-w-max">
                <div className="border-2 border-opacity-20 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none" ref={wrapperRef}>
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-gradient-to-r from-purple-800 to-green-500 ">
                        <h3 className="text-3xl font-semibold text-white">
                            CREATE TOURNAMENT
                        </h3>
                        <div className=" cursor-pointer p-1 ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                            <AiOutlineClose onClick={() => setShowForm(false)} />
                        </div>
                        {/* <button
                                className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    
                                </span>
                            </button> */}
                    </div>
                    {/*body*/}
                    <div className="flex justify-center">
                        <TournamentForm setShowForm={setShowForm} setTournaments={setTournaments} tournaments={tournaments} notifySuccess={notifySuccess} />
                    </div>
                    {/*footer*/}
                    {/* <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">

                            <button
                                className="text-red-500 border-2 border-red-500 rounded-md background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                UŽDARYTI
                            </button>
                        </div> */}
                </div>
            </div>
        </div>
    )
}

export default TournamentModal