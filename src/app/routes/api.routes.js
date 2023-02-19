module.exports = (app) => {
    const Cafe = require('../controllers/cafeShope.controller.js');
    const Employee = require('../controllers/employee.controller.js');

    // Create a new Data
    app.post('/cafe', Cafe.create);
    app.post('/employee',Employee.create);

    // Retrieve all Data
    app.get('/cafe', Cafe.findAll);
    app.get('/employee',Employee.findAll);

    // Retrieve a single Data with id
    app.get('/cafe/:id', Cafe.findOne);
    app.get('/employee/:id',Employee.findOne);

    //Retrieve cafe shope employees
    app.get('/employees/:id',Employee.findAllemp);

    // Update a Data with id
    app.put('/edit-cafe/:id', Cafe.update);
    app.put('/edit-employee/:id',Employee.update);

    // Delete a Data with id
    app.delete('/cafe/:id', Cafe.delete);
    app.delete('/employee/:id',Employee.delete);

}
