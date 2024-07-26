import React, { useState, useEffect } from "react";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [flashMessage, setFlashMessage] = useState(""); // Added flash message state
 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setFlashMessage("Error fetching doctors. Please try again.");
        
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col bg-white gap-7 items-center justify-center text-black p-11 rounded-lg">

      <a
        href="/admin"
        className="text-white mb-4 font-bold bg-blue-500 px-3 py-1 rounded-lg shadow-md shadow-gray-600"
      >
        Admin, please create a Doctor with Doctor name
      </a>

      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div key={doctor._id} className="flex flex-col items-center">
            <div className="relative w-[200px] h-[200px] overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-600 shadow shadow-gray-600">
              <img
                src="https://www.durgasorenuniversity.ac.in/upload/personnel-1.jpg"
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              <h1>{doctor.name}</h1>
              <a
                className="text-blue-500 font-bold"
                href={`/reservation/${doctor._id}`}
              >
                Appointment
              </a>
            </div>
          </div>
        ))
      ) : (
        <div>No doctors available.</div>
      )}
    </div>
  );
}

export default Doctors;
