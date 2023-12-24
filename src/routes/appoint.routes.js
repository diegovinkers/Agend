import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentById

} from '../controllers/appoint.controller.js';

const router = express.Router();

router.post('/appointment', createAppointment);

router.get('/appointment', getAppointments);

router.put('/appointment/:id', updateAppointment);

router.delete('/appointment/:id', deleteAppointment);

router.get('/appointment/:id', getAppointmentById);

export default router;

