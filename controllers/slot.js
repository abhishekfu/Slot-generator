const Model = require('../models/index');
const moment = require('moment');
const {Appointment, Slot} = Model;

const PLACES = ['WAKAD','BALEWADI'];
const SLOTS = ['7:00AM','7:30AM','8:00AM','8:30AM','9:00AM','9:30AM','10:00AM','10:30AM','11:00AM','11:30AM','12:00PM','02:00PM','02:30PM','03:00PM','03:30PM','04:00PM', '04:30PM','05:00PM','05:30PM','06:00PM','06:30PM','07:00PM'];

const slotController = {
  all (req, res) {
    // Returns all Slots
      Slot.find({"place": "BALEWADI"})
          .sort({ "slot_date": 'ascending' })
          .exec((err, slots) => res.json(slots))
  },
  create (req, res) {
    var requestBody = req.body;

    var newslot = new Slot ({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newSlot.save((err, saved) => {
      //Returns the new slot
      //after a successful save
      Slot
        .findOne({_id: saved._id})
        .exec((err, slot) => res.json(slot));
    })
  },
  findByDate (req, res) {
    var slot_date = req.params.slot_date;
    //slot_date = '04-07-2021';

    //Returns all slot with present date
    Slot.find({"place": req.params.place, 'slot_date': slot_date})
        //.where('slot_date').equals(slot_date)
        .exec((err, slots) => res.json(slots));
  },
  delete(req,res) {
    Slot.deleteMany({}, () => {
      res.json({msg: 'OK'})
    })
  },
  addSlots(req,res) {
    var d = new Date();
    d.setHours(0,0,0,0);
    for(let i=1;i<=Number(req.params.days);i++) {
      let slotDate = moment(d).add(i, 'd').format('DD-MM-YYYY');
        PLACES.forEach(item => {
          SLOTS.forEach(slot => {
            var newslot = new Slot ({
              place:item,
              slot_time: slot,
              slot_date: slotDate,
              created_at: Date.now()
            });
            newslot.save();
          })
          
        })
      
    }
    res.send({msg: 'Slots added'});
  }
};

module.exports = slotController;
