import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-IN";
import "react-datepicker/dist/react-datepicker.css";
import {
  PostRequest,
  GetRequest,
  UpdateRequest,
} from "../../utils/HandleRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from "../useToken";
const { addDays } = require("date-fns");


registerLocale("en", en);
// TODO: add validation of dates
// TODO: implement usages of dates

const ManageSettings = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickemStartDate, setPickemStartDate] = useState(new Date());
  const [pickemEndDate, setPickemEndDate] = useState(new Date());
  const [editing, setEditing] = useState(false);

  const notifyError = (errMsg = "Nepavyko atnaujinti datų") =>
    toast.error(errMsg);
  const notifySuccess = () =>
    toast.success("Success!");
  const { token } = useToken();

  useEffect(() => {
    const fetchSettings = async () => {
      var results = await GetRequest("/settings");
      console.log(results);
      if (results.message != null) {
        setEditing(false);
      } else if (results.data === "") {
        setEditing(false);
      } else {
        setStartDate(new Date(results.data.start_date));
        setEndDate(new Date(results.data.end_date));
        setPickemStartDate(new Date(results.data.pickem_start_date));
        setPickemEndDate(new Date(results.data.pickem_end_date));
        setEditing(true);
      }
    };
    fetchSettings();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(startDate, endDate, pickemStartDate, pickemEndDate, editing);
    if (editing) {
      await UpdateRequest(
        "/settings/",
        {
          start_date: startDate,
          end_date: endDate,
          pickem_start_date: pickemStartDate,
          pickem_end_date: pickemEndDate,
        },
        token
      ).then((response) => {
        if (response == null || response.status !== 201) {
          notifyError();
        } else {
          notifySuccess();
        }
      });
    } else {
      await PostRequest(
        "/settings/",
        {
          start_date: startDate,
          end_date: endDate,
          pickem_start_date: pickemStartDate,
          pickem_end_date: pickemEndDate,
        },
        token
      ).then((response) => {
        if (response == null || response.status !== 201) {
          notifyError();
        } else {
          notifySuccess();
        }
      });
    }
  };
  return (
    <div className="text-lg">
      <form onSubmit={onSubmit} className="">
        <div class=""> FillQ Pradžia</div>
        <div>
          <DatePicker
            className="text-black border-2 border-purple-600 p-2 rounded-md mb-4"
            selected={startDate}
            onChange={(date) => {setStartDate(date);setEndDate(addDays(date,14))}}
            showTimeSelect
            timeIntervals={10}
            locale="en"
            dateFormat="yyyy/MM/dd h:mm aa"
          />
        </div>
        <div> FillQ Pabaiga</div>
        <div>
          <DatePicker
            className="text-black border-2 border-purple-600 p-2 rounded-md mb-4"
            selected={endDate}
            disabled={true}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeIntervals={10}
            locale="en"
            dateFormat="yyyy/MM/dd h:mm aa"
          />
        </div>

        <div> Pickem Pradžia</div>
        <div>
          <DatePicker
            className="text-black border-2 border-purple-600 p-2 rounded-md mb-4"
            selected={pickemStartDate}
            onChange={(date) => {setPickemStartDate(date);setPickemEndDate(addDays(date,3))}}            
            showTimeSelect
            timeIntervals={10}
            locale="en"
            dateFormat="yyyy/MM/dd h:mm aa"
          />
        </div>
        <div> Pickem Pabaiga</div>
        <div>
          <DatePicker
            className="text-black border-2 border-purple-600 p-2 rounded-md mb-4"
            selected={pickemEndDate}
            disabled={true}
            onChange={(date) => setPickemEndDate(date)}
            showTimeSelect
            timeIntervals={10}
            locale="en"
            dateFormat="yyyy/MM/dd h:mm aa"
          />
        </div>

        <button
          className="mt-3 text-white p-2 rounded-md text bg-green-500 w-full"
          type="submit"
        >
          Patvirtinti
        </button>
      </form>
      <ToastContainer
        className="text-xl text-purple-600"
        position="bottom-right"
      />
    </div>
  );
};

export default ManageSettings;
