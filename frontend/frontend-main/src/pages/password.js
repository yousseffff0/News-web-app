import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate.js";
import { useAuthStore } from "../store/store.js";
import { verifyLogin } from "../helper/helper.js";
import axios from "axios";

import useFetch from "../hooks/fetch.hook.js";

import styles from "../styles/Username.module.css";

axios.defaults.baseURL = "http://localhost:3001";



export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  console.log(username);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  console.log(apiData)
  const personTypeId = apiData?.personTypeId;

  const formik = useFormik({
    initialValues: {
      password: "youssef@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        let loginPromise = verifyLogin({ username, password: values.password });
        toast.promise(loginPromise, {
          loading: 'Checking...',
          success: <b>Login Successfully...!</b>,
          error: <b>Password Not Match!</b>,
        });
  
  
        if (personTypeId === 1) {
          navigate('/home');
        } else if (personTypeId === 2) {
          navigate("/journalistArticles");
        }
        else if (personTypeId === 3) {
          navigate("/AdminPage");
        }
      } catch (error) {

        console.error("Error during login:", error);
      }
    },
  });
  
  return (
    <div class="container max-w-screen-2xl	bg-gray-900 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen shadow-xl bg-gray-1100">
        <div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl text-white font-bold">
              Hello {apiData?.firstName || apiData?.username}{" "}
            </h4>
            <span className="py-4 text-white text-xl w-2/3 text-center ">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <button
                type="submit"
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign In
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}