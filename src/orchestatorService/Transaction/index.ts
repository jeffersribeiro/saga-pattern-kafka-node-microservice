import OrderCreationTransactions from "./orderCreationTransaction";

const Transactions = (message: any) => {
  switch (message.topic) {
    case "ORDER_CREATION_TRANSACTIONS":
      OrderCreationTransactions(message);
      break;

    default:
      break;
  }
};

export default Transactions;
