const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser, // Corrected to match the function name
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
