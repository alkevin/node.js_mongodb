const mongoose = require('mongoose');
Lesson = mongoose.model('Lesson');

exports.list_all_lessons = function(req, res){
    Lesson.find({})
        .then( lesson => {
            if( !lesson ){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Could not find any lessons",
                    lesson: lesson
                });
            } else {
                res.status(200);
                return res.json({
                    status: "200",
                    message: "Lesson fetch successfully.",
                    lesson
                });
            }
        })
        .catch( err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong fetched lessons."
            })
        })
}

exports.create_lesson = function(req, res){
    var new_lesson = new Lesson(req.body);
    console.log(req.body);
    Lesson.findOne({id:new_lesson.id})
        .then( lesson => {
            console.log(lesson);
            if(!lesson){
                new_lesson.save(function(err, lesson){
                    if(err){
                        res.status(400).send({
                            status: '400',
                            message: 'Bad Request. Could not create a lesson !',
                            lesson: lesson
                        })
                    }
                    else {
                        res.status(201).send({
                            status: '201',
                            message: 'Lesson created !',
                            lesson: lesson
                        })
                    }
                });
            }
            else {
                res.status(403).send({
                    status: '403',
                    message: 'Lesson already exist ! ',
                    lesson: req.body
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                status: '500',
                message: 'Something wrong created lesson.'
            })
        })
}

exports.get_lesson = function (req, res){
    Lesson.findOne({id:req.params.id}, {_id: 0, __v: 0})
        .then(lesson => {
            if(!lesson){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Lesson not found with this ID: " + req.params.id,
                });
            }
            res.status(200);
            return res.json({
                status: "200",
                message: "Lesson Fetched successfully.",
                lesson: lesson
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving lesson with ID: " + req.params.id
            });
        });
}

exports.update_lesson = function (req, res){
    Lesson.findOne({_id:req.params.id}, {__v: 0})
        .then(lesson => {
            if(!lesson){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Lesson not found !",
                    lesson: req.body
                });
            }
            Lesson.updateOne({_id:req.params._id}, {$set: req.body}, (err, result) => {
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not update lesson ID: " + req.params.id,
                        lessonSent: JSON.parse(req.body),
                        lesson: lesson
                    });
                 }
            })
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving lesson with ID: " + req.params.id,
            });
        });
}

exports.update_user = function (req, res){
    User.findOne({_id:req.params.id}, {__v: 0})
        .then(userToUpdate => {
            if(!userToUpdate){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "User with id " + req.params.id + " not found.",
                    userSent: JSON.parse(req.body)
                });
            }
            User.updateOne({_id:req.params._id}, {$set: req.body}, (err, result) => {
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not update user ID: " + req.params.id,
                        userSent: JSON.parse(req.body),
                        userToUpdate: userToUpdate
                    });
                 }
                 console.log(result);
            })
            .then(() => {
                res.status(200);
                 return res.json({
                     status: "200",
                     message: "User with id: " + req.params.id + " updated.",
                     user: userToUpdate
                 });
            });
        })
        .catch(err => {
            res.status(404);
            return res.json({
                status: "404",
                message: "User not found with this ID: " + req.params.id
            });
        });
}

exports.delete_lesson = function(req, res){
    Lesson.findOne({_id:req.params.id}, {_id: 0})
        .then(lesson => {
            if(!lesson){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Lesson with id " + req.params.id + " not found."
                });
            }
            Lesson.deleteOne({_id:req.params.id}, (err, result) => {
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not delete lesson ID: " + req.params.id
                    });
                 }
                 res.status(200);
                 return res.json({
                     status: "200",
                     message: "Lesson with id : " + req.params.id + " deleted",
                     result: result
                 });
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving lesson with ID: " + req.params.id
            });
        });
}