require('./src/db/connection');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser =require('body-parser');

const routes = require('./src/routes/media');

const app = express();
app.use(bodyParser.json());
dotenv.config();
const port = process.env.PORT || 8000;

app.use('/api', routes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
});