const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  bucketName: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true,
  }, 
}, {
  timestamps: true  
});

const media = new mongoose.model('media', mediaSchema);

module.exports = media;