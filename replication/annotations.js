/*
w=1         Data should have been written to memory
w=majority  Data should have been written to majority of nodes in cluster
j=1         Data should have been written to disk

Replicasets
- Regular
- Arbiter (not a database, just vote who will be the primary)
- Dalayed/Regular (Async Backup)
- Hidden (has the data, but never turn primary. Use for analytics. Can vote)

oplog -> where mongod save the transaction log
secondaries constant read the primary oplog and execute the operations on local data.
*/

// Check Replication Status
rs.status();

// Enable Queries on Secondaries
rs.slaveOk();

// Check sharding status
sh.status()

