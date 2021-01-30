import express from 'express';

import './database';

const app = express();

app.use(express.json());

// app.use('/api');

export default app;
