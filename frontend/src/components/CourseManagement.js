import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseManagement.css";
import { removeFromCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    instructor: { name: "", bio: "" },
    title: "",
    description: "",
    price: "",
    language: "",
    duration: "",
    skillLevel: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "instructorName" || name === "instructorBio") {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        instructor: {
          ...prevCourse.instructor,
          [name === "instructorName" ? "name" : "bio"]: value,
        },
      }));
    } else {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then((response) => response.json())
      .then((addedCourse) => {
        setCourses([...courses, addedCourse]);
        setNewCourse({
          instructor: { name: "", bio: "" },
          title: "",
          description: "",
          price: "",
          language: "",
          duration: "",
          skillLevel: "",
        });
      });
  };

  const handleRemoveCourse = (courseId) => {
    fetch(`http://localhost:8080/api/courses/${courseId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCourses(courses.filter((course) => course._id !== courseId));
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleEditCourse = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Course Management</h1>
      <div className="card card-body bg-light mb-4">
        <form onSubmit={handleAddCourse}>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="instructorName">Instructor Name</label>
              <input
                type="text"
                className="form-control"
                id="instructorName"
                name="instructorName"
                value={newCourse.instructor.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="instructorBio">Instructor Bio</label>
              <input
                type="text"
                className="form-control"
                id="instructorBio"
                name="instructorBio"
                value={newCourse.instructor.bio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={newCourse.language}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={newCourse.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={newCourse.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                value={newCourse.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="skillLevel">Skill Level</label>
              <input
                type="text"
                className="form-control"
                id="skillLevel"
                name="skillLevel"
                value={newCourse.skillLevel}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
        </form>
      </div>
      <div className="list-group">
        {courses.map((course) => (
          <div
            key={course.id}
            className="list-group-item list-group-item-action"
          >
            <div className="course-details">
              <div>
                <h5 className="course-title">{course.title}</h5>
                <p className="course-description">{course.description}</p>
                <small className="course-duration">
                  Duration: {course.duration}
                </small>
              </div>
              <div>
                <small className="course-price">Price: ${course.price}</small>
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary btn-sm mb-2"
                onClick={() => handleEditCourse(course._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  handleRemoveCourse(course._id);
                  dispatch(removeFromCart(course._id));
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
