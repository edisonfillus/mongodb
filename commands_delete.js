// Delete first document that match
db.reviews.deleteOne({_id: ObjectId("3328d38e289a328b39339")});

// Delete all documents that match
db.reviews.deleteMany({reviewer_id: 757573922});