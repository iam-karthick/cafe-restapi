const Cafe_shope = require('../models/cafe.model.js');

// Create and Save a new Cafe
exports.create = (req, res) => {
    // Validate request
    
    if(!req.body) {
        return res.status(400).send({
            message: "Cafe_shope details can not be empty"
        });
    }
    // Create a Cafe
    let data;
    data = new Cafe_shope({
        name: req.body.name , 
        description: req.body.description,
        location: req.body.location
    });

    // Save Array in the database
    data.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Cafe."
        });
    });
};

// Retrieve and return all cafes from the database.
exports.findAll = (req, res) => {
        Cafe_shope.find()
        .then(cafes => {
            res.send(cafes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cafes."
            });
        });
};

// Find a single cafe with a id
exports.findOne = (req, res) => {
    Cafe_shope.findById(req.params.id)
    .then(cafe => {
        if(!cafe) {
            return res.status(404).send({
                message: "Cafe not found with id " + req.params.id
            });            
        }
        res.send(cafe);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cafe not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cafe with id " + req.params.id
        });
    });
};

// Update a cafe identified by the id in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Cafe content can not be empty"
        });
    }

    // Find cafe and update it with the request body
    Cafe_shope.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Cafe",
        content: req.body.content
    }, {new: true})
    .then(cafe => {
        if(!cafe) {
            return res.status(404).send({
                message: "Cafe not found with id " + req.params.id
            });
        }
        res.send(cafe);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cafe not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating cafe with id " + req.params.id
        });
    });
};

// Delete a cafe with the specified id in the request
exports.delete = (req, res) => {
    Cafe_shope.findByIdAndRemove(req.params.id)
    .then(cafe => {
        if(!cafe) {
            return res.status(404).send({
                message: "Cafe not found with id " + req.params.id
            });
        }
        res.send({message: "Cafe deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cafe not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete cafe with id " + req.params.id
        });
    });
};
