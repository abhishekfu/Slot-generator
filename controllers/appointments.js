const Model = require('../models');
const { Appointment, Slot } = Model;

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).populate("slots").exec((err, appointments) => res.json(appointments));
  },
  async create(req, res) {
    var requestBody = req.body;

    let doc = await Slot.findOneAndUpdate({_id: requestBody.slot_id},{booked: true});
    doc.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: requestBody.slot_id
    });

    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
    });
  },
  delete(req,res) {
    Appointment.deleteMany({}, () => {
      res.json({msg: 'OK'})
    })
  }
};

module.exports = appointmentController;
