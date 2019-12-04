const mongoose = require('mongoose');
User = mongoose.model('Users');

exports.list_all_users = function (req, res){
    User.find({})
        .then( users => {
            if(!users){
                res.status(404)
                return res.json({
                    status: "404",
                    message: "Could not find users.",
                    users: users
                });
            }
            res.status(200);
            return res.json({
                status: "200",
                message: "Users fetched successfully.",
                users
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong fetched users."
            });
        });
}

exports.create_user = function (req, res){
    User.findOne({id:req.body.id})
        .then( user => {
            if(!user){
                var new_user = new User(req.body);
                new_user.save(function(err, user){
                    if(err){
                        res.status(400);
                        return res.json({
                            status: "400",
                            message: "Could not create user.",
                            user: user
                        });
                    }
                })
                res.status(201);
                return res.json({
                    status: "201",
                    message: "User created.",
                    user: new_user
                });
            }
            res.status(403);
            return res.json({
                status: "403",
                message: "User id already exist. Could not create user.",
                user: req.body
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong creating user.",
                userSent: req.body
            });
        });
}

exports.get_user = function (req, res){
    User.findOne({id:req.params.id}, {_id: 0, __v: 0})
        .then(user => {
            if(!user){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "User not found with this ID: " + req.params.id,
                });
            }
            res.status(200);
            return res.json({
                status: "200",
                message: "User Fetched successfully.",
                user: user
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving user with ID: " + req.params.id
            });
        });
}

exports.update_user = function (req, res){
    User.findOne({id:req.params.id}, {_id: 0})
        .then(userToUpdate => {
            if(!userToUpdate){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "User with id " + req.params.id + " not found.",
                    userSent: req.body
                });
            }
            User.updateOne(userToUpdate, req.body, function(err, result){
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not update user ID: " + req.params.id,
                        userSent: req.body,
                        userToUpdate: userToUpdate
                    });
                 }
                 res.status(200);
                 return res.json({
                     status: "200",
                     message: "User with id: " + req.params.id + " updated.",
                     user: result
                 });
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving user with ID: " + req.params.id,
            });
        });
}

exports.findOneUpdate_user = function(req, res){
    User.findOneAndUpdate({id:req.params.id},req.body, {new: true})
    .then(result => {
        if(!result){
            res.status(400);
            res.json({
                status: "400",
                message: "Could not update user ID: " + req.params.id,
                userSent: req.body,
            })
        }
        res.status(200);
        res.json({
            status: "200",
            message: "User with id: " + req.params.id + " updated.",
            user: result
        });
    })
    .catch(err => {
        res.status(500);
        return res.json({
            status: "500",
            message: "Something wrong updating user with ID: " + req.params.id,
        });
    });
}

exports.delete_user = function(req, res){
    User.findOne({id:req.params.id}, {_id: 0})
        .then(user => {
            if(!user){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "User with id " + req.params.id + " not found."
                });
            }
            User.deleteOne({id:req.params.id}, function(err, result){
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
                message: "Something wrong retrieving user with ID: " + req.params.id
            });
        });
}