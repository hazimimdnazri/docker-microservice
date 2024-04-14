import express from 'express'
import { index, processApi, unknownRoute } from './Controllers/ApiController.js';

let app = express.Router()

app.get('/', index);
app.get('/cart/api/v1.0/fetch', processApi);
app.get('*', unknownRoute)
app.post('*', unknownRoute)

export default app