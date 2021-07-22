require('dotenv').config();
const amqp = require('amqplib');
const MusicService = require('./MusicService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const musicService = new MusicService();
  const mailSender = new MailSender();
  const listener = new Listener(musicService, mailSender);
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:music', {
    durable: true,
  });

  channel.consume('export:music', listener.listen, { noAck: true });
};
init();
