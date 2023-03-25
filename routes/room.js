const express = require('express');
const {createRoom, updateRoom, deleteRoom ,getDetailRoom, getAllRoom } = require('../controllers/room.js');
const router = express.Router();
const { auth, verifyUser,verifyAdmin } =require('../middlewares/auth.js');

router.post('/createRoom',verifyAdmin, createRoom);
router.get('/getAllRoom', getAllRoom);
router.get('/getDetailRoom/:id', getDetailRoom);
router.put('/updateRoom/:id/:hotelid',verifyAdmin, updateRoom);
router.delete('/deleteRoom/:id/:hotelid',verifyAdmin, deleteRoom);

module.exports=router
