const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;

var storage = multer.diskStorage({
  destination:"./assets/files",
  filename: (req, file, cb) => {
    console.log("hhhh",file.originalname);
    cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
  },
});

var uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;