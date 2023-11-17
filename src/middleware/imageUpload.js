const path = require('path');
const multer = require('multer');

const dynamicDestination = (req, file, cb) => {
  const folderName = req.body.bucketName; 
  const destination = path.join(__dirname, `../../upload/${folderName}`);
  
  require('fs').mkdirSync(destination, { recursive: true });

  cb(null, destination);
};

const storage = multer.diskStorage({
    destination: dynamicDestination,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage: storage
}).single('images');