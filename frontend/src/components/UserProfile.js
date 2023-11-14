import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/authSlice";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`http://localhost:8080/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProfile(data);
    };

    const fetchOrders = async () => {
      const response = await fetch(
        `http://localhost:8080/api/orders/myorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setOrders(data);
    };

    if (userId && token) {
      fetchProfile();
      fetchOrders();
    }
  }, [userId, token]);

  return (
    <div className="user-profile-container">
      {profile && (
        <div className="profile-header">
          <h1>Profile</h1>
          <p>
            <strong>Name:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Account Created:</strong>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      <div>
        <h2>Orders</h2>
        {orders.length > 0 ? (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Purchase Date:</strong>{" "}
                  {new Date(order.purchaseDate).toLocaleString()}
                </p>
                <p>
                  <strong>Total Price:</strong> ${order.totalPrice}
                </p>
                <div>
                  <h3>Items:</h3>
                  <ul className="course-list">
                    {order.courses.map((item) => (
                      <li key={item.course._id} className="course-item">
                        <p>
                          <strong>Course Name:</strong> {item.course.title}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {item.course.description}
                        </p>
                        <p>
                          <strong>Price:</strong> ${item.course.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
