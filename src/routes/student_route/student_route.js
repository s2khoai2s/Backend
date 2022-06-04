var express = require("express");
var router = express.Router();
const studentController = require("../../app/controllers/StudentController");
const ClassController = require("../../app/controllers/ClassController");
const CourseController = require("../../app/controllers/CourseController");
const departmentController = require("../../app/controllers/DepartmentController");
const Gen_point = require("../../app/controllers/helper/Gen_point");
const StudyresultController = require("../../app/controllers/StudyresultController");
const EthnicAndProvinceController = require("../../app/controllers/EthnicAndProvinceController");

router.get("/user/myaccount", studentController.myaccount);
router.put("/user/updatestudent/", studentController.updatestudent);

router.get("/class/finduser/:id", ClassController.findUserbyClass);
router.get("/class", ClassController.find);

router.post("/course/resign_course", CourseController.student_resign);
router.get("/course/findbyuser/:id", CourseController.findSchedulebyUser);
router.get("/course/findbycourse/:id", CourseController.findSchedulebyCourse);
router.get("/course", CourseController.getall);

router.get("/department", departmentController.find);

router.get("/checkin/:token", Gen_point.CheckPointLink);

router.get(
  "/studyresult/findbyuser/:id",
  StudyresultController.getResultbyUser
);
router.get(
  "/studyresult/findbycourse/:id",
  StudyresultController.getResultbyCourse
);

module.exports = router;
