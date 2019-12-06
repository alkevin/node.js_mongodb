const mongoose = require('mongoose');
const newsApiProvider = require('../providers/newsApiProvider');
Speaker = mongoose.model('Speaker');


exports.list_all_speakers = function (req, res){
    Speaker.find({})
        .then( speakers => {
            if(!speakers){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Could not find speakers.",
                    speakers: speakers
                });
            }
            res.status(200);
            return res.json({
                status: "200",
                message: "Speakers fetched successfully.",
                speakers
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong fetched speakers."
            });
        });
}


exports.create_speaker = function(req, res) {
    var new_speaker = new Speaker(req.body);

    console.log(req.body);
    Speaker.findOne({mail:new_speaker.mail})
        .then( speaker => {
            console.log(speaker);
            if(!speaker){
                console.log("not found");
                new_speaker.save(function(err, speaker){
                    if(err){
                        console.log(new_speaker);
                        console.log(req.body);
                        res.status(400).send({
                            status: "400",
                            message: "Bad Request. Could not create speaker.",
                            speaker: speaker
                        });
                        console.log("Could not create speaker.");
                    }
                    else {
                        res.status(201).send({
                            status: "201",
                            message: "Speaker created.",
                            speaker: speaker
                        });
                        console.log("Speaker created.");
                    }
                });
            }
            else {
                res.status(403).send({
                    status: "403",
                    message: "Speaker mail already exist. Could not create speaker.",
                    speaker: req.body
                });
                console.log("Speaker mail already exist. Could not create speaker.");
            }
        })
        .catch(err => {
            res.status(500).send({
                status: "500",
                message: "Something wrong creating speakers."
            });
            console.log("Something wrong creating speakers.")
        });
}

exports.get_speaker = function (req, res){
    const promiseApi = newsApiProvider.getOneTopArticles();
    Speaker.findOne({_id:req.params.id}, {_id: 0, __v: 0})
        .then(speaker => {
            if(!speaker){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Speaker not found with this ID: " + req.params.id,
                });
            }
            res.status(200);
            promiseApi.then(response => {
                speaker["news"] = response;
                console.log(response);
                return res.json({
                    status: "200",
                    message: "Speaker Fetched successfully.",
                    speaker: [speaker, response]
                });
              }, error => {
                console.log(error);
              })
        
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving speaker with ID: " + req.params.id
            });
        });
}

exports.update_speaker = function (req, res){
    Speaker.findOne({id:req.params.id}, {_id: 0})
        .then(speakerToUpdate => {
            if(!speakerToUpdate){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Speaker with id " + req.params.id + " not found.",
                    speakerSent: req.body
                });
            }
            Speaker.updateOne(speakerToUpdate, req.body, function(err, result){
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not update speaker ID: " + req.params.id,
                        speakerSent: req.body,
                        speakerToUpdate: speakerToUpdate
                    });
                 }
                 res.status(200);
                 return res.json({
                     status: "200",
                     message: "Speaker with id: " + req.params.id + " updated.",
                     speaker: speakerToUpdate
                 });
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving speaker with ID: " + req.params.id,
            });
        });
}

exports.findOneUpdate_speaker = function(req, res){
    Speaker.findOneAndUpdate({id:req.params.id},req.body, {new: true, useFindAndModify: false})
    .then(result => {
        if(!result){
            res.status(400);
            res.json({
                status: "400",
                message: "Could not update speaker ID: " + req.params.id,
                speakerSent: req.body,
            })
        }
        res.status(200);
        res.json({
            status: "200",
            message: "Speaker with id: " + req.params.id + " updated.",
            speaker: result
        });
    })
    .catch(err => {
        res.status(500);
        return res.json({
            status: "500",
            message: "Something wrong updating speaker with ID: " + req.params.id,
        });
    });
}

exports.delete_speaker = function(req, res){
    Speaker.findOne({id:req.params.id}, {_id: 0})
        .then(speaker => {
            if(!speaker){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Speaker with id " + req.params.id + " not found."
                });
            }
            Speaker.deleteOne({id:req.params.id}, function(err, result){
                if(err){
                    res.status(400);
                    return res.json({
                        status: "400",
                        message: "Could not delete speaker ID: " + req.params.id
                    });
                 }
                 res.status(200);
                 return res.json({
                     status: "200",
                     message: "Speaker with id : " + req.params.id + " deleted",
                     result: result
                 });
            });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong retrieving speaker with ID: " + req.params.id
            });
        });

}

exports.delete_all_speakers = function (req, res){
    Speaker.find({})
        .then( speakers => {
            if(!speakers){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Could not find users.",
                    speakers: speakers
                });
            }
            else {
                speakers.forEach(speaker => {
                    Speaker.deleteOne({mail:speaker.mail});
                });
                res.status(200);
                return res.json({
                status: "200",
                message: "All users deleted successfully.",
                speakers
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