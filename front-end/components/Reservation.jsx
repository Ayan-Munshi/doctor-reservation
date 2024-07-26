import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Add this line if you use react-datepicker
import DatePicker from "react-datepicker"; // Add this line if you use react-datepicker
import { useEffect } from "react";
import axios from "axios"
import {useParams} from "react-router-dom"


function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00 AM"); // Default time

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const {docID} = useParams()
  const [flash_message, setFlash_message] = useState("")


  // const a = (e) => {
  //   e.preventDefault()
  //   console.log("Selected Date:", selectedDate);
  //   console.log("Selected Time:", selectedTime);
  //   console.log("First Name:", firstName);
  //   console.log("Last Name:", lastName);
  //   console.log("Email:", email);
  //   console.log("Number:", number);
  // }

  const handler = (e) => {

    e.preventDefault()
    const data = {
      firstName,
      lastName,
      email,
      number,
      selectedDate,
      selectedTime
    };

    axios.post(`http://localhost:3000/create_reservation/${docID}`, data)
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.response.data.message || 'Error creating reservation. Please try again.'));
  };


  const times = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
  ];

  return (
    
    <div className="flex  p-11 bg-white">
      
      <a
        href="/"
        className="text-blue-500 mr-[100px] font-bold"
      >
        Home
      </a>

      {/* DatePicker */}
      <div className="w-full sm:max-w-[15rem] mt-5 sm:mt-0">
        <h1 className="text-zinc-800 text-center mb-3">
          Select time for appointment
        </h1>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-zinc-900"
          placeholderText="Select a date"
        />
      </div>

      {/* Timeslot Picker */}
      <div className="sm:ms-7 sm:ps-5 sm:border-s w-full sm:max-w-[15rem] mt-5 sm:mt-0">
        <h3 className="text-gray-900 text-base font-medium mb-3 text-center">
          {selectedDate ? selectedDate.toDateString() : "Select a date"}
        </h3>
        <button
          type="button"
          data-collapse-toggle="timetable"
          className="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-4 h-4 text-gray-200 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
          Pick a time
        </button>
        <label className="sr-only">Pick a time</label>
        <ul id="timetable" className="grid w-full grid-cols-2 gap-2 mt-5">
          {times.map((time, index) => (
            <li key={index}>
              <input
                type="radio"
                id={`time-${index}`}
                value={time}
                checked={selectedTime === time}
                onChange={() => setSelectedTime(time)}
                className="hidden peer" // Hides the radio button visually
                name="timetable"
              />
              <label
                htmlFor={`time-${index}`}
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-zinc-600 border-zinc-600 dark:hover:text-white dark:border-zinc-500 dark:peer-checked:border-zinc-500 peer-checked:border-zinc-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-zinc-500 dark:bg-white dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500 shadow-md shadow-zinc-500"
              >
                {time}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Input Fields */}
       
       <div class="max-w-md mx-auto mt-8 text-black">
        
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
          <label
              for="floating_first_name"
              class="font-bold"
            >
              First name
            </label>
            <input
              value={firstName}
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded-2xl"
              placeholder=" Enter First Name..."
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            
          </div>
          <div class="relative z-0 w-full mb-5 group">
          <label
              for="floating_last_name"
              class="font-bold"
            >
              Last name
            </label>
            <input
              value={lastName}
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Last Name... "
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
          <label
              for="floating_phone"
              class=" font-bold"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Email... "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </div>
          <div class="relative z-0 w-full mb-5 group">
          <label
              for="floating_company"
              class="font-bold"
            >
              Phone
            </label>
            <input
              value={number}
              type="text"
              name="floating_company"
              id="floating_company"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Number... "
              required
              onChange={(e) => setNumber(e.target.value)}
            />
            
          </div>
        </div>

        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handler}
        >
          Submit
        </button>
      </div>

      
    </div>
    
  );
}

export default Reservation;
