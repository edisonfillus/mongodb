/**
 * Aggregation Pipeline:
 *   $project  Reshape the document
 *   $match    Filter
 *   $group    Aggregate
 *   $sort     Sort
 *   $skip     Skip
 *   $limit    Limit
 *   $unwind   Deconstruct Arrays
 *   $out      Output
 *   $geonear  Geolocalization
 */


// Count the number of products by category
db.products.aggregate([
    {
        $group:
            {
                _id: "$category",
                num_products: {$sum: 1}
            }
    }
]);

// Count the number of products by manufacturer and category
db.products.aggregate([
    {
        $group:
            {
                _id: {
                    "manufacturer": "$manufacturer",
                    "category": "$category"
                },
                num_products: {$sum: 1}
            }
    }
]);

// Sum of prices by Manufacturer
db.products.aggregate([
    {
        $group:
            {
                _id: {
                    "manufacturer": "$manufacturer"
                },
                sum_prices: {$sum: "$price"}
            }
    }
]);

// Sum of population by State
db.zips.aggregate([
    {
        $group:
            {
                _id: "$state",
                "population": {$sum: "$pop"}
            }
    }
]);

// Average of prices by Manufacturer
db.products.aggregate([
    {
        $group:
            {
                _id: {
                    "manufacturer": "$manufacturer"
                },
                avg_price: {$avg: "$price"}
            }
    }
]);

// Average of State's city population
db.zips.aggregate([
    {
        $group:
            {
                _id: "$state",
                "avg_city_population": {$avg: "$pop"}
            }
    }
]);


// List of product categories by Manufactures, only distinct (Use $push to add all)
db.products.aggregate([
    {
        $group:
            {
                _id: {
                    "manufacturer": "$manufacturer"
                },
                categories: {$addToSet: "$category"}
            }
    }
]);

// List of ZIP codes by City
db.zips.aggregate([
    {
        $group:
            {
                _id: "$city",
                "postal_codes": {$addToSet: "$_id"}
            }
    }
]);


// List of product categories by Manufacturer, including duplicates (Use $addToSet to distinct)
db.products.aggregate([
    {
        $group:
            {
                _id: {
                    "manufacturer": "$manufacturer"
                },
                categories: {$push: "$category"}
            }
    }
]);


// List of Max Prices by Manufacturer
db.products.aggregate([
    {
        $group:
            {
                _id: {
                    "manufacturer": "$manufacturer"
                },
                categories: {$max: "$price"}
            }
    }
]);

// List of ZIP max population by State
db.zips.aggregate([
    {
        $group:
            {
                _id: "$state",
                "pop": {$max: "$pop"}
            }
    }
]);


// Double grouping: Average of Students Average by Class
db.grades.aggregate([
    {
        $group: {
            '_id': {class_id: "$class_id", student_id: '$student_id'},
            'average': {$avg: '$score'}
        }
    },
    {
        $group: {
            '_id': {class_id: "$_id.class_id"},
            'average': {$avg: '$average'}
        }
    }
]);


// Project: Reshaping output
db.grades.aggregate([
    {
        $project: {
            _id: 0, // No Id
            maker: {$toLower: "$manufacturer"}, // String conversion
            details: {
                category: '$category',
                price: {$multiply: ["$price", 10]} // Calculations
            },
            item: '$name' // Renaming
        }
    }
]);

// Project: Reshaping output
db.zips.aggregate([
    {
        $project:
            {
                _id: 0, // No Id
                city: {$toLower: "$city"},
                pop: 1, // Keep as is
                state: 1,
                zip: "$_id"
            }
    }
]);

// Match: Filter documents in the pipeline
db.grades.aggregate([
    {
        $match: {
            state: 'CA'
        }
    },
    {
        $group: {
            _id: "$city",
            population: {$sum: "$pop"},
            zip_codes: {$addToSet: "$_id"}
        }
    },
    {
        $project: {
            _id: 0,
            city: "$_id",
            population: 1,
            zip_codes: 1
        }
    }
]);

// Match: Filter documents in the pipeline
db.zips.aggregate([
    {
        $match: {
            pop: {$gt: 100000}
        }
    }
]);

// Sort, Skip and Limit
db.zips.aggregate([
    {
        $match: {
            state: 'NY'
        }
    },
    {
        $group: {
            _id: "$city",
            population: {$sum: "$pop"}
        }
    },
    {
        $project: {
            _id: 0,
            city: "$_id",
            population: 1
        }
    },
    {
        $sort: {
            population: -1,  // Descending
            city: 1 // Ascending
        }
    },
    {$skip: 10},
    {$limit: 5}
]);


// First and Last
db.zips.aggregate([
    {
        $group: {
            _id: {state: "$state", city: "$city"},
            population: {$sum: "$pop"}
        }
    },
    {
        $sort: {
            "_id.state": 1,
            population: -1
        }
    },
    {
        $group: {
            _id: "$_id.state",
            city: {$first: "$_id.city"}, // Get only the first in the group
            population: {$first: "population"} // Get only the first in the group
        }
    }
]);


/**
 { "_id" : "Will", "likes" : [ "physics", "MongoDB", "indexes" ] }
 { "_id" : "Dwight", "likes" : [ "starting companies", "restaurants", "MongoDB" ] }
 */
db.items.aggregate([
    {
        $unwind: "$likes" // Will unjoin the array
    }
]);

db.posts.aggregate([

    /* unwind by tags */
    {"$unwind": "$tags"},

    /* now group by tags, counting each tag */
    {
        "$group":
            {
                "_id": "$tags",
                "count": {$sum: 1}
            }
    },

    /* sort by popularity */
    {"$sort": {"count": -1}},

    /* show me the top 10 */
    {"$limit": 10},

    /* change the name of _id to be tag */
    {
        "$project":
            {
                _id: 0,
                'tag': '$_id',
                'count': 1
            }
    }
]);


/*
    {
        'name':"Chino Pants",
        'sizes':["32x32", "31x30", "36x32"],
        'colors':['navy', 'white', 'orange', 'violet']
    }
    Double Unwind
 */
db.inventory.aggregate([
    {$unwind: "$sizes"},
    {$unwind: "$colors"},
    {
        $group:
            {
                '_id': {'size': '$sizes', 'color': '$colors'},
                'count': {'$sum': 1}
            }
    }
]);

// Reversing Double Unwind: Arrays with unique values
db.inventory.aggregate([
    {$unwind: "$sizes"},
    {$unwind: "$colors"},
    {
        $group:
            {
                '_id': "$name",
                'sizes': {$addToSet: "$sizes"},
                'colors': {$addToSet: "$colors"},
            }
    }
]);

// Reversing Double Unwind: Arrays with duplicated values
db.inventory.aggregate([
    {$unwind: "$sizes"},
    {$unwind: "$colors"},
    {
        $group:
            {
                '_id': {name: "$name", size: "$sizes"},
                'colors': {$push: "$colors"},
            }
    },
    {
        $group:
            {
                '_id': {name: "$name", colors: "$colors"},
                'sizes': {$push: "$sizes"},
            }
    }
]);


db.posts.aggregate([
    {
        $unwind: "$comments"
    },
    {
        $group:
            {
                '_id': "$comments.author",
                'count': {$sum: 1}
            }
    },
    {
        $sort:
            {
                'count': 1
            }
    }

]);


db.zips.aggregate([
    {
        $group:
            {
                '_id': {city: "$city", state: "$state"},
                'pop': {$sum: "$pop"}
            }
    },
    {
        $match:
            {
                $or: [
                    {"_id.state": 'CA'},
                    {"_id.state": 'NY'}
                ],
                pop: {$gt: 25000}
            }
    },
    {
        $group:
            {
                '_id': null,
                'avg': {$avg: "$pop"}
            }
    }
]);


db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match:
            {
                "scores.type": {$ne: "quiz"}
            }
    },
    {
        $group:
            {
                '_id': {student_id: "$student_id", class_id: "$class_id"},
                'avg': {$avg: "$scores.score"}
            }
    },
    {
        $group:
            {
                '_id': {class_id: "$_id.class_id"},
                'avg': {$avg: "$avg"}
            }
    },
    {
        $sort:
            {
                'avg': -1
            }
    }
]);


db.zips.aggregate([
    {
        $project:
            {
                first_char: {$substr: ["$city", 0, 1]},
                pop: 1
            }
    },
    {
        $match:
            {
                first_char: {$in: ['B', 'D', 'O', 'G', 'N', 'M']}
            }
    },
    {
        $group:
            {
                '_id': null,
                'total': {$sum: "$pop"}
            }
    }
]);

db.companies.aggregate([
    {
        $match: {"relationships.person": {$ne: null}}
    },
    {
        $project: {relationships: 1, _id: 0}
    },
    {
        $unwind: "$relationships"
    },
    {
        $group: {
            _id: "$relationships.person",
            count: {$sum: 1}
        }
    },
    {$sort: {count: -1}}
]);

db.companies.aggregate([
    {
        $match: {"relationships.person": {$ne: null}}
    },
    {
        $project: {
            relationships: 1,
            name: 1,
            _id: 0
        }
    },
    {
        $unwind: "$relationships"
    },
    {
        $group:
            {
                '_id': "$relationships.person",
                'companies': {$addToSet: "$name"}
            }
    },
    {
        $project: {
            '_id': "$_id",
            companies: {$size: "$companies"}
        }
    },
    {$sort: {companies: -1}}
]);

db.companies.aggregate([
    {
        $match: {
            founded_year: 2004,
            'funding_rounds.4': {$exists: true}  // Trick: >= 5
        }
    },
    {
        $project:
            {
                'name': 1,
                'funding_rounds': 1,
                '_id': 0
            }
    },
    {
        $unwind: "$funding_rounds"
    },
    {
        $group:
            {
                '_id': "$name",
                'avg': {$avg: "$funding_rounds.raised_amount"}
            }
    },
    {$sort: {avg: 1}}
]);

db.messages.aggregate([
    {
        $project: {
            'from': '$headers.From',
            'to': '$headers.To'
        }
    },
    {
        $unwind: "$to"
    },
    {
        $group:
            {
                '_id': {_id: "$_id", from: "$from"},
                'to': {$addToSet: "$to"}
            }
    },
    {
        $unwind: "$to"
    },
    {
        $group:
            {
                '_id': {from: "$_id.from", to: '$to'},
                'count': {$sum: 1}
            }
    },
    {$sort: {count: -1}}
]);
