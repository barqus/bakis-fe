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

const Box = ({ matchInformation }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    let allParticipantsInMatch = [];
    matchInformation.teams.forEach((t) => {
      t.players.forEach((p) => {
        if (p.is_participant) {
          console.log(p);
          allParticipantsInMatch.push(p);
        }
      });
    });

    setParticipants(allParticipantsInMatch);
  }, []);

  return (
    <div
      className="my-6 mx-12 p-6 bg-gradient-to-r from-purple-800 to-green-500 shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg text-white"
      style={{
        background:
          "linear-gradient(120deg,#722f818a 40%, rgba(3, 71, 57, 0.8) 100%)",
      }}
    >
      <div className="text-center flex flex-row justify-around mb-4 ">
        {participants.map((p) => (
          <div
            className={`flex items-center border-2  rounded-xl p-4 
            ${
              p.win
                ? "bg-green-500 border-green-400"
                : " bg-red-500 border-red-400"
            } bg-opacity-40`}
          >
            <div className="text-2xl font-semibold mr-4">
              {" "}
              {p.summoner_name}{" "}
            </div>
            <div>
              <img
                alt={p.champ_name}
                src={
                  "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                  p.champ_name +
                  ".png"
                }
                width="70"
                className="border-2 border-gray-600 rounded-full"
              />
            </div>
            <div className="text-xl font-semibold ml-4 flex">
              <div className="text-green-500">{p.kills}</div>&nbsp;/&nbsp;
              <div className="text-red-500">{p.deaths}</div> &nbsp;/&nbsp;
              <div className="text-blue-500">{p.assists}</div>
            </div>
            <div className=" ml-6 text-yellow-300 text-lg ">
              <p className="">
                <GiTwoCoins className="inline mb-1 mr-1" />
                {p.gold_earned}
              </p>
            </div>
            <div className=" ml-6 text-red-300 text-lg ">
              {/* TODO: FIX DAMAGE DEALT CALCULATION */}
              <p className="">
                <GiBloodySword className="inline mb-1 mr-1" />
                {p.total_damage_dealt}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-lg font-medium mb-2">
        <div>
          {format(Date.parse(matchInformation.start_time), "yyyy/MM/dd H:mm")}{" "}
        </div>
        <div> {Math.floor(matchInformation.duration)} minutes</div>
      </div>
      <div className="flex flex-row justify-around">
        {matchInformation.teams.map((item) => (
          <div
            className={`flex flex-col w-full text-xl items-centers justify-center 
            ${
              item.win
                ? "bg-green-500 border-green-400"
                : " bg-red-500 border-red-400"
            } bg-opacity-40`}
          >
            <div
              className={`flex w-full text-xl items-centers border-b-2 justify-center p-4 
            ${
              item.win
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
              <div className="py-2 px-2 ml-2 flex items-center text-gray-400">
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
                  className={`ml-2 ${
                    p.is_participant && "font-bold text-white"
                  }`}
                >
                  {p.summoner_name}
                </p>
                <div className="text-xl font-semibold ml-4 flex">
                  <div className="text-green-500">{p.kills}</div>&nbsp;/&nbsp;
                  <div className="text-red-500">{p.deaths}</div> &nbsp;/&nbsp;
                  <div className="text-blue-500">{p.assists}</div>
                  <div className=" ml-6 text-yellow-300 text-lg ">
                    <p className="">
                      <GiTwoCoins className="inline mb-1 mr-1" />
                      {p.gold_earned}
                    </p>
                  </div>
                  <div className=" ml-6 text-red-300 text-lg ">
                    {/* TODO: FIX DAMAGE DEALT CALCULATION */}
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
    </div>
  );
};

export default Box;
