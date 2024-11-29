import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store.js";
import useFetch from "../hooks/fetch.hook.js";
import { updateTopics } from "../helper/helper.js";


export default function Topic() {

  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)  
  const userId = apiData?._id;
  console.log(userId);
  console.log(apiData)
  const formik = useFormik({
    initialValues: {
      sport: false,
      fashion: false,
      news: false,
    },

    onSubmit: async (values) => {
      console.log("User Topics:", values);
      const selectedTopics = Object.keys(values).filter(
        (topic) => values[topic]
      );

      console.log("User Topics:", selectedTopics);

      try {
        if (!userId) {
          throw new Error("User ID not available");
        }

        const response = await updateTopics(userId, selectedTopics);
        console.log(response.data);
        
        navigate("/home")
      } catch (error) {
        console.error("Error updating user topics:", error.error);
      }
    },
  });



  return (
<div className="container max-w-screen-2xl bg-gray-900 flex items-center justify-center h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen shadow-xl bg-gray-1100">
        <div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl text-white font-bold">Hello Again!</h4>
            <span className="py-4 text-white text-xl w-2/3 text-center ">
              Choose your preferred topics.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mx-auto">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="sports-checkbox"
                    type="checkbox"
                    name="sport"
                    checked={formik.values.sport}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="sports-checkbox"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sports
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="fashion-checkbox"
                    type="checkbox"
                    name="fashion"
                    checked={formik.values.fashion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="fashion-checkbox"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Fashion
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="news-checkbox"
                    type="checkbox"
                    name="news"
                    checked={formik.values.news}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="news-checkbox"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    News
                  </label>
                </div>
              </li>
            </ul>
            <p className="text-center mt-16">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Complete registration
                </span>
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}