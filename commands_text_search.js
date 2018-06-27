// Create an full text index on string field
db.sentences.createIndex({'words': 'text'});

// Find with text search operator
db.sentences.find({$text: {$search: 'dog'}});

// Find ordering by relevance
db.sentences.find(
    {
        $text: {$search: 'rat three obsidian'}
    },
    {
        score: {$meta: 'textScore'}
    }
).sort({score: {$meta: 'textScore'}});
