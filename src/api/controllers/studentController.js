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
    console.log(req.body);
    Student.findOne({mail:new_student.mail})
        .then( student => {
            console.log(student);
            if(!student){
                try {
                    console.log("not found");
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
                            console.log("Student created.");
                        })
                }
                catch (err) {
                    res.status(400).send({
                        status: "400",
                        message: "Bad Request. Could not create student.",
                        student: student
                    });
                    console.log("Could not create student.");
                }

                /*new_student.save((err, student) => {
                    if(err){
                        console.log(new_student);
                        console.log(req.body);
                        res.status(400).send({
                            status: "400",
                            message: "Bad Request. Could not create student.",
                            student: student
                        });
                        console.log("Could not create student.");
                    }
                    else {
                        res.status(201).send({
                            status: "201",
                            message: "Student created.",
                            student: student
                        });
                        console.log("Student created.");
                    }
                }
                );*/
            }
            else {
                res.status(403).send({
                    status: "403",
                    message: "Student mail already exist. Could not create student.",
                    student: req.body
                });
                console.log("Student mail already exist. Could not create student.");
            }
        })
        .catch(err => {
            res.status(500).send({
                status: "500",
                message: "Something wrong creating students."
            });
            console.log("Something wrong creating students.")
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

}