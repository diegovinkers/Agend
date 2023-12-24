import mongoose from 'mongoose';

const appointSchema = new mongoose.Schema({
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

const Appoint = mongoose.model('Appointment', appointSchema);

export default Appoint;
