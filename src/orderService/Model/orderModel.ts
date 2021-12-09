import Mongoose from "mongoose";

const orderSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    itemCount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model("Order", orderSchema);
