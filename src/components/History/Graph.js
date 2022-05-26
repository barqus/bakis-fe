import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from "recharts";

const Graph = ({ graphData, lineStroke, title, team1, team2 }) => {
  const [showChamp1, setShowChamp1] = useState(true)
  const [showChamp2, setShowChamp2] = useState(true)
  const [showChamp3, setShowChamp3] = useState(true)
  const [showChamp4, setShowChamp4] = useState(true)
  const [showChamp5, setShowChamp5] = useState(true)
  const [showChamp6, setShowChamp6] = useState(true)
  const [showChamp7, setShowChamp7] = useState(true)
  const [showChamp8, setShowChamp8] = useState(true)
  const [showChamp9, setShowChamp9] = useState(true)
  const [showChamp10, setShowChamp10] = useState(true)

  const renderLineChart = () => {
    return (
      <LineChart

        label="test"
        width={1024}
        height={576}
        data={graphData}
      // margin={{
      //   top: 5,
      //   right: 30,
      //   left: 20,
      //   bottom: 5
      // }}
      >

        {/* <CartesianGrid strokeDasharray="3 3" stroke={lineStroke}/> */}
        <XAxis dataKey="timestamp" >
          {/* <Label offset={0} position="insideBottom"
               labelStyle={{
                background: "green",
              }}>
            Minutės
            </Label> */}
        </XAxis>
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: "white", color: "black"}}
          itemStyle={{ color: lineStroke, textAlign:"left"}}
          cursor={{ stroke: lineStroke, strokeWidth: 1 }}
          itemSorter={item => -item.value}
          separator=" - "
        />
        {/* <Tooltip className="" /> */}
        {/* <Legend onClick={(e) => {setShowChamp1(!showChamp1)}}/> */}
        {showChamp1 && <Line isAnimationActive={false} name={team1.players[0].champ_name} dot={false} type="monotone" dataKey="čempionas_1" stroke={lineStroke} />}
        {showChamp2 && <Line isAnimationActive={false} name={team1.players[1].champ_name} dot={false} type="monotone" dataKey="čempionas_2" stroke={lineStroke} />}
        {showChamp3 && <Line isAnimationActive={false} name={team1.players[2].champ_name} dot={false} type="monotone" dataKey="čempionas_3" stroke={lineStroke} />}
        {showChamp4 && <Line isAnimationActive={false} name={team1.players[3].champ_name} dot={false} type="monotone" dataKey="čempionas_4" stroke={lineStroke} />}
        {showChamp5 && <Line isAnimationActive={false} name={team1.players[4].champ_name} dot={false} type="monotone" dataKey="čempionas_5" stroke={lineStroke} />}
        {showChamp6 && <Line isAnimationActive={false} name={team2.players[0].champ_name} dot={false} type="monotone" dataKey="čempionas_6" stroke={lineStroke} />}
        {showChamp7 && <Line isAnimationActive={false} name={team2.players[1].champ_name} dot={false} type="monotone" dataKey="čempionas_7" stroke={lineStroke} />}
        {showChamp8 && <Line isAnimationActive={false} name={team2.players[2].champ_name} dot={false} type="monotone" dataKey="čempionas_8" stroke={lineStroke} />}
        {showChamp9 && <Line isAnimationActive={false} name={team2.players[3].champ_name} dot={false} type="monotone" dataKey="čempionas_9" stroke={lineStroke} />}
        {showChamp10 && <Line isAnimationActive={false} name={team2.players[4].champ_name} dot={false} type="monotone" dataKey="čempionas_10" stroke={lineStroke} />}
      </LineChart>
    )

  };
  return (
    <div
      className="shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 "
      style={{
        background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
      }}>
      <h2 className="mt-4 text-xl text-yellow-400" style={{ color: lineStroke }}>
        {title}
      </h2>
      <div className="m-6">
        {renderLineChart()}
        <div className='flex justify-around' style={{ color: lineStroke }}>
          <div onClick={() => setShowChamp1(!showChamp1)} className=" cursor-pointer">
            <img
              alt={team1.players[0].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team1.players[0].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp1 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp2(!showChamp2)} className=" cursor-pointer">
            <img
              alt={team1.players[1].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team1.players[1].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp2 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp3(!showChamp3)} className=" cursor-pointer">
            <img
              alt={team1.players[2].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team1.players[2].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp3 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp4(!showChamp4)} className=" cursor-pointer">
            <img
              alt={team1.players[3].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team1.players[3].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp4 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp5(!showChamp5)} className=" cursor-pointer">
            <img
              alt={team1.players[4].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team1.players[4].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp5 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp6(!showChamp6)} className=" cursor-pointer">
            <img
              alt={team2.players[0].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team2.players[0].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp6 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp7(!showChamp7)} className=" cursor-pointer">
            <img
              alt={team2.players[1].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team2.players[1].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp7 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp8(!showChamp8)} className=" cursor-pointer">
            <img
              alt={team2.players[2].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team2.players[2].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp8 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp9(!showChamp9)} className=" cursor-pointer">
            <img
              alt={team2.players[3].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team2.players[3].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp9 && "grayscale(100%)"}}
            />
          </div>
          <div onClick={() => setShowChamp10(!showChamp10)} className=" cursor-pointer">
            <img
              alt={team2.players[4].champ_name}
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" +
                team2.players[4].champ_name +
                ".png"
              }
              width="70"
              style={{filter: !showChamp10 && "grayscale(100%)"}}
            />
          </div>
        </div>
      </div>

      {/* {timeline.info.frames.map((item) => (
        <div className="text-white">  
            {JSON.stringify(item.participantFrames)}
            <hr/> 
        </div>
      ))} */}
    </div>
  )
}

export default Graph