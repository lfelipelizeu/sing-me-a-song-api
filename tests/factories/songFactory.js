import faker from 'faker';

function createSong() {
    const song = {
        name: faker.random.words(4),
        youtubeLink: 'https://youtu.be/dQw4w9WgXcQ',
    };

    return song;
}

export default createSong;
