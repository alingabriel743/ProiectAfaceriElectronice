import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await fetch(
          "http://localhost:8080/api/courses"
        );
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        }
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const ordersResponse = await fetch(
          "http://localhost:8080/api/orders/myorders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          const enrolledCourses = ordersData
            .filter(
              (order) => order.user === userId && order.status === "Completed"
            )
            .flatMap((order) => order.courses);
          setEnrolledCourseIds(
            enrolledCourses.map((course) => course.course._id)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Course Dashboard</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-md-4 mb-4">
            <CourseCard
              course={course}
              isEnrolled={enrolledCourseIds.includes(course._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
