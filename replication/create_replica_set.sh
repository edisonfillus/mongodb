#!/usr/bin/env bash

# Create data directories
mkdir -p /data/rs1 /data/rs2 /data/rs3

# Start 1st node
mongod --replSet mySet --logpath "1.log" --dbpath /data/rs1 --port 27017 --smallfiles --oplogSize 64 --fork

# Start 2nd node
mongod --replSet mySet --logpath "2.log" --dbpath /data/rs2 --port 27018 --smallfiles --oplogSize 64 --fork

# Start 3rd node
mongod --replSet mySet --logpath "3.log" --dbpath /data/rs3 --port 27019 --smallfiles --oplogSize 64 --fork


