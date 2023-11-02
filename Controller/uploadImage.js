const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;

var storage = multer.diskStorage({
  destination:"./assets/images",
  filename: (req, file, cb) => {
    console.log("hhhh",file.originalname);
    cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
  },
});

var uploadImages = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single('image');

let uploadFileMiddleware = util.promisify(uploadImages);
module.exports = uploadFileMiddleware;