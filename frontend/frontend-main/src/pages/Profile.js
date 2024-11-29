import React, { useState } from "react";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate.js";
import convertToBase64 from "../helper/convert.js";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import useFetch from "../hooks/fetch.hook.js";
import { useAuthStore } from "../store/store.js";
import { updateUser } from "../helper/helper.js";


export default function Profile() {
  const [file, setFile] = useState();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)  
  const userId = apiData?._id;  console.log("Profile data ",userId);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: apiData?.email || "Email ",
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile || "" });
      try {
        const response = await updateUser(userId, values);
        console.log(response.data);
        toast.success("Profile Updated Successfully!");
        navigate("/topic");
      } catch (error) {
        console.error("Error updating user profile:", error.response?.data?.error || "Unknown error");
        toast.error("Could not Update Profile!");
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div class="container max-w-screen-2xl	 bg-gray-900 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen shadow-xl  bg-gray-1100">
        <div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl text-white  font-bold">Hello Again!</h4>
            <span className="py-4 text-white text-xl w-2/3 text-center ">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10"></div>

              <input
                {...formik.getFieldProps("email")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="email"
              />

              <button
                type="submit"
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Update account
                </span>
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <button onClick={userLogout} className="text-blue-500" to="/">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
