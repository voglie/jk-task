const mongoose = require("mongoose");
const media = require('../models/media');
const { successResponse, errorResponse } = require("../utils");

const addMedia = async (req, res) => {
  try {
    const bucketName = req.body.bucketName;

    const images = bucketName+"/"+req.file.filename;
    const payload = {
      bucketName,
      images,
    };

    const newMedia = new media(payload);
    const insertMedia = await newMedia.save();

    console.log("media added successfully");
    return successResponse(req, res, 201, 'Media added sucessfully.', insertMedia);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const mediaData = await media.findOne({_id: id});
    console.log(mediaData)
    if(!mediaData) {
      return errorResponse(req, res, 'media with id not found', 404, { err: error });
    } 

    return successResponse(req, res, 200, 'Media fetched sucessfully.', mediaData);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const listMedia = async (req, res) => {
  try {
    const { bucketName } = req.body;
    const mediaData = await media.find({ bucketName: bucketName });
    if(!mediaData) {
      return errorResponse(req, res, 'Bucket is empty', 404, { err: error });
    } 

    return successResponse(req, res, 200, 'Media fetched sucessfully.', mediaData);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const mediaData = await media.findByIdAndDelete(id);

    if(!mediaData) {
      return errorResponse(req, res, 'media with id not found', 404, { err: mediaData });
    } 

    return successResponse(req, res, 200, 'Media deleted successfully.', media);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const images = bucketName+"/"+req.file.filename;
    const mediaData = await media.findByIdAndUpdate(id, {images: images});

    if(!mediaData) {
      return errorResponse(req, res, 'media with id not found', 404, { err: error });
    } 

    return successResponse(req, res, 200, 'Media updated successfully.', mediaData);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const listBuckets = async (req, res) => {
  try {
    const bucketNames = await media.distinct("bucketName");
    return successResponse(req, res, 200, 'Bucket list fetched successfully.', bucketNames);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

module.exports = { addMedia, updateMedia, deleteMedia, getMediaById, listMedia, listBuckets };
