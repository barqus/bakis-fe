import React from 'react'
import PlayerBox from '../components/Participant/PlayerBox'


const Participants = ({participants}) => {
    return (
        <div className=" mt-12 text-center text-white text-3xl font-bold font-sans">
            <div className="mt-6 justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center">
                {participants.map(item => (
                    <PlayerBox participant={item} />
                ))}
            </div>
        </div>

    )
}

export default Participants
