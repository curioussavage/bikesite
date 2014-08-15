'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');
   // adds = mongoose.model('adds');
var geocoder = require('google-geocoder');

var geo = geocoder({
    key: 'AIzaSyBK9lNfRhM3l9s_ZQkbwVQz_cdDQqOjGfc'
});
/**
 * Get awesome things
 */
//console.log("WORKED??");
exports.awesomeThings = function(req, res) {
//    console.log("awesome!!");
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

// pulled in from my original app :)  //

// need to move schema

var addSchema = mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    make: String,
    model: String,
    year: Number,
    mileage: Number,
    price: Number,
    title: String,
    description: String,
    images: Array,
    user: String,
    archived: { type: Boolean, default: false },
    city: String,
    zip:  String,
    loc: {type: Array, default: [], index:'2d'}
});

var Listing = mongoose.model('adds', addSchema);

var zipSchema = mongoose.Schema({
    ZIPCode: Number,
    City: String,
    County: String,
    Latitude: Number,
    Longitude: Number
})
var geoInfo = mongoose.model('zips',zipSchema);

exports.seeAdds = function(req, res){
// console.log('seeAdds function ran')

    Listing.find({"archived": false})

        .exec(function(err, listings) {

            res.send(200, listings);
        });

}

exports.searchAdds = function (req, res) {
    var searchParams = {
        keywords: req.body.keywords,
        lowPrice: req.body.lowPrice,
        highPrice: req.body.highPrice,

        make: req.body.make,
        model: req.body.model,
        mileage: req.body.maxMileage,
        zip: Number(req.body.zip),
        maxDistance: Number(req.body.maxDistance)
    }
    console.log(searchParams)


    // change searchParams.make into an array for now
    if (searchParams.make) {
        console.log("make array converter ran")

        var x = searchParams.make;

        searchParams.make = [];
        searchParams.make.push(x);
    }

    // change model into array as well.
    if (searchParams.model)  {
        console.log("model array converter ran")
        var y = searchParams.model;
        searchParams.model = [];
        searchParams.model.push(y) ;
    }



    if (searchParams.keywords){console.log("this is the result of splitting the keywords", searchParams.keywords);}

    if (searchParams.zip) {
        geoInfo.find({"ZIPCode" : searchParams.zip}).exec(function(err,location){
            var latitude = location[0].Latitude;
            var longitude = location[0].Longitude;
            var maxDistance = searchParams.maxDistance;
            console.log("the zip conditional code ran!!")


            var query = Listing.find({description: new RegExp(searchParams.keywords, "i")} || {title: new RegExp(searchParams.keywords, "i")})    //{title: /coolest/i} test query for keywords   //

            query.where('loc').near( longitude, latitude).maxDistance(maxDistance/(3959* Math.PI/180))   // / 3959  * math.PI/180

            if (searchParams.lowPrice) {query.where('price').gte(searchParams.lowPrice) }

            if (searchParams.highPrice) {query.where('price').lte(searchParams.highPrice)}

            if (searchParams.make) {query.where('make').in(searchParams.make) }

            if (searchParams.model) {query.where('model').in(searchParams.model)   }

            if (searchParams.mileage) {query.where('mileage').lte(searchParams.mileage) }
            query.where({'archived': false})
            console.log(query._conditions.loc);
            query.exec(function(err, result){
                if (err) {console.log(err)}
                res.send(result);

            })


        });

    } else {


    var query = Listing.find({description: new RegExp(searchParams.keywords, "i")} || {title: new RegExp(searchParams.keywords, "i")})    //{title: /coolest/i} test query for keywords


    if (searchParams.lowPrice) {query.where('price').gte(searchParams.lowPrice) }

    if (searchParams.highPrice) {query.where('price').lte(searchParams.highPrice)}

    if (searchParams.make) {query.where('make').in(searchParams.make) }

    if (searchParams.model) {query.where('model').in(searchParams.model)   }

    if (searchParams.mileage) {query.where('mileage').lte(searchParams.mileage) }
    query.where({'archived': false})
    console.log(query);
    query.exec(function(err, result){
        if (err) {console.log(err)}
        res.send(result);

    })
    }
}




exports.postAdd = function(req, res) {
    var zipToFind = req.body.zip;
//    code for google geocoding, not working

//    geo.find(zipToFind, function(err, result){
//        if (err) (console.log("the error is :" + err));
//        var googleInfo = result
//        console.log('the type of google info is: ' + typeof googleInfo + ", this is what it returned : " + result)
//    });
    geoInfo.find({"ZIPCode" : zipToFind})
        .exec(function(err, location) {
            var lat = location[0].Latitude;
            var long = location[0].Longitude;
//                console.log(location);
            var addInfo = {
                title: req.body.title,
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                mileage: req.body.mileage,
                price: req.body.price,
                description: req.body.description,
                images: req.body.images,
                user: req.body.user,
                archived: false,
                city: req.body.city,
                zip: req.body.zip,
                loc: [long,lat]

            };
            var newAdd = new Listing(addInfo)
            console.log(newAdd);
            newAdd.save(function(err){
                if (err) return console.error(err)

                res.json(newAdd);
            })

        });



};


exports.archiveAdd = function(req,res) {
    var id = req.body.id;
//    console.log("id from put request: " + id);

    Listing.findByIdAndUpdate(id, { $set: { "archived" : true}},{new: true}, function (err, listing) {
        if (err) return res.send(err);
//        console.log( 'the listing : ' + listing);
        res.send(listing);
    });

};

exports.userAdds = function(req,res) {
    var userId = req.params.id;
//    console.log(userId);
    Listing.find({"user": userId, "archived": false})

        .exec(function(err, listings) {
//            console.log(listings)
            res.send(200, listings);
        });


};