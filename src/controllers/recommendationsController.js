import * as recommendationsService from '../services/recommendationsService.js';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

async function recommendASong(req, res) {
    const { name, youtubeLink } = req.body;
    if (!name || !youtubeLink) return res.sendStatus(400);

    try {
        if (recommendationsService.newSongValidationError(req.body)) return res.sendStatus(400);

        const result = await recommendationsRepository.insertSong(req.body);
        if (result.rowCount === 0) return res.sendStatus(409);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function upvoteSong(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) return res.sendStatus(400);

    try {
        const updatedSong = await recommendationsRepository.updateSongScore(id, '+');
        if (!updatedSong) return res.sendStatus(404);

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function downvoteSong(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) return res.sendStatus(400);

    try {
        const updatedSong = await recommendationsRepository.updateSongScore(id, '-');
        if (!updatedSong) return res.sendStatus(404);
        if (updatedSong.score < -5) await recommendationsRepository.deleteSong(id);

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    recommendASong,
    upvoteSong,
    downvoteSong,
};
