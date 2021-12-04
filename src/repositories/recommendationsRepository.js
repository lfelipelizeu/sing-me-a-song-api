import connection from '../database.js';

async function insertSong(body) {
    const { name, youtubeLink } = body;

    const result = await connection.query('INSERT INTO musics (name, link) VALUES ($1, $2) ON CONFLICT DO NOTHING;', [name, youtubeLink]);

    return result;
}

async function updateSongScore(id, type) {
    const result = await connection.query(`UPDATE musics SET score = score ${type} 1 WHERE id = $1 RETURNING *;`, [id]);

    return result.rows[0];
}

async function deleteSong(id) {
    await connection.query('DELETE FROM musics WHERE id = $1;', [id]);
}

async function selectSongs(params) {
    const amount = params?.amount;
    const scoreRange = params?.scoreRange;

    let query = 'SELECT id, name, link as "youtubeLink", score FROM musics';

    if (scoreRange === 'bad') query += ' WHERE score <= 10';
    if (scoreRange === 'good') query += ' WHERE score > 10';

    if (amount) query += ` ORDER BY score ASC LIMIT ${amount}`;

    const result = await connection.query(`${query};`);
    const songs = result.rows;

    return songs;
}

export {
    insertSong,
    updateSongScore,
    deleteSong,
    selectSongs,
};
