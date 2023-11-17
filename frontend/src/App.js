import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CourseManagement from "./components/CourseManagement";
import EditCourse from "./components/EditCourse";
import NavigationBar from "./components/NavigationBar";
import EnrolledCourses from "./components/EnrolledCourses";
import { selectIsLoggedIn, selectIsAdmin } from "./redux/authSlice";
import "./App.css";
import Cart from "./components/Cart";
import { login, logout } from "./redux/authSlice";
import UserProfile from "./components/UserProfile";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      dispatch(login({ userId, token }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        ) : isAdmin ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="/edit-course/:id" element={<EditCourse />} />{" "}
            {/* New route for editing courses */}
            <Route path="/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
