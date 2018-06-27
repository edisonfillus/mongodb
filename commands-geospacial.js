// ##### 2D non spherical (x,y) ####
/** Create a location field
{
    "_id": 1,
    "location": [40, 74]
} */

// Create an Index on field
db.stores.createIndex({location:'2d', type: 1});

// Find the 3 closest to location
db.stores.find({location:{$near:[50,50]}}).limit(3);


// ##### 2D spherical (maps, sphere) ####

/** Create a GeoJSon field
{
  _id = 1
  "location": {
     "type" : "Point",
     "coordinates" : [-122.5995522, 37.895943] # Longitude, Latitude
  }
  "type" : "Park"
} */

// Create an Index
db.places.createIndex({'location': '2dsphere'});

// Find
db.places.find(
{
	location:{
		$near:{
			$geometry: {
				type: 'Point',
				coordinates: [-122.1666641, 37.4278925]
			},
			$maxDistance: 2000}
		}
	}
);
