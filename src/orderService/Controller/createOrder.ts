import uuidv1 from "uuid/v1";
import { Request, Response } from "express";

import OrderModel from "../Model/orderModel";
import Producer from "../../brokers/rabbitMq/rabbitHandle/routes";

const CreateOrder = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const itemCount = req.body.itemCount;
    const amount = req.body.amount;

    const order = await new OrderModel({
      name: name,
      itemCount: itemCount,
      transactionId: uuidv1(),
      status: "PENDING",
    });

    await order.save();

    res.send(order);

    Producer({
      topic: "ORDER_CREATION_TRANSACTIONS",
      type: "ORDER_CREATED",
      payload: {
        data: {
          id: order._id,
          transactionId: order.transactionId,
          amount: amount,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default CreateOrder;
