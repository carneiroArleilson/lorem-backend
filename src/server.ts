import "reflect-metadata";

import app from './index';
import cors from 'cors';

app.use(cors());

app.listen(3333, () => {
  console.log('Server Started!');
});
