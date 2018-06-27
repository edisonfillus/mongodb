db.movies.insertOne(
    {
        "_id": "tt0084726",
        "title": "Star Wars",
        "year": 1982,
        "type": "movie"
    });

db.movies.insertMany(
    [
        {
            "_id": "tt0084726",
            "title": "Star Trek II: The Wrath of Khan",
            "year": 1982,
            "type": "movie"
        },
        {
            "_id": "tt0796366",
            "title": "Star Trek",
            "year": 2009,
            "type": "movie"
        }
    ],
    {
        "ordered": false //Define that inserts can occur out of order and continues even if fail any document
    });


db.alunos.insertOne(
    {
        "name": "Julio",
        "birth_date": new Date("1972-08-30"),
        "course": {"name": "Medicine"},
        "skills": [
            {
                "name": "spanish",
                "level": "advanced"
            }
        ]
    });



