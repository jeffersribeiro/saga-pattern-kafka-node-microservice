import Consumer from "../brokers/rabbitMq/rabbitHandle/Consumer";
import eventHandler from "./eventHandle";
try {
  const consumer = new Consumer("defaultTopic");

  consumer.addTopics(["PAYMENT_SERVICE"]).then(() => {
    consumer.consume((message) => {
      console.log("consumed message", message);
      eventHandler(JSON.parse(message.value));
    });
  });

  console.log("Payment service Started Successfully");
} catch (e) {
  console.log(`Orchestrator Error ${e}`);
}
