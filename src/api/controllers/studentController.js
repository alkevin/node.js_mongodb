const mongoose = require('mongoose');
Student = mongoose.model('Student');

exports.list_all_students = function (req, res){
    Student.find({})
        .then( students => {
            if(!students){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Could not find students.",
                    students: students
                });
            }
            res.status(200);
            return res.json({
                status: "200",
                message: "Students fetched successfully.",
                students
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong fetched students."
            });
        });
}


exports.create_student = async(req, res) => {
    var new_student = new Student(req.body);
    Student.findOne({mail:new_student.mail})
        .then( student => {
            if(!student){
                try {
                    new_student.save()
                    const token = new_student.generateAuthToken()
                    Student.findOne({mail:new_student.mail})
                        .then( student => {
                            res.status(201).send({
                                status: "201",
                                message: "Student created.",
                                new_student,
                                token
                            });
                        })
                }
                catch (err) {
                    res.status(400).send({
                        status: "400",
                        message: "Bad Request. Could not create student.",
                        student: student
                    });
                }
            }
            else {
                res.status(403).send({
                    status: "403",
                    message: "Student mail already exist. Could not create student.",
                    student: req.body
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: "500",
                message: "Something wrong creating students."
            });
        });
}

exports.get_student = function (req, res){
    Student.findOne({_id:req.params.id}, {__v: 0})
        .then(student => {
            if(!student){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Student not found with this ID: " + req.params.id,
                });
            }
            res.status(200);
            return res.json({
                status: "200",
                message: "Student Fetched successfully.",
                student: student
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving student with ID: " + req.params.id
            });
        });
}

exports.delete_student = function(req, res){
    Student.findOne({_id:req.params.id})
        .then(student => {
            if(!student){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "User with id " + req.params.id + " not found."
                });
            }
            User.deleteOne({_id:req.params.id}, (err, result) => {
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not delete user ID: " + req.params.id
                    });
                 }
                 res.status(200);
                 return res.json({
                     status: "200",
                     message: "User with id : " + req.params.id + " deleted",
                     result: result
                 });
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving student with ID: " + req.params.id
            });
        });
}

exports.delete_all_students = function (req, res){
    Student.find({})
        .then( students => {
            if(!students){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Could not find users.",
                    students: students
                });
            }
            else {
                students.forEach(student => {
                    Student.deleteOne({mail:student.mail});
                });
                res.status(200);
                return res.json({
                status: "200",
                message: "All users deleted successfully.",
                students
            });
            }
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong fetched users."
            });
        });
}