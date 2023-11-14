const paypalClient = require("../utils/paypal-client");
const paypal = require("@paypal/checkout-server-sdk");
const Payment = require("../models/payment");
const Order = require("../models/order");

exports.createPayPalOrder = async (req, res, next) => {
  let request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "AUTHORIZE",
    purchase_units: [
      {
        reference_id: req.body.orderId,
        amount: {
          currency_code: "USD",
          value: req.body.amount,
        },
      },
    ],
    redirect_urls: {
      return_url: "https://your-return-url.com/success",
      cancel_url: "https://your-return-url.com/cancel",
    },
  });

  try {
    const response = await paypalClient.client().execute(request);

    const approvalUrl = response.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      orderID: response.result.id,
      approvalUrl,
    });
  } catch (error) {
    next(error);
  }
};

exports.capturePayPalOrder = async (req, res, next) => {
  let request = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.client().execute(request);

    const payment = new Payment({
      order: req.body.orderId,
      status: "Completed",
      amount: req.body.amount,
      transactionId: capture.result.purchase_units[0].payments.captures[0].id,
      method: "PayPal",
    });
    await Order.findByIdAndUpdate(req.body.orderId, { status: "Completed" });
    await payment.save();

    res.status(200).json({
      status: capture.result.status,
      order: capture.result.id,
      payment,
    });
  } catch (error) {
    next(error);
  }
};
