import amqp, { Connection, Channel } from "amqplib";

let connection: Promise<any>;
let channel: Promise<Channel>;
let queue: string;

const bindListeners = function bindListeners() {
  connection = new Promise((resolve, reject) => {
    amqp.connect(
      "amqp://localhost",
      (err, connection: Connection) => {
        if (err) reject(err);
        resolve(connection);
      }
    );
  });
};

const initializePubisher = () => {
  bindListeners();
};

/*
 * A Higher level producer which sends a message to a particular topic
 */
const PublisherService = function PublisherService() {
  initializePubisher();
};

PublisherService.prototype.createQueue = function createQueue(
  name: string
) {
  return connection.then((connection) => {
    return new Promise((resolve, reject) => {
      connection.createChannel((err, channel) => {
        if (err) reject(err);

        channel.assertQueue(name, {
          durable: false,
        });
        queue = name;
        resolve(channel);
      });
    });
  });
};

/*
 * Sends a message from the kafka instance
 **/
PublisherService.prototype.produce = function produce(
  topic,
  messages,
  partition = 0
) {
  // Returns data if pubisher success
  return channel.then((channel) => {
    const payload = [{ topic, messages, partition }];
    return new Promise((resolve, reject) => {
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(payload))
      );
    });
  });
};

export default PublisherService;
