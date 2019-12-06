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
    Lesson.findOne({})
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
    Lesson.findOne({id:req.params.id}, {_id: 0})
    .then(lessonToUpdate => {
        if(!lessonToUpdate){
            res.status(404);
            return res.json({
                status: "404",
                message: "Lesson not found !",
                lesson: req.body
            });
        }
        Lesson.updateToOne(lessonToUpdate, req.body, function(err, result){
            if(err){
                res.status(400);
                return res.json({
                    status: "400",
                    message: "Bad Request ! Could not update lesson "+ req.params.id,
                    lesson: lessonToUpdate
                })
            }
            res.status(200);
            return res.json({
                status: '200',
                message: "Lesson "+req.params.id+" updated",
                lesson: lessonToUpdate
            })
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

exports.delete_lesson = function(req, res){
    Lesson.findOne({id:req.params.id}, {_id: 0})
        .then(lesson => {
            if(!lesson){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Lesson with id " + req.params.id + " not found."
                });
            }
            lesson.deleteOne({id:req.params.id}, function(err, result){
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