const express = require('express');
const router = express.Router();

const appointmentController = require('../../controllers/appointments')
const slotController = require('../../controllers/slot')

router.get('/appointments', appointmentController.all);
router.get('/retrieveSlots', slotController.all);
router.get('/retrieveSlots/:place/:slot_date', slotController.findByDate);
router.post('/appointmentCreate', appointmentController.create);
router.delete('/appointments/delete', appointmentController.delete);
router.delete('/slots/delete', slotController.delete);
router.post('/slots/add/:days', slotController.addSlots);



module.exports = router;
