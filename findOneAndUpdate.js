// Find the user, update and return the new document
db.cart.findOneAndUpdate(
    {
        userId: 292992,
    },
    {
        $pull: {"items": {_id: 112312}}  // Remove item
    },
    {
        returnOriginal: false
    }
);

// Find the item, update the quantity using positional, and return the new document
db.cart.findOneAndUpdate(
    {
        userId: 292992,
        "items._id": 1
    },
    {
        $set: {"items.$.quantity": 4}  // Update quantity
    },
    {
        returnOriginal: false
    }
);

