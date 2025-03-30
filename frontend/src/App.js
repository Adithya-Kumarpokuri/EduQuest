import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChooseUser from './pages/ChooseUser';
import Homepage from './pages/Homepage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import Logout  from './pages/Logout';
import AdminProfile from './pages/admin/AdminProfile';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
const App = () => {
  const { currentRole } = useSelector(state => state.user);
  const userState = useSelector(state => state.user);
  console.log("User State:", userState);

  return (
    <Router>
      <Routes>
        {currentRole === null && (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />
            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />
            <Route path="/Adminregister" element={<AdminRegisterPage />} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
        )}
        </Routes>
{/* {currentRole === "Admin" && (
  <>
    <Route path="/Admin/dashboard/*" element={<AdminDashboard />} />
    <Route path="*" element={<Navigate to="/Admin/dashboard" />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/Admin/profile" element={<AdminProfile />} />
   </>
)} */}
     {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }
      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  );
};

export default App;
