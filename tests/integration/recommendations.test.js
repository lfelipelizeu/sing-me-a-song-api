import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../src/app.js';
import createSong from '../factories/songFactory.js';
import connection from '../../src/database.js';

const agent = supertest(app);

describe('POST /recommendations', () => {
    const song = createSong();

    beforeAll(async () => {
        await connection.query('INSERT INTO musics (name, link) VALUES (\'Henrique e Juliano - Colega de Caso\', \'https://www.youtube.com/watch?v=6B5-c0EgvC4\');');
    });

    afterAll(async () => {
        await connection.query('DELETE FROM musics;');
    });

    it('returns 400 for invalid body', async () => {
        const body = {
            name: song.name,
        };

        const result = await agent.post('/recommendations').send(body);
        const { status } = result;
        expect(status).toEqual(400);
    });

    it('returns 400 for invalid youtube link', async () => {
        const body = {
            name: song.name,
            youtubeLink: faker.internet.url(),
        };

        const result = await agent.post('/recommendations').send(body);
        const { status } = result;
        expect(status).toEqual(400);
    });

    it('returns 409 for repeated link', async () => {
        const body = {
            name: 'Repetido',
            youtubeLink: 'https://www.youtube.com/watch?v=6B5-c0EgvC4',
        };

        const result = await agent.post('/recommendations').send(body);
        const { status } = result;
        expect(status).toEqual(409);
    });

    it('returns 201 for valid data', async () => {
        const body = song;

        const result = await agent.post('/recommendations').send(body);
        const { status } = result;
        expect(status).toEqual(201);
    });
});
