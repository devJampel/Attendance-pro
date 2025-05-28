import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'; // Make sure Axios is installed and imported
import { Link } from 'react-router-dom';

import logo from '../image/logo.png';

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored"
  };

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await Axios.get("http://localhost:4000/api/v1/users");
        if (res.data.status === "success") {
          setUsers(res.data.data);
        }
      } catch (err) {
        window.alert("CONNECTION ERROR");
        console.log(err);
      }
    };
    fetchusers();
  }, []);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,})+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setPasswordValid(validatePassword(passwordValue));
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValid && passwordValid) {
      toast.info("Processing...", toastOption);
      const user = users.find(user => user.email === email);
      if (user) {
        if (user.is_active === false) {
          toast.error("Your account is not active!", toastOption);
          return;
        }
      }
      try {
        const res = await Axios.post("http://localhost:3001/routes/auth/login", {
          email,
          password
        });
        if (res.data.status === "success") {
          const obj = res.data.data.user;
          document.cookie = `token=${JSON.stringify(obj)}; SameSite=None; secure=true; path=/`;
          toast.success("Logged in successfully", toastOption);
          setTimeout(() => {
            window.location.assign(`/${obj.role}`);
          }, 1500);
        }
      } catch (err) {
        toast.error("Error: Incorrect email or password", toastOption);
      }
    } else {
      toast.error("Form cannot be submitted!", toastOption);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 left-0 p-4">
        <img src={logo} alt="" style={{ height: "5rem", width: "7rem" }} />
      </div>
      <div className="flex items-center justify-center h-screen m-4">
        <div className="p-4 border-2 border-gray-200 shadow-lg rounded-lg dark:border-gray-800 max-w-md w-full">
          <h2 className="text-center font-bold" style={{ marginTop: "3rem", marginBottom: "4rem", fontSize: "2rem" }}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative ms-5 me-5 mt-3 mb-5">
              <input
                type="text"
                id="email"
                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
            </div>
            <div className="relative ms-5 me-5" style={{ marginTop: "3rem", marginBottom: "1rem" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
              />
              <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
              <button type="button" data-hs-toggle-password='{ "target": "#password" }' className="absolute top-2 end-2 p-3.5 rounded-e-md" onClick={togglePasswordVisibility}>
                <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path className={showPassword ? "hidden" : ""} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path className={showPassword ? "hidden" : ""} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path className={showPassword ? "hidden" : ""} d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line className={showPassword ? "hidden" : ""} x1="2" x2="22" y1="2" y2="22"></line>
                  <path className={showPassword ? "" : "hidden"} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle className={showPassword ? "" : "hidden"} cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center ">
              <button className="text-white border-2 font-bold rounded-lg p-3 bg-indigo-500 w-full md:w-auto" style={{ width: "91%", marginTop: "3rem" }} type="submit">Sign In</button>
            </div>
            <div className="flex mt-5 mb-5 ms-6">
              <Link to="/forgotpassword"className="text-blue-600" style={{ marginBottom: "2rem" }}>Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignInForm;