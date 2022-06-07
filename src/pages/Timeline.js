import React, { useState, useEffect } from "react";
import Graph from "../components/History/Graph";
// import MatchTimeline from "../components/History/MatchTimeline";
import {
  getGoldTimeGraphData,
  getPhysicalDMGToChampGraphData,
  getMagicalDMGToChampGraphData,
  parseMatchTimelineData,
} from "../utils/HandleTimelineData";
import * as timeline from "../blobexample/EUW1_5860340252.json";

const Timeline = () => {
  const [goldGraph, setGoldGraph] = useState([]);
  const [physDMGToChamp, setPhysDMGToChamp] = useState([]);
  const [magDMGToChamp, setMagDMGToChamp] = useState([]);
  const [timelineDataForRange, setTimelineDataForRange] = useState([]);
  useEffect(() => {
    setPhysDMGToChamp(getPhysicalDMGToChampGraphData(timeline.default));
    setGoldGraph(getGoldTimeGraphData(timeline.default));
    setMagDMGToChamp(getMagicalDMGToChampGraphData(timeline.default));
    setTimelineDataForRange(parseMatchTimelineData(timeline.default));
    console.log(timelineDataForRange)
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* <MatchTimeline timelineData={timelineDataForRange}/> */}
      <Graph
        title={"Žaidėjo surinktas aukso ir laiko santykis"}
        graphData={goldGraph}
        lineStroke={"yellow"}
      />
      <Graph
        title={"Žaidėjo fizinė žala ir laiko santykis"}
        graphData={physDMGToChamp}
        lineStroke={"red"}
      />
      <Graph
        title={"Žaidėjo magiška žala ir laiko santykis"}
        graphData={magDMGToChamp}
        lineStroke={"purple"}
      />
    </div>
  );
};

export default Timeline;
