const res = require("express/lib/response");
const Course = require("../../models/Course");
const convert = require("./Convert");

class AddToCourse {
  AddStudentToCourse(courseid, studentsid) {
    var course_id = convert.ConvertCourse(courseid);
    for (i = 0; i < studentsid.length; i++) {
      var user_id = convert.ConvertUser(studentsid[i]);
      Course.findOneAndUpdate(
        {
          course_id: course_id,
        },
        {
          $push: {
            studentsdetail: {
              user_id: user_id,
              checkpoint: 0,
            },
          },
        }
      );
    }
  }

  AddScheduleToCourse(courseid, schedule) {
    var course_id = convert.ConvertCourse(courseid);
    for (i = 0; i < schedule.length; i++) {
      var schedule_Object = {
        start: schedule[i].start,
        end: schedule[i].end,
        Date: schedule[i].Date,
        Checked_in: [],
      };
      Course.findOneAndUpdate(
        {
          course_id: course_id,
        },
        {
          $push: { schedule: schedule_Object },
        }
      );
    }
  }
}

module.exports = new AddToCourse();
