import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsAdmin, logout } from "../redux/authSlice";
import { selectCartItems } from "../redux/cartSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons"; // Ensure you import faUser icon
import "../styles/NavigationBar.css";

const NavigationBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = localStorage.getItem("username");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Bit-Cu-Bit
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/course-management">
                    Course Management
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/enrolled-courses">
                  Enrolled Courses
                </Link>
              </li>
              {/* Profile Link */}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartItems.length > 0 && (
                    <span className="badge badge-pill badge-danger">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {isLoggedIn && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item align-self-center mr-2">
              Welcome, {userName}
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
