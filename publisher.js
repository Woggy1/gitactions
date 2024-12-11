const amqp = require('amqplib');

async function sendMessage() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'student.queue';

    const message = {
      text: 'Hello, RabbitMQ!',
      timestamp: new Date().toISOString(),
    };

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`[INFO] Повідомлення відправлено:`, message);

    setTimeout(() => {
      connection.close();
      console.log('[INFO] З’єднання з RabbitMQ закрито.');
    }, 500);
  } catch (err) {
    console.error('[ERROR] Помилка при відправленні повідомлення:', err);
  }
}

sendMessage();
