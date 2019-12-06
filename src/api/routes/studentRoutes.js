module.exports = function(app){
    const student = require('../controllers/studentController');
    const signin = require('../controllers/loginController');
    const auth = require('../middleware/auth');
    const express = require('express');
    const router = express.Router();

    // Routes

    app.route('/students')
    .get(student.list_all_students)
    .post(student.create_student)
    .delete(student.delete_all_students);

    app.route('/students/:id')
    .get(student.get_student)
    .delete(student.delete_student);
}