/* eslint-disable array-callback-return */
export const getGoldTimeGraphData = (timelineData) => {
    let builtGoldGraph = []
    console.log(timelineData, "d")
    timelineData.info.frames.map((item) => {

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

    return builtGoldGraph   
}

export const getPhysicalDMGToChampGraphData = (timelineData) => {
    let builtPhysicalDMGToChamp = []
    timelineData.info.frames.map((item) => {

        let currentTimeGoldObject = {
          timestamp: Math.round((item.timestamp / 1000) / 60),
          čempionas_1: item.participantFrames["1"].damageStats.physicalDamageDoneToChampions,
          čempionas_2: item.participantFrames["2"].damageStats.physicalDamageDoneToChampions,
          čempionas_3: item.participantFrames["3"].damageStats.physicalDamageDoneToChampions,
          čempionas_4: item.participantFrames["4"].damageStats.physicalDamageDoneToChampions,
          čempionas_5: item.participantFrames["5"].damageStats.physicalDamageDoneToChampions,
          čempionas_6: item.participantFrames["6"].damageStats.physicalDamageDoneToChampions,
          čempionas_7: item.participantFrames["7"].damageStats.physicalDamageDoneToChampions,
          čempionas_8: item.participantFrames["8"].damageStats.physicalDamageDoneToChampions,
          čempionas_9: item.participantFrames["9"].damageStats.physicalDamageDoneToChampions,
          čempionas_10: item.participantFrames["10"].damageStats.physicalDamageDoneToChampions,
        }
  
        builtPhysicalDMGToChamp.push(currentTimeGoldObject)
      })

    return builtPhysicalDMGToChamp;   
}


export const getMagicalDMGToChampGraphData = (timelineData) => {
    let builtMagicalDMGToChamp = []
    timelineData.info.frames.map((item) => {

        let currentTimeGoldObject = {
          timestamp: Math.round((item.timestamp / 1000) / 60),
          čempionas_1: item.participantFrames["1"].damageStats.magicDamageDoneToChampions,
          čempionas_2: item.participantFrames["2"].damageStats.magicDamageDoneToChampions,
          čempionas_3: item.participantFrames["3"].damageStats.magicDamageDoneToChampions,
          čempionas_4: item.participantFrames["4"].damageStats.magicDamageDoneToChampions,
          čempionas_5: item.participantFrames["5"].damageStats.magicDamageDoneToChampions,
          čempionas_6: item.participantFrames["6"].damageStats.magicDamageDoneToChampions,
          čempionas_7: item.participantFrames["7"].damageStats.magicDamageDoneToChampions,
          čempionas_8: item.participantFrames["8"].damageStats.magicDamageDoneToChampions,
          čempionas_9: item.participantFrames["9"].damageStats.magicDamageDoneToChampions,
          čempionas_10: item.participantFrames["10"].damageStats.magicDamageDoneToChampions,
        }
  
        builtMagicalDMGToChamp.push(currentTimeGoldObject)
      })

    return builtMagicalDMGToChamp;   
}

export const getTotalDamageDoneToChampionsGraphData = (timelineData) => {
  let builtMagicalDMGToChamp = []
  timelineData.info.frames.map((item) => {

      let currentTimeGoldObject = {
        timestamp: Math.round((item.timestamp / 1000) / 60),
        čempionas_1: item.participantFrames["1"].damageStats.totalDamageDoneToChampions,
        čempionas_2: item.participantFrames["2"].damageStats.totalDamageDoneToChampions,
        čempionas_3: item.participantFrames["3"].damageStats.totalDamageDoneToChampions,
        čempionas_4: item.participantFrames["4"].damageStats.totalDamageDoneToChampions,
        čempionas_5: item.participantFrames["5"].damageStats.totalDamageDoneToChampions,
        čempionas_6: item.participantFrames["6"].damageStats.totalDamageDoneToChampions,
        čempionas_7: item.participantFrames["7"].damageStats.totalDamageDoneToChampions,
        čempionas_8: item.participantFrames["8"].damageStats.totalDamageDoneToChampions,
        čempionas_9: item.participantFrames["9"].damageStats.totalDamageDoneToChampions,
        čempionas_10: item.participantFrames["10"].damageStats.totalDamageDoneToChampions,
      }

      builtMagicalDMGToChamp.push(currentTimeGoldObject)
    })

  return builtMagicalDMGToChamp;   
}

export const getMinionGraphData = (timelineData) => {
  let builtMagicalDMGToChamp = []
  timelineData.info.frames.map((item) => {

      let currentTimeGoldObject = {
        timestamp: Math.round((item.timestamp / 1000) / 60),
        čempionas_1: item.participantFrames["1"].minionsKilled,
        čempionas_2: item.participantFrames["2"].minionsKilled,
        čempionas_3: item.participantFrames["3"].minionsKilled,
        čempionas_4: item.participantFrames["4"].minionsKilled,
        čempionas_5: item.participantFrames["5"].minionsKilled,
        čempionas_6: item.participantFrames["6"].minionsKilled,
        čempionas_7: item.participantFrames["7"].minionsKilled,
        čempionas_8: item.participantFrames["8"].minionsKilled,
        čempionas_9: item.participantFrames["9"].minionsKilled,
        čempionas_10: item.participantFrames["10"].minionsKilled,
      }

      builtMagicalDMGToChamp.push(currentTimeGoldObject)
    })

  return builtMagicalDMGToChamp;   
}

export const parseMatchTimelineData = (timelineData) => {


    let combinedEvents = []
    timelineData.info.frames.forEach((element) => {
      combinedEvents = combinedEvents.concat(element.events)
    });


    let timelineBy10SecondRange = []

    combinedEvents.forEach((element, index) => {
      timelineBy10SecondRange.push([])
      let indexForArray = Math.ceil(element.timestamp/10000)

      // console.log(index, Math.ceil(element.timestamp/10000))
      console.log(timelineBy10SecondRange.length, indexForArray, 
        timelineBy10SecondRange[indexForArray])
      timelineBy10SecondRange[indexForArray].push(element)
      // console.log(timelineBy10SecondRange[0])

    });

    let parsedTimelineObject = {
      endTimestamp: timelineData.info.frames[timelineData.info.frames.length - 1].timestamp,
      startTimestamp: 0,
      eventsBy10SecondRange: timelineBy10SecondRange
    }

    console.log(timelineBy10SecondRange)
    // var minutes = Math.floor(parsedTimelineObject.endTimestamp / 60000);
    // var seconds = ((parsedTimelineObject.endTimestamp % 60000) / 1000).toFixed(0);
    // var time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

    return parsedTimelineObject
}