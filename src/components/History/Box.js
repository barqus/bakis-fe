import React, { useEffect, useState } from 'react'

const Box = ({ matchInformation }) => {
    const [participants, setParticipants] = useState([])

    useEffect(() => {
        let allParticipantsInMatch = []
        matchInformation.teams.forEach(t => {
            t.players.forEach(p => {
                if (p.is_participant) {
                    console.log(p)
                    allParticipantsInMatch.push(p)
                }
            });
        });

        setParticipants(allParticipantsInMatch)
        // console.log("allParticipantsInMatch",allParticipantsInMatch)
    }, [])

    return (
        <div className="my-6 mx-12 p-6 bg-gradient-to-r from-purple-800 to-green-500 shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg text-white"
            style={{
                background: "linear-gradient(120deg,#722f818a 40%, rgba(3, 71, 57, 0.8) 100%)",
            }}>
            <div className="text-center flex flex-row justify-around mb-4">
                {participants.map((p) => (
                    <div className="flex flex-row justify-around">
                        {p.summoner_name}
                    </div>
                ))}
            </div>
            <div className="flex flex-row justify-around">

                {matchInformation.teams.map((item) => (
                    <div>
                        KILLS: {item.champions_killed}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Box