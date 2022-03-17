import React, { useState } from 'react'
import opgg from './opgg.png'
import { FaTwitch } from 'react-icons/fa';
import moment from 'moment';
// TODO: add sort for participants
const PlayerTable = ({ participants }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredAcc, setHoveredAcc] = useState("")
    const [timeStreamed, setTimeStreamed] = useState(null)

    const HoverEnter = (nickname, started_at) => {
        setIsHovered(true)
        setHoveredAcc(nickname)
        const diffInSeconds = moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(moment(started_at), "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
        setTimeStreamed(diffInSeconds)
    }

    const HoverExit = () => {
        setIsHovered(false)
        setHoveredAcc("")
        setTimeStreamed(null)
    }

    return (
        <div className="container" >
            <div className="mt-6 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2     align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg"
                        style={{
                            background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
                        }}>
                        <table className=" min-w-full divide-y divide-purple-500 text-white">
                            <thead className="font-bold bg-gradient-to-r from-purple-800 to-green-500 ">
                                <tr >
                                    <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider">
                                        Dalyvis
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider">
                                        Twitch Paskyra
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-base uppercase tracking-wider">
                                        FillQ LoL Paskyra
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-base uppercase tracking-wider">
                                        Reitingas
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-base uppercase tracking-wider">
                                        Statistika
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-base uppercase tracking-wider">
                                        Būsena
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{
                                background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
                            }} className="bg-white bg-opacity-10   text-base font-semibold divide-y divide-purple-500">


                                {participants.map((item) => (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-left">{item.nickname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer text-left" onClick={() => { window.open("https://twitch.tv/" + item.twitch_channel, "_blank") }}>{item.twitch_channel.toUpperCase()} <FaTwitch className="inline-block ml-1 mb-1 text-purple-500" /></td>
                                        {/* https://euw.op.gg/summoner/userName=SauliusLol */}
                                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer text-left" onClick={() => { window.open("https://euw.op.gg/summoner/userName=" + item.summoner_name, "_blank") }}>{item.summoner_name}
                                            <img src={opgg} alt="OPGG" className="w-8 inline-block"></img>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left">
                                            {item.tier === null ? "Nesužaisti reikiami žaidimai"
                                                : <> {item.tier} {item.rank} {item.points} </>
                                            }

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-green-500">{item.wins}W </span>
                                            <span className="text-red-500">{item.losses}L </span>
                                            <span className="text-gray-500">{!isNaN(Math.floor(item.wins/(item.wins+item.losses))) ? (((item.wins/(item.wins+item.losses))*100).toFixed(2)) : 0}% </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.is_live ?
                                                <span onMouseEnter={() => HoverEnter(item.nickname, item.started_at)} onMouseLeave={() => HoverExit()} onClick={() => { window.open("https://twitch.tv/" + item.twitch_channel, "_blank") }} className="cursor-pointer px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">
                                                    Transliuoja gyvai!
                                                    {isHovered && hoveredAcc === item.nickname
                                                        && <div className="absolute self-end right-28 ">
                                                            <div className="">
                                                                <div className="border-2 border-green-800 rounded-md p-2 m-1 bg-green-100 text-green-800">
                                                                    <p className="font-bold">{item.title}</p>
                                                                    <p className="text-sm"> {timeStreamed}</p>
                                                                </div>
                                                            </div>
                                                        </div>}
                                                </span>
                                                : <span className="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 text-red-800">
                                                    Transliacija išjungta
                                                </span>}

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PlayerTable
