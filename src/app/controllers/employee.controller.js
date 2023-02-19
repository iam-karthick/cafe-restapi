const Employee = require('../models/employee.model.js');

// Create and Save a new Cafe
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "employee details can not be empty"
        });
    }
    // Create a employee details
         data = new Employee({
            name: req.body.name , 
            email_address: req.body.email_address,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            cafeID: req.body.cafeID
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

// Retrieve and return all employee from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    });
};

exports.findAllemp = (req, res) => {
    Employee.find({cafeID:req.params.id})
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    });
};

// Find a single employee with a id
exports.findOne = (req, res) => {
    Employee.findById(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employee with id " + req.params.id
        });
    });
};

// Update a employee identified by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "employee content can not be empty"
        });
    }

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.id, {
        name: req.body.name , 
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        cafeID: req.body.cafeID
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });
        }
        res.send({message: "employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    });
};
