const express = require('express');
const { updateUser, deleteUser, detailUser, allUser } = require('../controllers/user.js');
const router = express.Router();
const { auth, verifyUser,verifyAdmin } =require('../middlewares/auth.js');

router.get('/allUser',verifyAdmin, allUser);
router.get('/detailUser/:id',verifyUser, detailUser);
router.put('/updateUser/:id',verifyUser, updateUser);
router.delete('/deleteUser/:id',verifyUser, deleteUser);

module.exports=router
