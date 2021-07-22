class Listener {
  constructor(musicService, mailSender) {
    this._musicService = musicService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const music = await this._musicService.getMusicsByPlaylistId(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(music));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Listener;
