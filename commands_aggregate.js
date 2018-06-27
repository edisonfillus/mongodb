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



// List of product categories by Manufacturer
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

// Group students by score average
db.grades.aggregate(
    {
        $group: {
            '_id': '$student_id',
            'average': {$avg: '$score'}
        }
    },
    {
        $sort: {
            'average': -1
        }
    },
    {
        $limit: 1
    }
);