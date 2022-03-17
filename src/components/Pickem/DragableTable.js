import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from 'react';
import "./DragableTable.css"
import { GiTrophy } from 'react-icons/gi';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VIPERLogo from './VIPER.png'
import ramjpg from './ramai.png'
import ssdjpg from './ssdas.png'
import headsetas from './headsetas.png'
import Countdown from 'react-countdown';
import { DataGrid } from '@mui/x-data-grid';

// TODO: LEARN HOW SPINNERS AND LOADING  WORKS AND HOW TO USE THEM IN ALL OF THE PROJECT
const DragableTable = ({ participants }) => {
    const [players, updatePlayers] = useState([]);
    const [userID, setUserID] = useState(0);
    const [userAlreadyPosted, setUserAlreadyPosted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingStandings, setLoadingStandings] = useState(true);
    const [standings, setStandings] = useState([])
    const [points, setPoints] =useState(0)
    const notify = () => toast.success("IŠSAUGOTA!");
    const notifyError = () => toast.error("Nepavyko išsaugoti...");
    const notifyDeleteError = () => toast.error("Nepavyko ištrinti jūsų pickemų...");



    const columns = [
        { field: 'display_name', headerName: 'Slapyvardis', sortable: false,flex: 1 },
        { field: 'points', headerName: 'Taškai', flex: 1},
        { field: 'guessed_right', headerName: 'Teisingai Atspėta',flex: 1},
    ]

    useEffect(() => {
        setUserID(localStorage.getItem('twitchCode'))
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8080/api/v1/pickems/' + localStorage.getItem('twitchCode')
            ).catch(err => console.log(err));
            if (result !== undefined && result.data.length > 0) {
                updatePlayers(result.data);
                setUserAlreadyPosted(true)
            }
            else {
                updatePlayers(participants)
            }
        };

        const fetchPoints = async () => {
            const result = await axios(
                'http://localhost:8080/api/v1/pickems/standings/' + localStorage.getItem('twitchCode')
            ).catch(err => console.log(err));
            setPoints(result.data)
        };

        const fetchAllStandings = async () => {
            const result = await axios(
                'http://localhost:8080/api/v1/pickems/standings'
            ).catch(err => console.log(err));
            result.data.
            setStandings(result.data)
            setLoadingStandings(false)
        };
        fetchData();
        fetchPoints();
        setLoading(false);
        // fetchAllStandings();
        // setStandings(standingai.default)
        
    }, [setUserID, updatePlayers, participants])

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(players);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updatePlayers(items);
    }
    const savePickEms = async () => {
        var objectToPost = []
        if (userAlreadyPosted) {
            await axios.delete(
                'http://localhost:8080/api/v1/pickems/' + userID, { withCredentials: true }
            ).catch(() => {
                notifyDeleteError()
                return
            })
        }

        players.forEach((element, index) => {
            objectToPost.push(
                {
                    user_id: Number(userID),
                    participant_id: element.participant_id,
                    position: index
                }
            )
        });

        await axios.post('http://localhost:8080/api/v1/pickems/' + userID, objectToPost, { withCredentials: true })
            .then((res) => {
                if (res.status < 300) {
                    notify()
                    setUserAlreadyPosted(true)
                }
            })
            .catch((err) => {
                console.log("ERR", err)
                notifyError()
            })
    }
    return (
        <>
            {participants.length > 0 &&
                <div className="mt-12 text-center text-white text-3xl font-bold font-sans">
                    {new Date() < Date.parse("2021-12-05T23:59:59+02:00") && <>
                        IKI PICK'EMS UŽDARYMO LIKO: <Countdown date={Date.parse("2021-12-05T23:59:59+02:00")} />
                    </>}

                    <div className="m grid md:grid-cols-3 sm:grid-cols-1 gap-4 bg-gray-900 mt-6 pr-4 pl-4 rounded-xl pb-7">
                        <div className="bg-gray-900 mt-12 m-2 rounded-lg mr-6 ml-4">
                            <p className="text-base text-justify m-4">
                                <p className="">
                                    Stebėsi FILLQ? O gal nori ir prizų laimėti? <br />
                                    {/* TODO: FIX THIS ONE HYPERLINK TO TABLE */}
                                    Spėk, kurią vietą užims dalyviai reitingų <span className="underline cursor-pointer text-purple-500" onClick={() => { window.open("https://fillq.lt/", "_blank") }}>lentelėje</span >!<br />
                                </p>
                                <hr className=" my-6" />
                                Taškai skaičiuojami taip:
                                <p className="ml-4 mt-2">
                                    1. Teisingai atspėta dalyvio vieta - 1 taškas.<br />
                                    2. Teisingai atspėti Top 3 - papildomai 3 taškai.<br />
                                    3. Teisingai atspėjus daugiau nei 10 - papildomi 3 taškai.<br />
                                </p> <br />
                                Spėjimus ir pakeitimus gali atlikti iki Gruodžio 5 dieną 23:59<br />
                                Daugiausiai taškų surinkę žiūrovai laimės partnerių įsteigtus prizus!<br />
                            </p>
                            {/* <p className="text-base text-justify m-4">
                                Spėk kokioje vietoje bus dalyviai po dviejų savaičių ir surink kuo daugiau tašku. Pakeitimus gali atlikti iki renginio pradžios Gruodžio 4 dieną 12:00

                                Surinkai daugiausiai taškų? Laimėsi partnerių prizus.

                            </p> */}
                            <hr className=" my-6" />
                            <p className="pb-4">PRIZAI</p>
                            <p className="text-base text-justify upper-case">
                                <p className="">
                                    • VIPER VPN110 <a href="https://viper.patriotmemory.com/products/solid-state-drives-ssd" className="text-purple-500 cursor underline" >SSD</a>  1TB M.2 PCIe<br />

                                    • PATRIOT VIPER 16 GB <a href="https://viper.patriotmemory.com/products/performance-memory-ram-ddr4-ddr3" className="text-purple-500 cursor underline" >RAM</a> <br />

                                    • PATRIOT VIPER PV380 HEADSET <br />
                                </p>
                                <br />
                                Prizus įsteigė Patriot Viper!
                                Lyderiaujantys SSD, RAM ir periferijos gamintojai. Įsikūrę 1985 metais Amerikoje. Žaidėjams suteikiantys geriausią galios ir kainos santykį rinkoje.
                                <p className="text-center mt-6 text-xl">
                                    NAUJI <a href="https://www.youtube.com/watch?v=pQqMBbQriZg" className="text-purple-500 cursor underline" >DDR5</a>
                                </p>
                                <img src={VIPERLogo} className="mt-4" alt="viper logo" />

                            </p>
                        </div>
                        <div className="col-span-2 mt-12">
                            {loading ? "KRAUNAMA..." : <p>ŠIUO METU TAVO SURINKTI TAŠKAI: <span className="text-purple-500 font-bold">{points}</span> </p> }

                            {loading ? <p className="text-center mt-2 text-xl">KRAUNAMA...</p> :
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="players">
                                        {(provided) => (
                                            <ul className="characters mt-4" {...provided.droppableProps} ref={provided.innerRef}>
                                                {players.map(({ nickname }, index) => {
                                                    return (
                                                        <Draggable key={nickname} draggableId={nickname} index={index}>
                                                            {(provided) => (
                                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                    className={`mb-2 flex items-center bg-gradient-to-r from-purple-800 to-green-500 px-4 rounded-lg
                                                                        ${(index + 1) === 1 ? "py-8 mt-1 border-4 text-4xl"
                                                                            : (index + 1) === 2 ? "py-4 border-2 text-3xl"
                                                                                : (index + 1) === 3 ? "py-3 border-2 text-2xl"
                                                                                    : "py-2 text-base"}`}>
                                                                    <p className="text-white font-bold">
                                                                        {(index + 1) === 1 ? <GiTrophy className="inline mb-1 mr-2" style={{ color: "#FFD700" }} />
                                                                            : (index + 1) === 2 ? <GiTrophy className="inline mb-1 mr-2" style={{ color: "#C0C0C0" }} />
                                                                                : (index + 1) === 3 && <GiTrophy className="inline mb-1 mr-2" style={{ color: "#CD7F32" }} />}
                                                                        {index + 1}. {nickname}
                                                                    </p>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                            {userID !== null && new Date() < Date.parse("2021-12-05T23:59:59+02:00") &&
                                <button onClick={() => savePickEms()}
                                    className="bg-transparent hover:bg-purple-400 text-purple-400 text-lg font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
                                    {userAlreadyPosted ? "ATNAUJINTI" : "PASKELBTI"}
                                </button>}
                            
                        </div>
                        <div className="">
                            <img src={ssdjpg} className="border-1 rounded-xl" alt="SSD" />
                        </div>
                        <div className="">
                            <img src={ramjpg} className="border-1 rounded-xl" alt="RAM" />
                        </div>
                        <div>
                            <img src={headsetas} alt="RAM" className="border-1 rounded-xl" />
                        </div>
                            {/* {loadingStandings ? "KRAUNAMA PICKEMŲ ŽIŪROVŲ LENTELĖ..." :
                            <div style={{ height: '680px', width: '100%' }} className="text-bg bg-white rounded-lg border-2 border-purple-700 col-span-3">
                                <DataGrid
                                    rows={standings}
                                    columns={columns}
                                    pageSize={10}
                                    getRowId={(row) => row.user_id}
                                />
                            </div>
                        } */}
                    </div>

                    <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
                </div>
            }
        </>

    )
}

export default DragableTable
