const express = require('express');
const uploadFunction = require('../middleware/imageUpload');
const { addMedia, updateMedia, deleteMedia, getMediaById, listMedia, listBuckets } = require('../controllers/media.controller');
const route = express.Router();

route.post('/media', uploadFunction, addMedia);
route.put('/media/:id', uploadFunction, updateMedia);
route.delete('/media/:id', deleteMedia);
route.get('/media/:id', getMediaById);
route.get('/media', listMedia);
route.get('/list-bucket', listBuckets);

module.exports = route;