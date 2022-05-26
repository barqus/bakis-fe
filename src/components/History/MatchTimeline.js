import * as React from "react";
import { Range, Direction, getTrackBackground } from "react-range";

const STEP = 10000;
const MIN = 0;
const MAX = 100;

const MatchTimeline = ({ rtl, timelineData }) => {
  const [values, setValues] = React.useState([0]);
  React.useEffect(() => {
    return () => {};
  }, []);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const getEventsBetweenTime = (tensOfSeconds) => {
      console.log(tensOfSeconds)
      if (tensOfSeconds < 1) {
        tensOfSeconds = 0
      } else if (tensOfSeconds % 1 !== 0) {
        tensOfSeconds = Math.ceil(tensOfSeconds)
      }

      console.log("TIMELINE", timelineData)
    return JSON.stringify(timelineData.eventsBy10SecondRange[tensOfSeconds]);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Range
        direction={Direction.Down}
        values={values}
        step={STEP}
        min={MIN}
        max={timelineData.endTimestamp}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              flexGrow: 1,
              width: "36px",
              display: "flex",
              height: "400px",
            }}
          >
            <div
              ref={props.ref}
              style={{
                width: "5px",
                height: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#548BF4", "#ccc"],
                  min: MIN,
                  max: timelineData.endTimestamp,
                  direction: Direction.Down,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
      {
        <output
          className="text-white"
          style={{ marginTop: "50px", width: "56px" }}
          id="output"
        >
          MATCH TIME: {millisToMinutesAndSeconds(values[0])}
          {getEventsBetweenTime(values[0]/10000)}
        </output>
      }
    </div>
  );
};

export default MatchTimeline;
