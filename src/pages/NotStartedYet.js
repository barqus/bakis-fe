import React from 'react'

import pogchamp from '../components/assets/pogchamp.png';
import { format } from "date-fns";

const NotStartedYet = ({startingDate}) => {
    return (
        <div className="text-white text-5xl md:text-8xl font-bold font-sans text-center mt-52">
            <h1> FILLQ SUGRĮŽTA {format(startingDate, "yyyy/MM/dd")} </h1><img src={pogchamp} className="object-contain inline" alt="PogChamp"></img> 
        </div>
    )
}


export default NotStartedYet;