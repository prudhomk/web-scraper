import pool from '../utils/pool.js';

export default class Video {
    id;
    title;
    media;


    static async insert({ title, media }) {
      const { rows } = await pool.query(
        'INSERT INTO videos (title, media) VALUES ($1, $2) RETURNING *',
        [title, media]
      );

      return new Video(rows[0]);
    }
}
