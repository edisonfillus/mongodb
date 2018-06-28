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