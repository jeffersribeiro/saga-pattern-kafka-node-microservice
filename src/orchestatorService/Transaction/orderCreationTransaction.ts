import Producer from "../../brokers/rabbitMQ/rabbitHandle/routes";

export default (message: any) => {
  switch (message.type) {
    case "ORDER_CREATED":
      Producer({
        topic: "EXECUTE_PAYMENT",
        payload: {
          data: message.payload.data,
        },
      });
      break;
    case "PAYMENT_COMPLETED_STATE":
      Producer({
        topic: "",
        payload: {
          data: message.payload.data,
        },
      });
    default:
      break;
  }
};
