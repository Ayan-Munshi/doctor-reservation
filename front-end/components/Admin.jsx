import React, { useState } from "react";
import axios from "axios";

function admin() {
  const [doc_name, setDocName] = useState("");

  const handler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/create_doc", { doc_name })
      .then((response) => {
        console.log("Doctor created:", response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the doctor:", error);
      });
      
      setDocName("")
  };

  return (
    <div>
      <section class="bg-gray-50 ">
       
      <a
        href="/"
        className="text-blue-500 ml-4 font-bold"
      >
        Home
      </a>

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div class="w-full bg-white rounded-lg   md:mt-0 sm:max-w-md xl:p-0  shadow-md shadow-gray-500">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create a Doctor
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">
                    Doctor's name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter...."
                    required=""
                    value={doc_name}
                    onChange={(e) => setDocName(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  class="w-full bg-blue-500 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md shadow-gray-500"
                  onClick={handler}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default admin;
