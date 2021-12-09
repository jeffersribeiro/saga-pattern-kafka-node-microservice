import { UpdateQuery } from "mongoose";
import orderModel from "../Model/orderModel";

export default async (message) => {
  try {
    const transactionId = message.payload.transactionId;
    const filter = { transactionId: transactionId };
    const update = {
      status: "PAYMENT_COMPLETED",
    } as unknown as UpdateQuery<any>;

    const order = await orderModel.updateOne(filter, update, {
      new: true,
    });
  } catch (e) {
    console.log(e);
  }
  //Payment Completed Status Updated on Order Service
};
