const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusicApp',
      to: targetEmail,
      subject: 'Ekspor Music dari Playlist',
      text: 'Hasil dari ekspor music',
      attachments: [
        {
          filename: 'music.json',
          content,
        },
      ],
    };
    return this._transporter.sendMail(message);
  }
}
module.exports = MailSender;
