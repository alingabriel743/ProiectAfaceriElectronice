import React, { useState, useEffect } from "react";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchUserCourses(userId);
  }, []);

  const fetchUserCourses = async (userId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const orders = await response.json();
        const userOrders = orders.filter((order) => order.user === userId);
        const courses = userOrders.flatMap((order) => order.courses);
        setEnrolledCourses(courses);
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Enrolled Courses</h1>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course._id}>{course.course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
