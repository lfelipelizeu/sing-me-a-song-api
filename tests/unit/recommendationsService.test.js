import faker from 'faker';
import * as recommendationsService from '../../src/services/recommendationsService.js';
import createSong from '../factories/songFactory.js';

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
