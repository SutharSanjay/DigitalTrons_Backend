//import all require dependencies
const formidable = require("formidable");
const _ = require("lodash");
//import require models
const Slot = require("../model/slots");

//exports routes controller
exports.getSlotByID = (req, res, next, id) => {
  try {
    Slot.findById(id).exec((err, slot) => {
      if (err || !slot) {
        return res.status(400).json({
          err: "No School Admin was found in Database",
        });
      }
      req.slot = slot;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createSlot = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        err: "Problem With Data! Please check your data",
      });
    }

    let slot = new Slot(fields);
    try {
      slot.save((err, slot) => {
        if (err) {
          return res.status(400).json({
            err: "Please Check Data!",
          });
        }
        res.json(slot);
      });
    } catch (err) {
      return res.status(400).json({
        err: "Please Check Data!",
      });
    }
  });
};

exports.getAllCustomSlot = (req, res) => {
  const phone = req.query.phone;
  Slot.find({ contactPhone: phone }).exec(function (err, data) {
    if (!data || err) {
      return res.status(403).json({
        error: "No Match is Found in Database",
      });
    } else {
      return res.json(data);
    }
  });
};

exports.getSlot = (req, res) => {
  return res.json(req.slot);
};

exports.updateSlot = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        err: "Problem With Data!",
      });
    }

    let slot = req.slot;
    slot = _.extend(slot, fields);
    try {
      slot.save((err, slot) => {
        if (err) {
          return res.status(400).json({
            err: "Update slot in Database is Failed",
          });
        }
        res.json(slot);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

exports.getAllSlot = (req, res) => {
  try {
    Slot.find({})
      .sort({ createdAt: -1 })
      .then((slot, err) => {
        if (err || !slot) {
          return res.status(400).json({
            err: "Database Don't Have Slots",
          });
        }
        return res.json(slot);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSlot = (req, res) => {
  let slot = req.slot;
  try {
    slot.remove((err, slot) => {
      if (err || !slot) {
        return res.status(400).json({
          err: "Can't Able To Delete slot",
        });
      }
      return res.json({
        Massage: `${slot.startTime} is Deleted SuccessFully`,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.removeAllSlot = (req, res) => {
  try {
    Slot.remove({}, (err, data) => {
      if (err || !data) {
        console.log(err)
        return res.status(400).json({
          err: "Database Don't Have Slots",
        });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
