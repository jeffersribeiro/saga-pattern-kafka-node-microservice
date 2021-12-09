import Producer from "./rabbitHandle/Publisher";

const producer = new Producer();

producer
  .createQueue("hello")
  .then((res) => res)
  .catch((err) => {
    console.log(`Error ${err}`);
  });
