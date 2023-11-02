const models = require("../models");
const fs = require('fs');
const saveFiles = async (req, res) => {
  const submission = {
    group_submitted_files_id: req.body.group_submitted_files_id,
    file_name: req.file.filename,
    is_deleted: 0
  };
  models.file
    .create(submission)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
        error: error,
      });
    });
  //  res.status(200).json(req.file.filename).end();
 
};

const updateFiles = async (req, res) => {
  const submission = {
    file_name: req.file.filename
  };
  models.file
    .update(submission,{
      where:{
        group_submitted_files_id:req.body.group_submitted_files_id
      }
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
        error: error,
      });
    });
  //  res.status(200).json(req.file.filename).end();
 
};

const getImage = (req, res) => {
  const fileName = req.params.fileName;
  const directoryPath = "./assets/images/"+fileName;
  console.log(directoryPath);
  fs.readFile(directoryPath, function (err, file) {
    console.log(file);
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    res.status(200).send(file);
  });
};

const download =async (req, res) => {
  const fileName = req.params.file_name;
  console.log(req.params);
  const directoryPath ="./assets/files/";

  await res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  saveFiles,
  getImage,
  download,
  updateFiles
};