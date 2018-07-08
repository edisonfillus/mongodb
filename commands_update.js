// UPDATE One, overriding all content
db.students.updateOne(
    {
        "course.name": "Chemistry"  // WHERE
    },
    {
        "course.name": "Chemistry Engineering"   //Overrides all the object
    });

// Update One, set just the fields
db.students.updateOne(
    {
        "course.name": "Chemistry"
    },
    {
        $set: {
            "course.name": "Chemistry Engineering" // Set just this field
        }
    });

db.movies.updateOne(
    {
        title: "The Martian"
    },
    {
        $set: {
            poster: "http://ia.media-imdb.com/images/M/MV&.jpg",
            "awards": {
                "wins": 8,
                "nominations": 14,
                "text": "Nominated for 3 Golden Globes. Another 8 wins & 14 nominations."
            }
        }
    });


// UPDATE all records that match filter
db.alunos.updateMany(
    {
        "course.name": "Chemistry"
    },
    {
        $set:
            {"course.name": "Chemistry Enginnering"}
    });

db.movies.updateMany(
    {
        rated: null
    },
    {
        $unset: {
            rated: "" // Will remove the field
        }
    });

// UPDATE array of numbers
db.students.update(
    {
        "_id": ObjectId("56cb0139b6d75ec12f75d3b6")
    },
    {
        $push: {
            "scores": {$each: [8.5, 3]} // will include the two values in the array
        }
    });

// UPDATE array of Documents
db.movie.updateOne(
    {
        tutle: "The Martian"
    },
    {
        $push: {
            reviews: {
                $each: [{
                    rating: 4.5,
                    date: ISODate("2016-01-12T07:00:00Z"),
                    reviewer: "Yabo A.",
                    text: "review text"
                }, {
                    rating: 6.5,
                    date: ISODate("2016-01-12T07:00:00Z"),
                    reviewer: "Matthew Samuel",
                    text: "review text"
                }]
            }
        }
    });

// UPDATE OR INSERT (UPSERT)
db.movies.updateOne(
    {
        "imdb.id": 10
    },
    {
        $set: {
            "imdb.id": 10,
            "title": "test"
        }
    },
    {
        upsert: true     // Set to insert if not found
    });



