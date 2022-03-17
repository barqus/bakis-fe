import React from 'react'
import PlayerBox from '../components/Participant/PlayerBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Participants = ({participants}) => {
    // TODO: FIX THIS ONE
    // const [participants, setParticipants] = useState([])
    // useEffect(() => {
    //     const apiEndpoint = "http://localhost:8080/api/v1//participants/"
    //     axios.get(apiEndpoint)
    //         .then(res => {
    //             setParticipants(res.data)
    //             console.log(res.data)
    //         })
    //         .catch(
    //             () => {
    //                 console.log("HERRE")
    //             }
    //         )
    // }, [])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'http://localhost:8080/api/v1//participants/',
    //         );

    //         setParticipants(result.data);
    //     };

    //     fetchData();
    // }, []);
    return (
        <div className=" mt-12 text-center text-white text-3xl font-bold font-sans">
            FILLQ DALYVAUJANTYS ŽAIDĖJAI
            <div className="mt-6 justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center">
                {participants.map(item => (
                    <PlayerBox participant={item} />
                ))}
                {/* {participants} */}
                {/* <PlayerBox name={"YASHIRO"} />
                <PlayerBox name={"WARDEN"} />
                <PlayerBox name={"TIGRIUKE"} />
                <PlayerBox name={"JAUNUTIS"} />
                <PlayerBox name={"ELOSANTA"} />
                <PlayerBox name={"DOMAS"} />
                <PlayerBox name={"UGNIUX15"} />
                <PlayerBox name={"PAREIN"} />
                <PlayerBox name={"GURKLYS"} />
                <PlayerBox name={"RIMTUOLIS"} />
                <PlayerBox name={"KURBSEN"} /> */}
            </div>
        </div>

    )
}

export default Participants
