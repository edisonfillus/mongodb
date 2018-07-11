// Open Cursors
var c = db.movies.find();
c.hasNext();
c.next();     // Bring the next item
c.next();     // Bring the next item

// Command line editing
var j = db.names.findOne();
j.name = "new name";
db.names.save(j);

// Delete fields
var j = db.names.findOne();
delete j.id;
db.names.insertOne(j);

// Replace
var detailDoc = db.movies.findOne({"imdb.id": "tt4368814"});
detailDoc.poster = "http://imdb.com/title/tt4368814/mediaviewer/rm2926634240";
detailDoc.genres.push("Documentary");
db.movies.replaceOne(
    {
        "imdb.id": detailDoc.imdb.id
    },
    detailDoc
);

// Getting arrays
var album_images = db.albums.aggregate([
    {
        $unwind: "$images"
    },
    {
        $group: {
            _id: null,
            images: {$push: '$images'}
        }
    }
]).next().images;

// Sorting numerically
album_images.sort((a, b) => a - b);

// Foreach
var orphans = [];
db.images.find().forEach(
    function (image) {
        if (!(album_images.includes(image._id))) {
            orphans.push(image._id);
        }
    }
);

// Delete with array
db.images.deleteMany({'_id': {'$in': orphans}});
