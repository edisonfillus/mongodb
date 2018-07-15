// Find with filter
db.students.find(
    {
        "name": "Felipe",
        "skills.name": "english"
    });

// Find with $or
db.students.find(
    {
        $or: [
            {"course.name": "Mathematics"},
            {"course.name": "Chemistry"}
        ],
        "name": "Daniel"
    });

// Find with project
db.movies.find(
    {
        $or: [{"tomato.meter": {$gt: 95}},
            {"metacritic": {$gt: 88}}]
    },
    {
        _id: 0,
        title: 1,
        "tomato.meter": 1,
        metacritic: 1
    });

// Find with $and Operador. Only needed to set more than one condition on same field
db.movies.find(
    {
        $and: [{"metacritic": {$ne: null}},
            {"metacritic": {$exists: true}}]
    });

// Find with $gt
db.students.find(
    {
        score: {$gt: 5}
    });


// Find with many filters
db.movies.find(
    {
        genres: {$in: ["Action", "Adventure"]},
        runtime: {$gt: 90, $lte: 120},
        rated: {$ne: "UNRATED"}
    },
    {
        title: 1,    // 1 adds field
        _id: 0        // 0 excludes field (ID is implicitly included)
    }).sort({title: 1});

// Find where field doesn't exist
db.movieDetails.find(
    {
        tomato: {$exists: false}
    });


// Find with Order and Limit
db.students.find().sort({"name": 1}).limit(3);

// Find with regex
db.movies.find(
    {
        "awards.text": {$regex: /^Won .*/}
    });

// Distinct
db.trips.distinct("usertype");

// Find in arrays
db.videos.find(
    {
        cast: ["Jeff Bridges", "Paul Mason"]    //Exact list, in this order
    });

db.students.find(
    {
        "course.name": {
            $in: ["Mathematics", "Chemistry"]  //Documents that have at list one value in the list
        }
    });

db.videos.find(
    {
        cast: "Jeff Bridges"    //Any document that have this item in the list
    });

db.videos.find(
    {
        "cast.0": "Jeff Bridges"    //Documents that have this item as first element
    });

db.videos.find(
    {
        genres: {$all: ["Comedy", "Crime", "Drama"]} //Documents that hall all the elements of the list, any order
    });

db.videos.find(
    {
        countries: {$size: 1} // Documents with one element on the list

    });

// Find in document list elements
db.videos.find(
    {
        boxOffice: {$elemMatch: {country: "Germany", revenue: {$gt: 17}}} // Documents that has an element has this conditions
    });

// Find in integer arrays
db.scores.find(
    {
        results: {$elemMatch: {$gte: 70, $lt: 80}} // Documents that an element has this conditions
    });


// Find in array, returning just the first match array element
db.cart.find(
    {
        userId: "558098a65133816958968d88",
        "items._id": 2
    },
    {
        "items.$": 1
    });

db.students.find(
    {
        grades: {
            $elemMatch: {
                mean: {$gt: 70},
                grade: {$gt: 90}
            }
        }
    },
    {
        "grades.$": 1
    });