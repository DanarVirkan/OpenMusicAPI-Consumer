const { Pool } = require('pg');

class MusicService {
  constructor() {
    this._pool = new Pool();
  }

  async getMusicsByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.* FROM playlists_songs LEFT JOIN songs ON song_id = songs.id WHERE playlist_id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
module.exports = MusicService;
