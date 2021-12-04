import express from 'express';
import cors from 'cors';
import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationsController.recommendASong);
app.post('/recommendations/:id/upvote', recommendationsController.upvoteSong);
app.post('/recommendations/:id/downvote', recommendationsController.downvoteSong);
app.get('/recommendations/random', recommendationsController.getRandomSong);
app.get('/recommendations/top/:amount', recommendationsController.getTopSongs);

export default app;
