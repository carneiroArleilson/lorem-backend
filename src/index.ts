import express from 'express';
import router from './routes';
import cors from 'cors';

import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

export default app;
