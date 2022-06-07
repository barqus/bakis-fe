import React, { useEffect, useState } from 'react'
import useKeypress from '../UseKeypress'

import { useRef } from 'react';
import useOutsideAlerter from '../UseOutsideAlerter';
import { AiOutlineClose } from 'react-icons/ai'
import { BsInstagram, BsTwitter, BsTwitch, BsYoutube } from 'react-icons/bs'
import { GetRequest } from '../../utils/HandleRequest'


const PlayerModal = ({ setShowModal, participant }) => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {

        const fetchParticipants = async () => {
            var results = await GetRequest("/participants/"+participant.id+"/qna")
            if (results.message != null) {
                setQuestions([])
            } else {
                setQuestions(results.data)
            }
        };

        fetchParticipants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowModal);
    useKeypress('Escape', () => {
        setShowModal(false)
    });
    return (
        <>
            {questions.length >= 0 &&
                <div
                    className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    style={{ background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.7) 100%)" }} >
                    <div className="relative sm:w-12/12 md:w-8/12 my-12 mx-auto max-w-8xl">
                        <div className="w-6xl border-2 border-opacity-20 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none" ref={wrapperRef}>
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-gradient-to-r from-purple-800 to-green-500 ">
                                <h3 className="text-3xl font-semibold text-white">
                                    {participant.nickname}
                                </h3>
                                <div className=" cursor-pointer p-1 ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                                    <AiOutlineClose onClick={() => setShowModal(false)} />
                                </div>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <div class="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
                                    <div className="">

                                        {/* <img style={imageLoaded ? {} : { display: 'none' }} className=" self-center border-2 border-purple-400 border-opacity-60 filter drop-shadow-2xl object-cover mt-5 inline rounded-lg"
                                            src={participant.description} width="500px" alt="dalyvis" loading="lazy" onLoad={() => setImageLoaded(true)} /> */}
                                        <p className="mt-4 mb-2 text-purple-400">{participant.name}</p>
                                        <p className="my-2 text-purple-400">{participant.surname}</p>
                                        <p className=" italic text-sm font-normal">{participant.description}</p>
                                        <div className="text-base mt-6">
                                            <p className="my-2 cursor-pointer" onClick={() => { window.open("https://twitch.tv/" + participant.twitch_channel, "_blank") }}>{participant.twitch_channel.toUpperCase()} <BsTwitch className="text-purple-400 inline" /></p>
                                            {participant.instagram === "-" || participant.instagram === "" ? null :
                                                <p className="my-2 cursor-pointer" onClick={() => { window.open("https://instagram.com/" + participant.instagram, "_blank") }}>{participant.instagram.split("/")[participant.instagram.split("/").length - 1].toUpperCase()} <BsInstagram className="inline text-yellow-500" /></p>}
                                            {participant.twitter === "-" || participant.twitter === "" ? null :
                                                <p className="my-2 cursor-pointer" onClick={() => { window.open("https://twitter.com/" + participant.twitter, "_blank") }}>{participant.twitter.split("/")[participant.twitter.split("/").length - 1].toUpperCase()} <BsTwitter className="text-blue-400 inline" /></p>}
                                                {participant.youtube === "-" || participant.youtube === "" ? null :
                                                <p className="my-2 cursor-pointer" onClick={() => { window.open("https://youtube.com/c/" + participant.youtube, "_blank") }}>{participant.youtube.split("/")[participant.youtube.split("/").length - 1].toUpperCase()} <BsYoutube className="text-red-400 inline" /></p>}
                                        </div>

                                    </div>
                                    <div className="col-span-3 text-left ml-3">
                                        <div className=" max-w-5xl min-w-5xl">
                                            {questions.map(item => (
                                                <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-purple-400">
                                                    {item.question.toUpperCase()}
                                                    <br />
                                                    <p className="mb-2 text-base font-medium text-white">
                                                        {item.answer}
                                                    </p>

                                                    <hr className="opacity-30" />
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerModal
