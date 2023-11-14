import React from "react";
import "../styles/CourseCard.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const CourseCard = ({ course, isEnrolled }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(course));
  };
  return (
    <div className="card course-card mb-4 shadow-sm">
      <div className="card-body">
        <div style={{ float: "right" }}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={isEnrolled ? "text-success" : "text-muted"}
          />
          <span
            className={isEnrolled ? "text-success" : "text-muted"}
            style={{ marginLeft: "5px" }}
          >
            {isEnrolled ? "Enrolled" : "Not Enrolled"}
          </span>
        </div>
        <h3 className="card-title">{course.title}</h3>
        <h5 className="card-subtitle mb-2 text-muted">
          Instructor: {course.instructor.name}
        </h5>
        <p className="card-text">{course.description}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Duration: {course.duration}</li>
          <li className="list-group-item">Language: {course.language}</li>
          <li className="list-group-item">Price: ${course.price}</li>
          <li className="list-group-item">Level: {course.skillLevel}</li>
        </ul>
        <button
          className={`btn ${isEnrolled ? "btn-secondary" : "btn-primary"}`}
          onClick={handleAddToCart}
          disabled={isEnrolled}
        >
          <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
