import faker from 'faker';
import * as recommendationsService from '../../src/services/recommendationsService.js';
import createSong from '../factories/songFactory.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('recommendations', () => {
    it('should returns an error at validation fails', () => {
        const song = createSong();
        const invalidSong = {
            name: song.name,
            youtubeLink: faker.internet.url(),
        };

        const error = recommendationsService.newSongValidationError(invalidSong);
        expect(error).toBeTruthy();
    });

    it('should returns an error at validation successful', () => {
        const song = createSong();

        const error = recommendationsService.newSongValidationError(song);
        expect(error).toBeFalsy();
    });
});

describe('random song', () => {
    it('should return undefined for no songs on database', async () => {
        jest.spyOn(Math, 'floor').mockImplementationOnce(() => 5);
        jest.spyOn(recommendationsRepository, 'selectSongs').mockImplementation(() => []);

        const result = await recommendationsService.searchRandomSong();
        expect(result).toBeUndefined();
    });

    it('should return the song with good range', async () => {
        const song = createSong();
        song.id = 1;
        song.score = 15;

        jest.spyOn(Math, 'floor').mockImplementationOnce(() => 5);
        jest.spyOn(recommendationsRepository, 'selectSongs').mockImplementation(() => [song]);

        const result = await recommendationsService.searchRandomSong();
        expect(result).toEqual(song);
    });

    it('should return the song with bad range', async () => {
        const song = createSong();
        song.id = 1;
        song.score = 5;

        jest.spyOn(Math, 'floor').mockImplementationOnce(() => 0);
        jest.spyOn(recommendationsRepository, 'selectSongs').mockImplementationOnce(() => []);
        jest.spyOn(recommendationsRepository, 'selectSongs').mockImplementation(() => [song]);

        const result = await recommendationsService.searchRandomSong();
        expect(result).toEqual(song);
    });
});
