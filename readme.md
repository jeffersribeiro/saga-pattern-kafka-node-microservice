# init

- KafkaBroker — it contains all the kafka producer, consumer and routes logic. All the services will be using this to publish and receive events from kafka.

- orchestatorService — it contains all the logics to implement the orchestration of saga pattern.

- orderService — this service will handle all the order business logics.

- paymentService — it will handles all the payment business logics.
