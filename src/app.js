import express from 'express';
import cors from 'cors';
import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationsController.recommendASong);
app.post('/recommendations/:id/upvote', recommendationsController.upvoteSong);

export default app;
