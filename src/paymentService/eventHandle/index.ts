import executePayment from "./executePayment";

export default (message: any) => {
  switch (message.topic) {
    case "EXECUTE_PAYMENT":
      executePayment(message.payload);
      break;

    default:
      break;
  }
};
