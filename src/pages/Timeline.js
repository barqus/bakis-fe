import React, { useEffect, useState } from 'react'

import * as timeline from '../blobexample/EUW1_5860340252.json';
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
const data = [{ name: 'Page A', uv: 800, pv: 2400, amt: 2400 }];


// {
//   name: "Page A", ----- timestamp
//   uv: 4000, ----- 1 champ stat
//   dv: 2400, ----- 2 champ stat
//   amt: 2400 ----- 3 champ stat
// },
{/* <Line
type="monotone"
dataKey="dv" -- 1 champ stata
stroke="#8884d8"
activeDot={{ r: 8 }}
/> */}

const Timeline = () => {
  const [goldGraph, setGoldGraph] = useState([])
  useEffect(() => {
    let builtGoldGraph = []
    timeline.info.frames.map((item) => {

      let currentTimeGoldObject = {
        timestamp: Math.round((item.timestamp / 1000) / 60),
        čempionas_1: item.participantFrames["1"].totalGold,
        čempionas_2: item.participantFrames["2"].totalGold,
        čempionas_3: item.participantFrames["3"].totalGold,
        čempionas_4: item.participantFrames["4"].totalGold,
        čempionas_5: item.participantFrames["5"].totalGold,
        čempionas_6: item.participantFrames["6"].totalGold,
        čempionas_7: item.participantFrames["7"].totalGold,
        čempionas_8: item.participantFrames["8"].totalGold,
        čempionas_9: item.participantFrames["9"].totalGold,
        čempionas_10: item.participantFrames["10"].totalGold,
      }

      builtGoldGraph.push(currentTimeGoldObject)
    })

    setGoldGraph(builtGoldGraph)
    console.log("goldGraph", builtGoldGraph)
    return () => {
    }
  }, [])

  const renderLineChart = () => {
    return (
      <LineChart

        label="test"
        width={1024}
        height={576}
        data={goldGraph}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
    >
      
        <CartesianGrid strokeDasharray="3 3" stroke="#FFD700"/>
        <XAxis dataKey="timestamp" >
          {/* <Label offset={0} position="insideBottom"
               labelStyle={{
                background: "green",
              }}>
            Žaidėjai
            </Label> */}
          </XAxis>
        <YAxis />
        <Tooltip className="" />
        <Legend />
        <Line type="monotone" dataKey="čempionas_1" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_2" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_3" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_4" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_5" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_6" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_7" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_8" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_9" stroke="#FFD700" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="čempionas_10" stroke="#FFD700" activeDot={{ r: 8 }} />
      </LineChart>
    )

  };
  return (
    <div
    className="shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 "
    style={{
      background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
    }}>
      <h2 className="mt-4 text-xl text-yellow-400">Žaidėjo surinkto aukso ir laiko santykis</h2>
      <div className="m-6">
      {renderLineChart()}
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

export default Timeline