// Show collections statistics (size, count, indexes)
db.students.stats();

// Show indexes size
db.students.totalIndexSize();

// Compress indexes (If CPU is wide available, but storage no)
mongod --wiredTigerIndexPrefixCompression true
