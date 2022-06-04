var express = require("express");
var router = express.Router();
const studentController = require("../../app/controllers/StudentController");
const ClassController = require("../../app/controllers/ClassController");
const CourseController = require("../../app/controllers/CourseController");
const departmentController = require("../../app/controllers/DepartmentController");
const Gen_point = require("../../app/controllers/helper/Gen_point");
const StudyresultController = require("../../app/controllers/StudyresultController");
const EthnicAndProvinceController = require("../../app/controllers/EthnicAndProvinceController");

router.get("/user/find", studentController.finduser);
router.get("/user/myaccount", studentController.myaccount);
router.post("/user/adduser", studentController.adduser);
router.put("/user/:id", studentController.updateadmin);
router.delete("/user/:id", studentController.delete);
router.get("/user/:id", studentController.user);
router.get("/user", studentController.getuser);

router.post("/class/addclass", ClassController.addclass);
router.post("/class/finduser", ClassController.findUserbyClass);
router.delete("/class/:id", ClassController.delete);
router.put("/class/:id", ClassController.updateadmin);
router.get("/class", ClassController.find);

router.post("/course/addcourse", CourseController.addcourse);
router.get("/course/findbyuser/:id", CourseController.findSchedulebyUser);
router.get("/course/findbycourse/:id", CourseController.findSchedulebyCourse);
router.delete("/course/:id", CourseController.delete);
router.put("/course/:id", CourseController.updateadmin);
router.get("/course", CourseController.getall);

router.post("/department/adddepartment", departmentController.adddepartment);
router.delete("/department/:id", departmentController.delete);
router.put("/adddepartment/:id", departmentController.updateadmin);
router.get("/department", departmentController.find);

router.post("/getlink", Gen_point.GetPointLink);

router.get(
  "/studyresult/findbyuser/:id",
  StudyresultController.getResultbyUser
);
router.get(
  "/studyresult/findbycourse/:id",
  StudyresultController.getResultbyCourse
);
router.post(
  "/studyresult/changeresult/:id",
  StudyresultController.ChangeResult
);

router.post("/Ethnic/add", EthnicAndProvinceController.addEthnic);
router.delete("/Ethnic/:id", EthnicAndProvinceController.removeEthnic);
router.put("/Ethnic/:id", EthnicAndProvinceController.updateEthnic);

router.post("/Province/add", EthnicAndProvinceController.addProvince);
router.delete("/Province/:id", EthnicAndProvinceController.removeProvince);
router.put("/Province/:id", EthnicAndProvinceController.updateProvince);

module.exports = router;
