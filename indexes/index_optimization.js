// Use hint to force mongodb to use a specific index (sometimes it is need to hint the query planner)
db.students.find(
    {
        student_id: {$gt: 500000},
        class_id: 54
    }).sort(
    {
        student_id: 1
    }).hint(
    {
        class_id: 1
    }).explain("executionstats");

// OBS We have to avoid the SORT step. Sometime it is more efficient to put a field on index just to be sorted
// Ex: Query to be executed:
db.students.find(
    {
        student_id: {$gt: 500000},
        class_id: 54
    }).sort(
    {
        final_grade: 1
    }).hint(
    {
        class_id: 1
    }).explain("executionStats");

//Ex: Best index to run that query:
db.students.createIndex(
    {
        class_id: 1, final_grade: 1, student_id: 1
    });
// It will filter the index by class_id, final_grade is already sorted, and will filter the index keys by student_id.
// No useless document lookup!
// Indexes must be set in the some order as the query. If not, it will need to to sort.

/*
* BEST ORDER FOR INDEXES - equality {a: b}, sort {a: -1}, range {a:{$gt:50}}
* equality field: field on which queries will perform an equality test
* sort field: field on which queries will specify a sort
* range field: field on which queries perform a range test
/*
