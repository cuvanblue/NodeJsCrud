const express = require('express');
const router = express.Router();
const { getAllUsers, createNewUser, updateUser, deleteUser } = require('../controllers/apiController');

router.get('/users', getAllUsers);    // dung get de read data
router.post('/create-user', createNewUser); // dung post de de create data
router.put('/update-user', updateUser);  // put de cap nhat
router.delete('/delete-user/:id', deleteUser); // delete de xoa
module.exports = router;