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

export {
    recommendASong,
};
