// Dependencies
const multer = require('multer');

// Multer Configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const uplodedFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uplodedFileName);
    },
});

const upload = multer({ storage });

// Export module
module.exports = upload;
