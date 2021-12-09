import Producer from "../../brokers/rabbitMq/rabbitHandle/routes";

export default (data) => {
  /** Database Layer Logic Comes Here  */
  try {
    console.log("data", data);
    Producer({
      topic: "ORDER_CREATION_TRANSACTIONS",
      type: "PAYMENT_COMPLETED_STATE",
      payload: {
        transactionId: data.transactionId,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
