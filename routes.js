import express from 'express'
import { index, processApi, generateApi, unknownRoute } from './Controllers/ApiController.js';

let app = express.Router()

app.get('/', index);
app.get('/cart/api/v1.0/fetch', processApi);
app.get('/dynamicimage/api/v1.0/generate', generateApi);

app.get('*', unknownRoute)
app.post('*', unknownRoute)

export default app