/*
Books
    Science
        Chemistry
        Physics
            Classical Mechanics
            Quantum Mechanics
*/

db.categories.insertOne(
    {
        "_id": "Quantum Mechanics",
        "ancestors": ["Books", "Science", "Physics"],
        "children": []
    });
db.categories.insertOne(
    {
        "_id": "Classical Mechanics",
        "ancestors": ["Books", "Science", "Physics"],
        "children": []
    });
db.categories.insertOne(
    {
        "_id": "Physics",
        "ancestors": ["Books", "Science"],
        "children": ["Classical Mechanics", "Quantum Mechanics"]
    });
db.categories.insertOne(
    {
        "_id": "Chemistry",
        "ancestors": ["Books", "Science"],
        "children": []
    });
db.categories.insertOne(
    {
        "_id": "Science",
        "ancestors": ["Books"],
        "children": ["Physics", "Chemistry"]
    });
db.categories.insertOne(
    {
        "_id": "Books",
        "ancestors": [],
        "children": ["Science"]
    });
