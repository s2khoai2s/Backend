const express = require("express");
const res = require("express/lib/response");
const Class = require("../../models/Class");
const Course = require("../../models/Course");
const Department = require("../../models/Department");
const User = require("../../models/User");
const Ethnic = require("../../models/Ethnic");
const Province = require("../../models/Province");
const Subject = require("../../models/Subject");

class convert {
  ConvertUser(userid) {
    return new Promise(function (resolve, reject) {
      if (userid) {
        User.findOne(
          {
            userid: userid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else {
        resolve(null);
      }
    });
  }

  ConvertClass(classid) {
    return new Promise(function (resolve, reject) {
      if (classid) {
        Class.findOne(
          {
            classid: classid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else resolve(null);
    });
  }

  ConvertCourse(courseid) {
    return new Promise(function (resolve, reject) {
      if (courseid) {
        Course.findOne(
          {
            courseid: courseid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else resolve(null);
    });
  }

  ConvertDepartment(departmentid) {
    return new Promise(function (resolve, reject) {
      if (departmentid) {
        Department.findOne(
          {
            departmentid: departmentid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else resolve(null);
    });
  }

  ConvertEthnic(ethnicid) {
    return new Promise(function (resolve, reject) {
      if (ethnicid) {
        Ethnic.findOne(
          {
            ethnicid: ethnicid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else resolve(null);
    });
  }

  ConvertProvince(provinceid) {
    return new Promise(function (resolve, reject) {
      if (provinceid) {
        Province.findOne(
          {
            provinceid: provinceid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else resolve(null);
    });
  }

  ConvertSubject(subjectid) {
    return new Promise(function (resolve, reject) {
      if (subjectid) {
        Subject.findOne(
          {
            subjectid: subjectid,
          },
          function (err, obj) {
            if (!err && obj) {
              resolve(obj._id);
            } else {
              reject(err);
            }
          }
        );
      } else {
        resolve(null);
      }
    });
  }
}

module.exports = new convert();
