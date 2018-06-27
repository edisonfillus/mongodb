// Group students by score average
db.grades.aggregate(
    {
        '$group': {
            '_id': '$student_id',
            'average': {$avg: '$score'}
        }
    },
    {
        '$sort': {
            'average': -1
        }
    },
    {
        '$limit': 1
    }
);

// Group product by category
db.products.aggregate([
    {
        $group:
            {
                _id: "$category",
                num_products: {$sum: 1}
            }
    }
]);
