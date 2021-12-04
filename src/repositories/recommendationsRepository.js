import connection from '../database';

async function insertSong(body) {
    const { name, youtubeLink } = body;

    const result = await connection.query('INSERT INTO musics (name, link) VALUES ($1, $2) ON CONFLICT DO NOTHING;', [name, youtubeLink]);

    return result;
}

export {
    insertSong,
};
