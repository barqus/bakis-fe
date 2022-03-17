import React from 'react';
import { useState } from 'react';
import PlayerModal from './PlayerModal';

const PlayerBox = ({participant}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [showModal, setShowModal] = useState(false)
    
    return (
        <>
            <div className="border-2 border-purple-500 w-56 h-28 text-center m-8 rounded-lg text-white hover:text-purple-400 cursor-pointer
            hover:shadow-lg" onClick={() => setShowModal(true)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            style={{
                background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.7) 100%)",
                paddingTop: "31px",
                boxShadow: isHovered ? "0 0 10px 5px #fff, 0 0 10px 5px #f0f,0 0 10px 5px #0ff" : null
                }}>
                <span className={isHovered ? `text-2xl` : `text-xl`}>{participant.nickname}</span>
            </div>
            { showModal ? <PlayerModal setShowModal={setShowModal} participant={participant} /> : ""}
        </>
    )
}

export default PlayerBox
