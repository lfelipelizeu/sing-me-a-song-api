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

describe('POST /recommendations/:id/upvote', () => {
    const song = createSong();

    beforeAll(async () => {
        const result = await connection.query('INSERT INTO musics (name, link) VALUES (\'Henrique e Juliano - Colega de Caso\', \'https://www.youtube.com/watch?v=6B5-c0EgvC4\') RETURNING *;');
        song.id = result.rows[0].id;
    });

    afterAll(async () => {
        await connection.query('DELETE FROM musics;');
    });

    it('return 400 for a string on id', async () => {
        const id = faker.random.word();
        const result = await agent.post(`/recommendations/${id}/upvote`);
        const { status } = result;
        expect(status).toEqual(400);
    });

    it('return 404 for invalid song id', async () => {
        const result = await agent.post(`/recommendations/${faker.datatype.number()}/upvote`);
        const { status } = result;
        expect(status).toEqual(404);
    });

    it('return 200 for valid song id', async () => {
        const result = await agent.post(`/recommendations/${song.id}/upvote`);
        const { status } = result;
        expect(status).toEqual(200);
    });
});
