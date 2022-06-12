/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  GiTwoCoins,
  GiBloodySword,
  GiBroadsword,
  GiSpikedDragonHead,
  GiDragonHead,
  GiCrab,
  GiEvilTower,
  GiStoneTower,
} from "react-icons/gi";
import { format } from "date-fns";
import Graph from "../History/Graph";
import {
  getGoldTimeGraphData,
  getPhysicalDMGToChampGraphData,
  // getMagicalDMGToChampGraphData,
  // getTotalDamageDoneToChampionsGraphData,
  getMinionGraphData,
  // parseMatchTimelineData,
} from "../../utils/HandleTimelineData";
import { GetRequest } from "../../utils/HandleRequest";

const Box = ({ matchInformation }) => {
  const [showGameInformation, setShowGameInformation] = useState(false);
  const [showGameStats, setShowGameStats] = useState(false);

  const [showGoldStats, setShowGoldStats] = useState(false);
  const [goldGraph, setGoldGraph] = useState([]);

  const [showPhysDMGToChamp, setShowPhysDMGToChamp] = useState(false);
  const [physDMGToChamp, setPhysDMGToChamp] = useState([]);

  const [showMinnionsGraph, setShowMinnionsGraph] = useState(false);
  const [minnions, setMinions] = useState([]);

  const [matchDetails, setMatchDetails] = useState([])
  // const [magDMGToChamp, setMagDMGToChamp] = useState([]);
  // const [dmgToChamp, setDMGToChamp] = useState([]);
  // const [timelineDataForRange, setTimelineDataForRange] = useState([]);

  useEffect(() => {

    // let allParticipantsInMatch = [];
    // matchInformation.teams.forEach((t) => {
    //   t.players.forEach((p) => {
    //     if (p.is_participant) {
    //       console.log(p);
    //       allParticipantsInMatch.push(p);
    //     }
    //   });
    // });

    // // setTimelineDataForRange(parseMatchTimelineData(timeline.default));

    // setParticipants(allParticipantsInMatch);
  }, []);

  const getMatchDetails = async () => {
    // console.log(matchInformation.game_id)
    

    if (!showGameInformation) {
      var results = await GetRequest("/league/history/details/" + matchInformation.game_id)
      if (results.message != null) {
        setMatchDetails([])
      } else {
        results.data.teams.sort((a, b) => a.id - b.id);
        console.log(results.data.teams)
        setMatchDetails(results.data)
      }
    }

    setShowGameInformation(!showGameInformation);
  }
  const getMatchJSON = async () => {
    let output = await GetRequest('/league/history/stats/' + matchInformation.game_id);
    setPhysDMGToChamp(getPhysicalDMGToChampGraphData(output.data));
    setGoldGraph(getGoldTimeGraphData(output.data));
    // setMagDMGToChamp(getMagicalDMGToChampGraphData(output.data));
    // setDMGToChamp(getTotalDamageDoneToChampionsGraphData(output.data));
    setMinions(getMinionGraphData(output.data));
  }

  return (
    <div>
      <div className="text-center flex flex-col justify-around mb-4 border-2 rounded-xl p-6"
        style={{
          background:
            "linear-gradient(120deg,#722f818a 40%, rgba(3, 71, 57, 0.8) 100%)",
        }}>
        <div className="flex justify-between text-lg font-medium ">
          <div>
            {format(Date.parse(matchInformation.game_creation), "yyyy/MM/dd H:mm")}{" "}
          </div>
          <div> {Math.floor(matchInformation.game_duration / 60)} minutes</div>
        </div>
        <div className=" " >
          <div
          onClick={async () => getMatchDetails()}
            className={` cursor-pointer border-2  rounded-xl p-4 
            ${matchInformation.win
                ? "bg-green-500 border-green-400"
                : " bg-red-500 border-red-400"
              } bg-opacity-40`}
          >
            <div className=" flex items-center">
              <div className="text-2xl font-semibold mr-4">
                {" "}
                {matchInformation.summoner_name}{" "}
              </div>
              <div>
                <img
                  alt={matchInformation.champ_name}
                  src={
                    "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                    matchInformation.champ_name +
                    ".png"
                  }
                  width="70"
                  className="border-2 border-gray-600 rounded-full"
                />
              </div>
              <div className="text-xl font-semibold ml-4 flex">
                <div className="text-green-500">{matchInformation.kills}</div>&nbsp;/&nbsp;
                <div className="text-red-500">{matchInformation.deaths}</div> &nbsp;/&nbsp;
                <div className="text-blue-500">{matchInformation.assists}</div>
              </div>
              <div className=" ml-6 text-yellow-300 text-lg ">
                <p className="">
                  <GiTwoCoins className="inline mb-1 mr-1" />
                  {matchInformation.gold_earned}
                </p>
              </div>
              <div className=" ml-6 text-red-300 text-lg ">
                <p className="">
                  <GiBloodySword className="inline mb-1 mr-1" />
                  {matchInformation.total_damage_dealt}
                </p>
              </div>
            </div>
            <div className="mt-2">
            </div>
          </div>
          {showGameInformation &&
            <div>
              <div className="flex flex-row justify-around mb-4 rounded-xl border-2">
                {matchDetails.teams.map((item) => (
                  <div
                    className={`flex flex-col w-full text-xl rounded-xl border-2 items-centers justify-center 
                  ${item.win
                        ? "bg-green-500 border-green-400"
                        : " bg-red-500 border-red-400"
                      } bg-opacity-40`}
                  >
                    <div
                      className={`flex w-full text-xl items-centers border-b-2 justify-center p-4 
                    ${item.win
                          ? "bg-green-500 border-green-400"
                          : " bg-red-500 border-red-400"
                        } bg-opacity-40`}
                    >
                      {item.champions_killed}{" "}
                      <GiBroadsword className="mt-1 mx-1 mr-4 inline" />
                      {item.barons_killed}{" "}
                      <GiSpikedDragonHead className="mt-1 mx-1 mr-4 inline" />
                      {item.dragons_killed}{" "}
                      <GiDragonHead className="mt-1 mx-1 mr-4 inline" />
                      {item.rift_heralds_killed}{" "}
                      <GiCrab className="mt-1 mx-1 mr-4 inline" />
                      {item.inhibitors_killed}{" "}
                      <GiEvilTower className="mt-1 mx-1 mr-4 inline" />
                      {item.towers_killed}{" "}
                      <GiStoneTower className="mt-1 mx-1 mr-4 inline" />
                    </div>
                    {item.players.map((p) => (
                      <div className="py-2 px-2 ml-2 flex items-center text-gray-300">
                        <img
                          alt={p.champ_name}
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                            p.champ_name +
                            ".png"
                          }
                          width="40"
                          className="border-2 border-gray-600 rounded-md"
                        />
                        <p
                          className={`ml-2 ${p.is_participant && "font-bold text-white"
                            }`}
                        >
                          {p.summoner_name}
                        </p>
                        <div className="text-xl font-semibold ml-4 flex">
                          <div className="text-green-400">{p.kills}</div>&nbsp;/&nbsp;
                          <div className="text-red-300">{p.deaths}</div> &nbsp;/&nbsp;
                          <div className="">{p.assists}</div>
                          <div className=" ml-6 text-yellow-300 text-lg ">
                            <p className="">
                              <GiTwoCoins className="inline mb-1 mr-1" />
                              {p.gold_earned}
                            </p>
                          </div>
                          <div className=" ml-6 text-red-300 text-lg ">
                            <p className="">
                              <GiBloodySword className="inline mb-1 mr-1" />
                              {p.total_damage_dealt}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex my-5   ">
                <button
                  onClick={async () => { setShowGameStats(!showGameStats); await getMatchJSON() }}
                  className="flex text-2xl bg-transparent hover:bg-green-400 text-green-400 font-semibold hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded" >
                  {
                    !showGameStats ? "Atidaryti " : "Uždaryti "
                  } žaidimo statistikas
                </button>
              </div>
              {
                showGameStats &&
                <div className="">
                  <div className="my-4 flex justify-around">
                    <button
                      onClick={() => { setShowGoldStats(!showGoldStats); setShowPhysDMGToChamp(false); setShowMinnionsGraph(false) }}
                      className="flex text-lg bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
                      Peržiūrėti žaidėjų surinkto aukso statistiką
                    </button>
                    <button
                      onClick={() => { setShowPhysDMGToChamp(!showPhysDMGToChamp); setShowGoldStats(false); setShowMinnionsGraph(false) }}
                      className="flex text-lg bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
                      Peržiūrėti žaidėjų atliktos žalos statistiką
                    </button>
                    <button
                      onClick={() => { setShowPhysDMGToChamp(false); setShowGoldStats(false); setShowMinnionsGraph(!showMinnionsGraph) }}
                      className="flex text-lg bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded" >
                      Peržiūrėti žaidėjų pakalikų statistiką
                    </button>
                  </div>
                  <div className="flex justify-center">
                    {showGoldStats &&
                      <Graph
                        title={"Žaidėjo surinkto aukso ir laiko santykis"}
                        graphData={goldGraph}
                        lineStroke={"orange"}
                        team1={matchDetails.teams[0]}
                        team2={matchDetails.teams[1]}
                      />
                    }
                    {showPhysDMGToChamp &&
                      <Graph
                        title={"Žaidėjo atliktos žalos ir laiko santykis"}
                        graphData={physDMGToChamp}
                        lineStroke={"rgb(239, 68, 68)"}
                        team1={matchDetails.teams[0]}
                        team2={matchDetails.teams[1]}
                      />
                    }

                    {showMinnionsGraph &&
                      <Graph
                        title={"Žaidėjo užmuštų pakalikų ir laiko santykis"}
                        graphData={minnions}
                        lineStroke={"rgb(16, 185, 129)"}
                        team1={matchDetails.teams[0]}
                        team2={matchDetails.teams[1]}
                      />
                    }

                  </div>
                </div>
              }
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Box;
