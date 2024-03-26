const express = require("express");
const bodyParser = require("body-parser");
const roleRouter = require("./Router/Role");
const userRouter = require("./Router/User");
const loginRouter = require("./Router/Login");
const batchRouter = require("./Router/Batch");
const studentRouter = require("./Router/Student");
const departmentRouter = require("./Router/Department");
const supervisorRouter = require("./Router/Supervisor");
const permissionRouter = require("./Router/Permission");
const announcementRouter = require("./Router/Announcement");
const permission_roleRouter = require("./Router/Permission_role");
const notification_queueRouter = require("./Router/Notification_queue");
const groupRouter = require("./Router/Group");
const report_typeRouter = require("./Router/Report_type");
const assigned_WorkRouter = require("./Router/AssignedWork");
const filesUploadRouter = require("./Router/File");
const groupSubmittedFileRouter = require("./Router/Group_submittedFiles");
const attendanceRouter = require("./Router/Attendance");
const meetingRouter = require("./Router/Meeting");
const committeeRouter = require("./Router/Committee");
const ploRouter = require("./Router/Plo");
const rubricTypeRouter = require("./Router/RubricType");

const app = express();
const cors = require("cors");
global.__basedir = __dirname;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use("/Student", studentRouter);
app.use("/Login", loginRouter);
app.use("/Role", roleRouter);
app.use("/User", userRouter);
app.use("/Batch", batchRouter);
app.use("/Department", departmentRouter);
app.use("/Supervisor", supervisorRouter);
app.use("/Permission", permissionRouter);
app.use("/Permission_role", permission_roleRouter);
app.use("/Announcement", announcementRouter);
app.use("/Group", groupRouter);
app.use("/Notification", notification_queueRouter);
app.use("/ReportType", report_typeRouter);
app.use("/AssignedWork", assigned_WorkRouter);
app.use("/File", filesUploadRouter);
app.use("/saveGroupFiles", groupSubmittedFileRouter);
app.use("/Meeting", meetingRouter);
app.use("/Attendance", attendanceRouter);
app.use("/Committee", committeeRouter);
app.use("/Plo", ploRouter);
app.use("/RubricType", rubricTypeRouter);

module.exports = app;
