module.exports = function(app){
    const user = require('../controllers/userController');
    const signin = require('../controllers/loginController');
    const auth = require('../middleware/auth');
    const express = require('express');
    const router = express.Router();

    // Routes

    app.route('/users')
    .get(user.list_all_users)
    .post(user.create_user)
    .delete(user.delete_all_users);

    app.route('/users/login')
    .post(signin.login);

    router.get('/users/me', auth, async(req, res) => {
        // View logged in user profile
        res.send(req.user)
    })
    
    app.route('/users/:id')
    .get(user.get_user)
    .put(user.update_user)
    .delete(user.delete_user);


    
}