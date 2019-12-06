const mongoose = require('mongoose');
User = mongoose.model('User');

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


exports.create_user = async(req, res) => {
    var new_user = new User(req.body);
    console.log(req.body);
    User.findOne({mail:new_user.mail})
        .then( user => {
            console.log(user);
            if(!user){
                try {
                    console.log("not found");
                    new_user.save()
                    const token = new_user.generateAuthToken()
                    User.findOne({mail:new_user.mail})
                        .then( user => {
                            res.status(201).send({
                                status: "201",
                                message: "User created.",
                                new_user,
                                token
                            });
                            console.log("User created.");
                        })
                }
                catch (err) {
                    res.status(400).send({
                        status: "400",
                        message: "Bad Request. Could not create user.",
                        user: user
                    });
                    console.log("Could not create user.");
                }
                
                /*new_user.save((err, user) => {
                    if(err){
                        console.log(new_user);
                        console.log(req.body);
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
                }
                );*/
            }
            else {
                res.status(403).send({
                    status: "403",
                    message: "User mail already exist. Could not create user.",
                    user: req.body
                });
                console.log("User mail already exist. Could not create user.");
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
    User.findOne({_id:req.params.id}, {__v: 0})
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
    User.findOne({_id:req.params.id}, {_id: 0})
        .then(user => {
            if(!user){
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
                message: "Something wrong retrieving user with ID: " + req.params.id
            });
        });
}

exports.delete_all_users = function (req, res){
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
            else {
                users.forEach(user => {
                    User.deleteOne({mail:user.mail});
                });
                res.status(200);
                return res.json({
                status: "200",
                message: "All users deleted successfully.",
                users
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