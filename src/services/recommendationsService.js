import joi from 'joi';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

function newSongValidationError(body) {
    const songSchema = joi.object({
        name: joi.string().trim().min(1).max(100)
            .required(),
        youtubeLink: joi.string().regex(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s?]+)/).required(),
    });

    const { error } = songSchema.validate(body);

    return error;
}

async function searchRandomSong() {
    const random = Math.floor(Math.random() * 10);
    const scoreRange = random <= 2 ? 'bad' : 'good';

    const songList = await recommendationsRepository.selectSongs({ scoreRange });

    if (songList.length > 0) return songList[Math.floor(Math.random() * songList.length)];

    const newSongList = await recommendationsRepository.selectSongs({ scoreRange: scoreRange === 'bad' ? 'good' : 'bad' });

    return newSongList[Math.floor(Math.random() * newSongList.length)];
}

export {
    newSongValidationError,
    searchRandomSong,
};
