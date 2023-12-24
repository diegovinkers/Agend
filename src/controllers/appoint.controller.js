import Appoint from '../models/appoint.models.js';

export const createAppointment = async (req, res) => {
  try {
    const { appointmentDate, appointmentTime, patient, professional } = req.body;

    const existingAppointment = await Appoint.findOne({ 
      appointmentDate, 
      appointmentTime, 
      'professional.id': professional.id, 
      'patient.id': patient.id 
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Ya existe una cita para esta fecha y hora con el mismo paciente o profesional' });
    }

    const newAppointment = new Appoint(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appoint.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appoint.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updatedAppointment = await Appoint.findByIdAndUpdate(appointmentId, req.body, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params; 
    const appointment = await Appoint.findByIdAndRemove(id); 
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


