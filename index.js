import express from 'express';
import routes from './routes.js';

const app = express();

app.listen(process.env.PORT || 4000, () => console.log(`API is running on port ${process.env.PORT}` || 4000))
app.use('/', routes)