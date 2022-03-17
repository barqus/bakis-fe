import React, {useEffect} from 'react'
import { AiOutlineFacebook,AiOutlineInstagram } from 'react-icons/ai'
import {FaDiscord} from 'react-icons/fa'
import pogchamp from '../components/assets/pogchamp.png';
import Countdown from 'react-countdown';

import PlayerTable from '../components/HomePage/PlayerTable';

const Home = ({participants}) => {
    return (
        <div className=" mt-12 text-center text-white text-3xl font-bold font-sans">
            IKI FILLQ PABAIGOS LIKO: <Countdown date={Date.parse("2021-12-18T23:59:59+02:00")} />
            <PlayerTable participants={participants} />
            {/* <h1> FILLQ SUGRĮŽTA </h1><img src={pogchamp} className="object-contain inline" alt="PogChamp"></img> 
            <h2 className="  text-4xl"> Sekite naujienas: 
                <AiOutlineFacebook className="cursor-pointer text-6xl inline mb-1 mx-2" onClick={()=> window.open("https://www.facebook.com/ironwolveslt", "_blank")}></AiOutlineFacebook> 
                <AiOutlineInstagram className="cursor-pointer text-6xl inline mb-1 mx-2" onClick={()=> window.open("https://www.instagram.com/ironwolveslt", "_blank")}></AiOutlineInstagram> 
                <FaDiscord className="cursor-pointer text-6xl inline mb-1 mx-2" onClick={()=> window.open("https://discord.com/invite/3wbXrM5JqG", "_blank")}></FaDiscord> 
            </h2> */}
        </div>
    )
}

export default Home
