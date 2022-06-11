import React, { useContext } from "react";

import { useState, useEffect } from "react";
import "./DragableTable.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "react-countdown";
import useToken from "../useToken";
import {
  GetRequest,
  PostRequest,
  DeleteRequest,
} from "../../utils/HandleRequest";
import UserContext from "../UserContext";
import DragableTable from "./DragableTable";

const PickemBox = ({ participants, settings }) => {
  const [players, setPlayers] = useState(participants);
  const [userAlreadyPosted, setUserAlreadyPosted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const notifySuccess = () => toast.success("Pavyko!");
  const notifyError = (msg = "Nepavyko išsaugoti...") => toast.error(msg);
  const notifyDeleteError = () => toast.error("Nepavyko atnaujinti...");
  const { token, getUserID } = useToken();
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchParticipants = async () => {
      var results = await GetRequest("/participants")
      if (results.message != null) {
        setPlayers([])
      } else {
        setPlayers(results.data.participants)
      }
    };
    console.log(loading)
    fetchParticipants()
    const fetchData = async () => {
      let userID = await getUserID();
      let results = await GetRequest("/pickems/" + userID, token);
      console.log("DADASD", results);
      if (results.message != null) {
      } else {
        console.log(players);
        setUserAlreadyPosted(true);
        console.log("players", players);
        setPlayers(results.data);
        console.log("results.data", players);
        setLoading(false);
      }
    };


    const fetchPickemPoints = async () => {
      let userID = await getUserID();
      var results = await GetRequest("/pickems/points/" + userID, token);
      if (results.message != null) {
        setPoints(0)
      } else {
        setPoints(results.data.totalPoints)
      }
    };
    fetchData();
    fetchPickemPoints();
    setLoading(false);
    //     // fetchAllStandings();
    //     // setStandings(standingai.default)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savePickEms = async () => {
    var objectToPost = [];
    if (userAlreadyPosted) {
      await DeleteRequest("/pickems/" + user.data.id, token).then(
        (response) => {
          if (response == null || response.status !== 204) {
            notifyDeleteError();
            return;
          }
        }
      );
      players.forEach((element, index) => {
        objectToPost.push({
          user_id: Number(user.data.id),
          participant_id: element.participant_id,
          position: index,
        });
      });
    } else {
      players.forEach((element, index) => {
        objectToPost.push({
          user_id: Number(user.data.id),
          participant_id: element.id,
          position: index,
        });
      });
    }
    console.log("players", players);

    console.log("objectToPost", objectToPost);

    await PostRequest("/pickems/" + user.data.id, objectToPost, token).then(
      (response) => {
        if (response == null) {
          notifyError();
        } else if (response.status !== 201) {
          notifyError("Nepavyko išsaugoti, pabandykite perkrauti puslapį.");
        } else {
          setUserAlreadyPosted(true);
          notifySuccess();
        }
      }
    );
  };
  return (
    <>
      {players.length > 0 && (
        <div className="mt-12 text-center text-white text-3xl font-bold font-sans">
          <div>

          </div>
          {Date.parse(settings.pickem_start_date) > new Date() ?
            (<>
              IKI PICK'EMS ATIDARYMO LIKO:{" "}
              <Countdown date={Date.parse(settings.pickem_start_date)} />
            </>) :
            Date.parse(settings.pickem_end_date) > new Date() ?
              (<>
                IKI PICK'EMS UŽDARYMO LIKO:{" "}
                <Countdown date={Date.parse(settings.pickem_end_date)} />
              </>) :
              ("PICK'EMS UŽDARYTI")
          }

          <div className="m grid md:grid-cols-3 sm:grid-cols-1 gap-4 bg-gray-900 mt-6 pr-4 pl-4 rounded-xl pb-7">
            <div className="bg-gray-900 mt-12 m-2 rounded-lg mr-6 ml-4">
              <p className="text-base text-justify m-4">
                <p className="">
                  Stebėsi FILLQ? O gal nori ir prizų laimėti? <br />
                  Spėk, kurią vietą užims dalyviai reitingų{" "}
                  <span
                    className="underline cursor-pointer text-purple-500"
                    onClick={() => {
                      window.open("/", "_blank");
                    }}
                  >
                    lentelėje
                  </span>
                  !<br />
                </p>
                <hr className=" my-6" />
                Taškai skaičiuojami taip:
                <p className="ml-4 mt-2">
                  1. Teisingai atspėta dalyvio vieta - 1 taškas.
                  <br />
                  2. Teisingai atspėti Top 3 - papildomai 3 taškai.
                  <br />
                  {/* 3. Teisingai atspėjus daugiau nei 10 - papildomi 3 taškai.
                  <br /> */}
                </p>{" "}
                <br />
                Daugiausiai taškų surinkę žiūrovai laimės partnerių įsteigtus
                prizus!
                <br />
              </p>
            </div>
            <div className="col-span-2 mt-12">
            ŠIUO METU JŪSŲ TURIMI TAŠKAI: {points}
              <DragableTable players={players} setPlayers={setPlayers} />
              {token && Date.parse(settings.pickem_start_date) < new Date() && Date.parse(settings.pickem_end_date) > new Date() && (
                <button
                  onClick={() => savePickEms()}
                  className="bg-transparent hover:bg-purple-400 text-purple-400 text-lg font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded"
                >
                  Išsaugoti
                </button>
              )}
            </div>
          </div>

          <ToastContainer
            className="text-xl text-purple-600"
            position="bottom-right"
          />
        </div>
      )}
    </>
  );
};

export default PickemBox;
