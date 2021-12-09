import paymentCompleted from "./paymentCompleted";

const EventHandler = (message: any) => {
  switch (message.type) {
    case "ORDER_PAYMENT_COMPLETED":
      paymentCompleted(message);
      break;

    default:
      break;
  }
};
export default EventHandler;
