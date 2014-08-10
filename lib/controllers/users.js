'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    Listing = mongoose.model('adds');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */

exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};


/**
  *  under construction !!!!
  */
exports.setFavorites = function(req,res) {
    var addId = req.body.addId;
    var userId = req.body.id;


    User.findByIdAndUpdate(userId, { $push: { "favorites" : addId }},{new: true}, function (err, user) {  // changed from $addToSet
        if (err) return res.send(err);
        console.log("the user updated is :" + user);
        res.send(user.profile);
    });

};
exports.removeFavorites = function(req,res) {
    var addId = req.body.addId;
    var userId = req.body.id;


    User.findByIdAndUpdate(userId, { $pull: { "favorites" : addId }},{new: true}, function (err, user) {
        if (err) return res.send(err);
        console.log("the user updated is :" + user.name);
        res.send(user.profile);
    });


};
exports.getFavs = function(req,res){

     User.findById(req.params.id, function (err, user) {
            if (err) return res.send(err);

//        var query = Listing.findById(user.favorites[i], function(err,listing){
//
//        })
            Listing.find({'_id': {$in: user.favorites}}, function(err,result){
                if (err) return res.send(err)
                res.send(result)
            })
//         query.exec(function(err, user){
//             if (err) {console.log(err)}
//        });


    })



};