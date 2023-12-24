import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  patient: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    email: String
  },
  professional: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    email: String
  }
});

// Definir un índice único para fecha, hora y profesional
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1, 'professional.id': 1, 'patient.id': 1 }, { unique: true });

// Agregando una validacion personalizada para verificar si ya existe una cita en esa fecha y hora para el profesional o el paciente
appointmentSchema.pre('save', async function (next) {
  const appointment = this;

  // Verificando si ya existe una cita para la misma fecha y hora para el profesional o el paciente
  const existingAppointment = await this.model('Appointment').findOne({
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    $or: [
      { 'professional.id': appointment.professional.id },
      { 'patient.id': appointment.patient.id }
    ]
  });

  if (existingAppointment) {
    const error = new Error('Ya existe una cita para esta fecha y hora para el profesional o el paciente');
    return next(error);
  }

  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;