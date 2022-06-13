import React, {useState} from 'react'
import PlayerTable from '../components/HomePage/PlayerTable'
import Countdown from "react-countdown";

const Home = ({settings}) => {
    const [currentDate] = useState(new Date());

    return (
        <div className=" mt-12 text-center text-white text-3xl font-bold font-sans">
            {Date.parse(settings.start_date) > Date.parse(currentDate) ? (
              <div className="text-white text-2xl font-bold font-sans text-center mt-10">
                FILLQ PRASIDĖS UŽ{" "}
                <Countdown date={Date.parse(settings.start_date)} />
              </div>
            ) : Date.parse(settings.end_date) > Date.parse(currentDate) ? (
              <div className="text-white text-2xl font-bold font-sans text-center mt-10">
                FILLQ BAIGSIS UŽ{" "}
                <Countdown date={Date.parse(settings.end_date)} />
              </div>
            ) : (
              <div className="text-white text-2xl font-bold font-sans text-center mt-10">
              FILLQ BAIGĖS :(
            </div>
            )}
            <PlayerTable/>
        </div>
    )
}

export default Home
