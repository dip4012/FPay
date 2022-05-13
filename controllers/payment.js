const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_1VO00I2d5iYilB",
  key_secret: "bhakVUX8eKNxjbMArt09qLOm",
});

const createOrderId = async (req, res) => {
  console.log("create order request", req.body);
  var options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send({ orderId: order.id });
  });
};
