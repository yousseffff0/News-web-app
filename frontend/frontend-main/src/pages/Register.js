import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { validateRegister } from "../helper/validate.js";
import convertToBase64 from "../helper/convert.js";
import { registerUser } from "../helper/helper.js";
import styles from "../styles/Username.module.css";

import { useAuthStore } from "../store/store.js";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      email: "doyol56239@cnogs.com",
      username: "example123",
      password: "admin@123",
    },
    validate: validateRegister,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      setUsername(values.username);

      toast.promise(
        registerPromise,
        {
          loading: "Creating...",
          success: (response) => {
            console.log("Registration successful:", response);
            navigate("/topic");
            return <b>Register Successfully...!</b>;
          },
          error: (error) => {
            console.error("Registration failed:", error);

            console.log("Request payload:", values);
            return <b>Could not Register.</b>;
          },
        },
        {
          style: {
            minWidth: "250px",
            duration: 200,
          },
        }
      );
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

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

          <form className=" max-w-6xl" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>

              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUpload}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password*"
              />
              <button
                type="submit"
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Register
                </span>
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link className="text-blue-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
