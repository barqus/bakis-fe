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

const Graph = ({graphData, lineStroke, title}) => {
  const [showChamp1, setShowChamp1] = useState(false)
  const [showChamp2, setShowChamp2] = useState(false)
  const [showChamp3, setShowChamp3] = useState(false)
  const [showChamp4, setShowChamp4] = useState(false)
  const [showChamp5, setShowChamp5] = useState(false)
  const [showChamp6, setShowChamp6] = useState(false)
  const [showChamp7, setShowChamp7] = useState(false)
  const [showChamp8, setShowChamp8] = useState(false)
  const [showChamp9, setShowChamp9] = useState(false)
  const [showChamp10, setShowChamp10] = useState(false)
 
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
          wrapperStyle={{color: "blue", fontWeight: "bold"}} 
          contentStyle={{backgroundColor: "white", borderRadius: "10%"}} 
          itemStyle={{color: "black"}} 
          cursor={{ stroke: lineStroke, strokeWidth: 1 }} 
        />
        {/* <Tooltip className="" /> */}
        {/* <Legend onClick={(e) => {setShowChamp1(!showChamp1)}}/> */}
       {showChamp1 && <Line isAnimationActive={false} name="champ1" dot={false} type="monotone" dataKey="čempionas_1" stroke={lineStroke} />}
       {showChamp2 && <Line isAnimationActive={false} name="champ2" dot={false} type="monotone" dataKey="čempionas_2" stroke={lineStroke} />}
       {showChamp3 && <Line isAnimationActive={false} name="champ3" dot={false} type="monotone" dataKey="čempionas_3" stroke={lineStroke} />}
       {showChamp4 && <Line isAnimationActive={false} name="champ4" dot={false} type="monotone" dataKey="čempionas_4" stroke={lineStroke} />}
       {showChamp5 && <Line isAnimationActive={false} name="champ5" dot={false} type="monotone" dataKey="čempionas_5" stroke={lineStroke} />}
       {showChamp6 && <Line isAnimationActive={false} name="champ6" dot={false} type="monotone" dataKey="čempionas_6" stroke={lineStroke} />}
       {showChamp7 && <Line isAnimationActive={false} name="champ7" dot={false} type="monotone" dataKey="čempionas_7" stroke={lineStroke} />}
       {showChamp8 && <Line isAnimationActive={false} name="champ8" dot={false} type="monotone" dataKey="čempionas_8" stroke={lineStroke} />}
       {showChamp9 && <Line isAnimationActive={false} name="champ9" dot={false} type="monotone" dataKey="čempionas_9" stroke={lineStroke} />}
       {showChamp10 && <Line isAnimationActive={false} name="champ10" dot={false} type="monotone" dataKey="čempionas_10" stroke={lineStroke} />}
      </LineChart>
    )

  };
  return (
    <div
    className="shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 "
    style={{
      background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
    }}>
      <h2 className="mt-4 text-xl text-yellow-400">
          {title}
        </h2>
      <div className="m-6">
      {renderLineChart()}
      <div className='flex justify-around' style={{color: lineStroke}}>
        <div onClick={() => setShowChamp1(!showChamp1)}>
          1 champ
        </div>
        <div onClick={() => setShowChamp2(!showChamp2)}>
          2 champ
        </div>
        <div onClick={() => setShowChamp3(!showChamp3)}>
          3 champ
        </div>
        <div onClick={() => setShowChamp4(!showChamp4)}>
          4 champ
        </div>
        <div onClick={() => setShowChamp5(!showChamp5)}>
          5 champ
        </div>
        <div onClick={() => setShowChamp6(!showChamp6)}>
          6 champ
        </div>
        <div onClick={() => setShowChamp7(!showChamp7)}>
          7 champ
        </div>
        <div onClick={() => setShowChamp8(!showChamp8)}>
          8 champ
        </div>
        <div onClick={() => setShowChamp9(!showChamp9)}>
          9 champ
        </div>
        <div onClick={() => setShowChamp10(!showChamp10)}>
          10 champ
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