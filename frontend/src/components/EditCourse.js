import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [course, setCourse] = useState({
    instructor: { name: "", bio: "" },
    title: "",
    description: "",
    price: "",
    language: "",
    duration: "",
    skillLevel: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("instructor")) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        instructor: {
          ...prevCourse.instructor,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then(() => navigate("/course-management"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5">
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={course.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={course.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={course.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            value={course.language}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level</label>
          <input
            type="text"
            className="form-control"
            id="skillLevel"
            name="skillLevel"
            value={course.skillLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor.name">Instructor Name</label>
          <input
            type="text"
            className="form-control"
            id="instructor.name"
            name="instructor.name"
            value={course.instructor.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor.bio">Instructor Bio</label>
          <input
            type="text"
            className="form-control"
            id="instructor.bio"
            name="instructor.bio"
            value={course.instructor.bio}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
