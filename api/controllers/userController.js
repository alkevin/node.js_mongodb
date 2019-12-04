const mongoose = require('mongoose');
User = mongoose.model('Users');

exports.list_all_users = function (req, res){
    User.find({})
        .then( users => {
            if(!users){
                res.status(404);
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

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    User.findOne({id:new_user.id})
        .then( user => {
            console.log(user);
            if(!user){
                console.log("not found");
                new_user.save(function(err, user){
                    if(err){
                        res.status(400).send({
                            status: "400",
                            message: "Bad Request. Could not create user.",
                            user: user
                        });
                        console.log("Could not create user.");
                    }
                    else {
                        res.status(201).send({
                            status: "201",
                            message: "User created.",
                            user: user
                        });
                        console.log("User created.");
                    }
                });
            }
            else {
                res.status(403).send({
                    status: "403",
                    message: "User id already exist. Could not create user.",
                    user: req.body
                });
                console.log("User id already exist. Could not create user.");
            }
        })
        .catch(err => {
            res.status(500).send({
                status: "500",
                message: "Something wrong creating users."
            });
            console.log("Something wrong creating users.")
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
                     user: userToUpdate
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
    User.findOneAndUpdate({id:req.params.id},req.body, {new: true, useFindAndModify: false})
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