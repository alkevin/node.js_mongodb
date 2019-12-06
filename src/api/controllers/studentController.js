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