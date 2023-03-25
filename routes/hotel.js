const express = require('express');
const {  createHotel,  updateHotel,  deleteHotel,  getSingleHotel,  getAllHotel, typeByCount, typeByCity }= require('../controllers/hotel.js');
const router = express.Router();
const { auth, verifyUser,verifyAdmin } =require('../middlewares/auth.js');

router.get('/typeByCount', typeByCount);
router.get('/typeByCity', typeByCity);
router.post('/createHotel',verifyAdmin, createHotel);
router.put('/updateHotel/:id',verifyAdmin, updateHotel);
router.get('/deleteHotel/:id',verifyAdmin, deleteHotel);
router.get('/getSingleHotel/:id', getSingleHotel);
router.get('/getAllHotel', getAllHotel);


module.exports = router
