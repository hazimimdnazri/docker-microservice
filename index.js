import express from 'express';
import routes from './routes.js';

const app = express();

app.listen(process.env.PORT, () => console.log(`API is running on port ${process.env.PORT}`))
app.use('/', routes)