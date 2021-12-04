import connection from '../database';

async function insertSong(body) {
    const { name, youtubeLink } = body;

    const result = await connection.query('INSERT INTO musics (name, link) VALUES ($1, $2) ON CONFLICT DO NOTHING;', [name, youtubeLink]);

    return result;
}

async function updateSongScore(id, type) {
    const result = await connection.query(`UPDATE musics SET score = score ${type} 1 WHERE id = $1;`, [id]);

    return result;
}

export {
    insertSong,
    updateSongScore,
};
