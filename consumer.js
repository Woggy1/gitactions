const amqp = require('amqplib');

async function receiveMessage() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'student.queue';

    await channel.assertQueue(queue, { durable: true });

    console.log(`[INFO] Очікування повідомлень у черзі: "${queue}"`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`[INFO] Повідомлення отримано:`, message);
        channel.ack(msg); // Підтвердження обробки повідомлення
      } else {
        console.log(`[WARNING] Черга пуста.`);
      }
    });
  } catch (err) {
    console.error('[ERROR] Помилка при отриманні повідомлення:', err);
  }
}

receiveMessage();
