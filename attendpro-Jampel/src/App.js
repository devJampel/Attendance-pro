import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Guest Resource
import LandingPage from "./View/LandingPage";
import SignInForm from "./View/SignInForm";
import ForgotPassword from "./View/forgetpassword";
import ResetPassword from "./View/resetpassword";

// Admin Resource
import Dashboard from "./Component/Admin/Dashboard";
import Tutor from "./Component/Admin/Tutor";
import Student from "./Component/Admin/Student";
import AcademicUnit from "./Component/Admin/Academic_Units";
import AdminSetting from "./Component/Admin/AdminSetting";

// Tutor Resource
import TutorDashboard from "./Component/Tutor/TutorDashboard";
import MyModule from "./Component/Tutor/MyModule";
import Notification from "./Component/Tutor/Notification";
import TutorSetting from "./Component/Tutor/TutorSetting";
import GenerateQRCode from "./Component/Tutor/GenerateQRCode";

// Student Resource
import StudentDashboard from "./Component/Student/StudentDashboard";
import Module from "./Component/Student/Modules";
import MyModules from "./Component/Student/MyModules";
import ViewAttendance from "./Component/Student/ViewAttendance";
import MarkAttendance from "./Component/Student/MarkAttendance";
import StudentSetting from "./Component/Student/StudentSetting";


function App() {
  let obj = null;
  if (document.cookie.indexOf("token=") !== -1) {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (token) {
      obj = JSON.parse(decodeURIComponent(token));
    }
  }

  return (
    //  <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword/>} />

        {obj && obj.role === "admin" && (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/tutor" element={<Tutor />} />
            <Route path="/admin/student" element={<Student />} />
            <Route path="/admin/academicunit" element={<AcademicUnit />} />
            <Route path="/admin/adminsetting" element={<AdminSetting />} />
          </>
        )}

        {obj && obj.role === "teacher" && (
          <>
            <Route path="/teacher" element={<TutorDashboard />} />
            <Route path="/teacher/mymodule" element={<MyModule />} />
            <Route path="/teacher/notification" element={<Notification />} />
            <Route path="/teacher/genQRcode" element={<GenerateQRCode />} />
            <Route path="/teacher/teacherSetting" element={<TutorSetting />} />
            <Route path="/teacher/MedicalReport" element={<Notification />} />
          </>
        )}

        {obj && obj.role === "student" && (
          <>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/modules" element={<Module />} />
            <Route path="/student/myModules" element={<MyModules />} />
            <Route path="/student/viewAttendance/:moduleId" element={<ViewAttendance />} /> 
            <Route path="/student/markAttendance" element={<MarkAttendance />} />
            <Route path="/student/studentSetting" element={<StudentSetting />} />
          </>
        )}
      </Routes>
    // </Router>
  );
}

export default App;