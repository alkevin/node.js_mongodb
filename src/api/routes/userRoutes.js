module.exports = function(app){
    const user = require('../controllers/userController');

    // Routes
    /**
     * @swagger
     * /users:
     *  get:
     *    tags : 
     *      - Users
     *    summary: Should return all users
     *    description: Use to return all users
     *    consumes:
     *      - application/json
     *    responses:
     *      '200':
     *        description: Successfully fetch all users
     *  post:
     *    tags : 
     *      - Users
     *    summary: Should save new user
     *    description: Use to save a new user
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: user
     *        in: body
     *        schema:
     *          type: object
     *          properties:
     *            nom:
     *              type: string
     *            prenom:
     *              type: string
     *    responses:
     *      '201':
     *        description: User created successfully
     */
    app.route('/users')
    .get(user.list_all_users)
    .post(user.create_user);

    app.route('/users/test/:id')
    .put(user.findOneUpdate_user);
    
    /**
     * @swagger
     * definition:
     *   user:
     *     properties:
     *       nom:
     *         type: string
     *       prenom:
     *         type: string

     * /users/{id}:
     *  get:
     *    tags : 
     *      - Users
     *    summary: "Should return user by id"
     *    description: "Use to return user by his id"
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: query
     *        type: number
     *        required: true
     *        description: "User id"
     *    responses:
     *      '200':
     *        description: "Successfully fetch user"
     *        schema:
     *          $ref: '#/definitions/user'
     *      '404':
     *        description: "User not found"
     *  put:
     *    tags : 
     *      - Users
     *    summary: "Should update a user"
     *    description: "Use to update a user"
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: query
     *        type: string
     *        required: true
     *        description: "User id"
     *      - name: user
     *        in: body
     *        schema:
     *          type: object
     *          properties:
     *            nom:
     *              type: string
     *              maxlenght: 32
     *              required: false
     *            prenom:
     *              type: string
     *              maxlenght: 32
     *              required: false
     *    responses:
     *      '200':
     *        description: "Successfully update user"
     *        schema:
     *          $ref: '#/definitions/user'
     *      '400':
     *        description: "Bad request. Could not update user"
     *      '404':
     *        description: "User not found"
     * 
     *  delete:
     *    tags : 
     *      - Users
     *    summary: "Should delete user by id"
     *    description: "Use to delete user by his id"
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: query
     *        type: number
     *        required: true
     *        description: "User id"
     *    responses:
     *      '200':
     *        description: "Successfully delete user"
     *        schema:
     *          $ref: '#/definitions/user'
     *      '404':
     *        description: "User not found"
     */
    app.route('/users/:id')
    .get(user.get_user)
    .put(user.update_user)
    .delete(user.delete_user);
    
}