import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, removeFromCart, clearCart } from "../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [order, setOrder] = useState(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const token = localStorage.getItem("token");

  const handleRemoveFromCart = (id) => {
    if (!isProcessingOrder) {
      dispatch(removeFromCart(id));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handlePlaceOrderClick = () => {
    setIsProcessingOrder(true);
    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courses: cartItems.map((item) => ({
          course: item._id,
          price: item.price,
        })),
        totalPrice: totalPrice,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        setOrder(orderData);
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        toast.error(
          "There was an issue creating your order. Please try again."
        );
      });
  };

  const handleCancelOrderClick = () => {
    if (order) {
      fetch(`http://localhost:8080/api/orders/${order._id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(() => {
          setOrder(null);
          setIsProcessingOrder(false);
          toast.info("Order cancelled successfully.");
        })
        .catch((error) => {
          toast.error(
            "There was an issue cancelling your order. Please try again."
          );
        });
    } else {
      setIsProcessingOrder(false);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/paypal/order/capture",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderID: data.orderID,
            orderId: order._id,
            amount: totalPrice.toFixed(2),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseDetails = await response.json();
      dispatch(clearCart());
      console.log("Payment was successful!", responseDetails);
      toast.success("Thank you for your purchase!");
    } catch (error) {
      console.error("Payment capture error:", error);
      toast.error(
        "There was an issue finalizing your payment. Please contact support."
      );
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Ab23lAPDvLsAV3rKb3LNGK6E2M3K-ir7oAQsca4XrO4pSMqhwjKoS4npOEZKAQyV7qce468WdkvGwm26",
        currency: "USD",
      }}
    >
      <div className="container mt-5">
        <h2 className="text-center">Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <>
            <ul className="list-group">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-1">Price: ${item.price}</p>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                    disabled={isProcessingOrder}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="total-section text-right mt-3">
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
              {isProcessingOrder && !order ? (
                <button
                  className="btn btn-warning"
                  onClick={handleCancelOrderClick}
                >
                  Cancel Order
                </button>
              ) : (
                !order && (
                  <button
                    className="btn btn-primary"
                    onClick={handlePlaceOrderClick}
                  >
                    Place Order
                  </button>
                )
              )}
              {order && (
                <>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: totalPrice.toFixed(2) },
                          },
                        ],
                      });
                    }}
                    onApprove={onApprove}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={handleCancelOrderClick}
                  >
                    Cancel Order
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
      <ToastContainer />
    </PayPalScriptProvider>
  );
};

export default Cart;
