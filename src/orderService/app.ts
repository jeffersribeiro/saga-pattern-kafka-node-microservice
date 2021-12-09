import express from "express";
import mongoose from "mongoose";

import Consumer from "../brokers/rabbitMq/rabbitHandle/Consumer";
import eventHandler from "./eventHandler";
import CreateOrder from "./Controller/createOrder";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/saga-pattern-db-example")
  .then((data) => {
    app.post("/createorder", CreateOrder);

    const PORT = 4444;

    app.listen(PORT, () => {
      console.log("server is running on port 4444");
    });

    const consumer = new Consumer("defaultTopic");

    consumer
      .addTopics(["ORDER_SERVICE", "SERVICE_REPLY"])
      .then(() => {
        consumer.consume((message) => {
          console.log("consumed message", message);
          eventHandler(JSON.parse(message));
        });
      });
  })
  .catch((err) => {
    console.log(`Error in Mongo Connection ${err}`);
  });
