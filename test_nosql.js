const { parse } = require('dotenv');
const { type } = require('express/lib/response');
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var today = new Date();
var date = today.getDate() +'-'+ (today.getMonth()+1) +'-'+today.getFullYear();

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Quanlysinhvien');
        console.log("ket noi database thanh cong")
    } catch (error) {
        console.log("fail")
    }

}

connect()

const role = ['admin','student']

    
const Class = new Schema({
    classid: {type:String, unique : true, required:true},
    classname:{type:String, unique : true, required:true},
    departmentid:{type:String, required:true}
},{
    collection : "classes"
})

const Classmodel = mongoose.model('Class', Class)

const User = new Schema({
    userid: {type: String , required: true, unique: true},
    password: {type: String , required: true},
    name: {type: String , required: true},
    role:{type: String , enum: role, required: true},
    dob: {type: Date},
    address:{type: String},
    class_id:{type: ObjectId, ref: "Class"}
  }, {
    collection : 'users'
  });

const Usermodel = mongoose.model('User', User)





const Course = new Schema({
    courseid: {type:String, unique : true, required:true},
    coursename:{type:String, required:true},
    students_id:[{
        type: ObjectId,
        ref : "users"
    }]
    
})

CourseModel = mongoose.model('Course', Course)

const Department = new Schema({
    departmentid:{type:String, required:true, unique : true},
    departmentname:{type:String, required:true, unique : true}
})

DepartmentModel = mongoose.model('Department', Department)

const Course_detail = new Schema({
    course_id : {
        type : ObjectId,
        unique: true,
        ref: "Course"
    },
    total_lesson : {type: Number, default: 0},
    schedule :[{
        _id : ObjectId,
        start : String,
        end : String,
        Date : String ,
        Checked_in :[{type: ObjectId, ref : 'User'}]
    }],
    studentsdetail : [{
        user_id :{ type :ObjectId,ref : 'User'},
        check_point : {type : Number, default: 0}
    }]
    
})

Course_detailModel = mongoose.model('Course_detail', Course_detail)

// testobj = {
//     userid : 1861030013
// }

// Usermodel.find(testobj)
// .then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err)
// })

// Usermodel.create({
//     userid: 1861030013,
//     password: 1,
//     name: 'Lê Sỹ Nhật Linh',
//     role: "admin",
//     dob: '1997-04-19',
//     address: 'Thahh Hoá',
//     classid: '186103A'
//   })

// Classmodel.create({
//     classid: '186103A',
//     classname: 'K21A Công nghệ thông tin',
//     departmentid:'CNTT-TT'
//   })

// DepartmentModel.create({
//     departmentid:'CNTT-TT',
//     departmentname:'Khoa công nghệ thông tin - truyền thông'
// })

//  CourseModel.create ({
//     classid:"001",
//     classname:"Đồ án tốt nghiệp",
//     departmentid:{type:String, required:true}
// })

// Usermodel.find().populate('class_id')


// Course_detailModel.create ({
//     course_id : "627e72a3a7cd236cfc3f0482",
//     total_lesson : 0,
//     schedule :[
//         {
//         start : 1,
//         end : 2,
//         Date : "15-5-2022" ,
//         Checked_in :[]
//     },
//     {
//         start : 3,
//         end : 4,
//         Date : "20-5-2022" ,
//         Checked_in :[]
//     }],
//     studentsdetail : [{
//         user_id : "627f1a36da1f15394c81a60b",
//         check_point : 0
//     },
//     {
//         user_id : "627f1aabd1b7269f94423ada",
//         check_point : 0
//     }]
    
// })


// .then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err)
// })

function ConvertUser(userid){
    return new Promise (function(resolve, reject){
        Usermodel.findOne ({
            userid : userid
        },function(err, obj) {
            if(!err && obj){
                resolve(obj._id)
            }
            else{
                reject(err)
            }
        })
    })
}



 function convert_ssid (){
    var studentsid =["1861030013","1861030012","1861030010","1861030011"]
    var ssid = new Array
    for(var i =0; i< studentsid.length; i++){
        if(i<studentsid.length){
        ConvertUser(studentsid[i]).then(data =>{
            ssid.push(data)
            console.log(ssid)
        })}
        else {
            ConvertUser(studentsid[i]).then(data =>{
                ssid.push(data)
                console.log(data)
            })
        }
    }
    return ssid
}


// console.log(convert_ssid())


function test_ssid (stdsid){
    return new Promise((resolve, reject) =>{
        var ssid = new Array
      for(var i =0; i< stdsid.length; i++){
            ConvertUser(stdsid[i]).then(data =>{
                ssid.push(data)
            })
        }
   
        console.log(ssid)
        resolve(ssid)

    })
}

function ssidcl() {
    var studentsid =["1861030013","1861030012","1861030010","1861030011"]
    var ssid = new Array
    test_ssid (studentsid).then(data =>{
        console.log(data)
    })
}

ssidcl()

// node test_nosql.js