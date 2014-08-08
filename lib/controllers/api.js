'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');
   // adds = mongoose.model('adds');
/**
 * Get awesome things
 */
console.log("WORKED??");
exports.awesomeThings = function(req, res) {
    console.log("awesome!!");
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

// pulled in from my original app :)  //

// this is hackish but i was very tired.
var addSchema = mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    mileage: Number,
    price: Number,
    title: String,
    description: String,
    images: Array,
    user: String,
    archived: Boolean
});

var Listing = mongoose.model('adds', addSchema);

exports.seeAdds = function(req, res){
// console.log('seeAdds function ran')

    Listing.find()

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
        mileage: req.body.maxMileage
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




//       if (!searchParams.highPrice) {searchParams.highPrice = 100000;}
//       if (!searchParams.lowPrice) {searchParams.lowPrice = 0;}
//       if (!searchParams.mileage) {searchParams.mileage = 100000;}
//       if (searchParams.keywords) {searchParams.keywords = searchParams.keywords.split(" ");} else {searchParams.keywords = " "}
    console.log("this is the result of splitting the keywords", searchParams.keywords);


    var query = Listing.find({description: new RegExp(searchParams.keywords, "i")} || {title: new RegExp(searchParams.keywords, "i")})    //{title: /coolest/i} test query for keywords
//         if (searchParams.keywords) { query.where() }
//        if (searchParams.keywords) {
//            query.where('description').in(searchParams.keywords)    //new RegExp(searchParams.keywords, 'i')
//            query.or([])   where('title' ).in(searchParams.keywords)
//        }

    if (searchParams.lowPrice) {query.where('price').gte(searchParams.lowPrice) }

    if (searchParams.highPrice) {query.where('price').lte(searchParams.highPrice)}

    if (searchParams.make) {

        query.where('make').in(searchParams.make) }

    if (searchParams.model) {

        query.where('model').in(searchParams.model) }

    if (searchParams.mileage) {query.where('mileage').lte(searchParams.mileage) }

    query.exec(function(err, result){
        if (err) {console.log(err)}
        console.log(result)
        res.send(result);

    })
}


exports.postAdd = function(req, res) {
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
        archived: false

    };
    var newAdd = new Listing(addInfo)
    console.log(newAdd);
    newAdd.save(function(err){
        if (err) return console.error(err)

        res.json(newAdd);
    })




};

exports.archiveAdd = function(req,res) {
    var id = req.body.id;
//    console.log("id from put request: " + id);

    Listing.findByIdAndUpdate(id, { $set: { "archived" : true}},{new: true}, function (err, listing) {
        if (err) return handleError(err);
        console.log( 'the listing : ' + listing);
        res.send(listing);
    });

};

exports.userAdds = function(req,res) {
    var userId = req.params.id;
//    console.log(userId);
    Listing.find({"user": userId, "archived": false})

        .exec(function(err, listings) {

            res.send(200, listings);
        });


};