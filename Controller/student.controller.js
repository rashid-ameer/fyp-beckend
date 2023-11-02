const models = require("../models");

function saveStudent(req, res) {
  console.log("body", req.body.image);
  console.log("file", req.file);
  const batch = req.body.batch;
  const student = {
    id: "",
    user_id: req.body.user_name,
    batch_id: req.body.batch_id,
    is_deleted: 0,
  };
  const user = {
    user_name: req.body.user_name,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    // imgUrl: req.body.imgUrl,
    imgUrl: req.file
      ? "http://localhost:8080/File/getImage/" + req.file.filename
      : null,
    isActive: req.body.isActive,
    is_varified: req.body.is_varified,
    department_id: req.body.department_id,
    is_deleted: 0,
    role_id: req.body.role_id,
  };
  models.user
    .create(user)
    .then((header) => {
      res.status(200).json(header);
      student.id = header.id;
      models.student.create(student);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
        error: error,
      });
    });
}

function showAllStudentsInBatch(req, res) {
  models.batch
    .findAll({
      include: "students",
      where: {
        batch: req.body.batch,
        //is_deleted: 0
      },
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showAllStudents(req, res) {
  models.student
    .findAll({
      include: "user",
      where: {
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showStudentByCMS(req, res) {
  models.student
    .findAll({
      include: "user",
      where: {
        id: req.body.id,
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}


function updateStudent(req, res) {
  models.student
    .update(
      {
        user_id: req.body.user_name,
        batch_id: req.body.batch_id,
      },
      {
        where: {
          id: req.body.id,
          user_id: req.body.user_name,
          is_deleted: 0,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      models.user.update(
        {
          user_name: req.body.user_name,
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
          imgUrl: req.file
          ? "http://localhost:8080/File/getImage/" + req.file.filename
          : null,
          isActive: req.body.isActive,
          is_varified: req.body.is_varified,
          role_id: req.body.role_id,
          department_id: req.body.department_id,
        },
        {
          where: {
            id: req.body.id,
            user_name: req.body.user_name,
            is_deleted: 0,
          },
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function deleteStudent(req, res) {
  models.student
    .update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id: req.body.id,
          user_id: req.body.user_name,
          is_deleted: 0,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      models.user.update(
        {
          is_deleted: 1,
        },
        {
          where: {
            id: req.body.id,
            user_name: req.body.user_name,
            is_deleted: 0,
          },
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

module.exports = {
  saveStudent,
  showAllStudentsInBatch,
  showAllStudents,
  showStudentByCMS,
  updateStudent,
  deleteStudent,
};
