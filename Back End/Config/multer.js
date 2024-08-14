const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        
        return cb(null, path.join(__dirname, "../uploads/images"))

    },
    filename: function (req, file, cb){
        
        return cb(null, `${Date.now()}_${file.originalname}`)

    }
})

const upload = multer({ storage: storage }).single("image")

module.exports = upload;