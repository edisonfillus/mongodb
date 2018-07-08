//Explain how the query is executed
db.students.explain(true).find({student_id: 5})

//Create an index on student_id field, ascending
db.students.createIndex({student_id: 1})

//Create an multikey-index on student_id and class_id
db.students.createIndex({student_id: 1, class_id: -1});

//Select the collecion indexes
db.students.getIndexes();

//Drop an index
db.students.dropIndex({student_id: 1});

//Create an index on array element
db.students.createIndex({'scores.score': 1, 'scores.type': 1});
db.students.find({'scores': {$elemMatch: {type: 'exam', score: {$gt: 99.8}}}});

//Create an unique index
db.countries.createIndex({name: 1}, {unique: true});

//Create an unique index, accepting documents with the field missing (null)
db.countries.createIndex({internet_domain: 1}, {unique: true, sparse: true});

//Create an index on background (slow, but don't block collection)
db.students.createIndex({'scores.score': 1}, {background: true});

//Give a name to the index
db.products.createIndex({item: 1, quantity: -1}, {name: "inventory"});

//Verbose Mode - Return the execution data about the winning plan
db.stududents.explain("executionStats").find({"class_id": 1});

//Verbose Mode - Return the execution data about plans considered
db.stududents.explain("allPlansExecution").find({"class_id": 1});
