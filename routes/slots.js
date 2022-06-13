//import all require dependencies
const express = require("express");
const router = express.Router();

//require controller module
const {
  getSlot,
  updateSlot,
  createSlot,
  deleteSlot,
  getAllSlot,
  getAllCustomSlot,
  getSlotByID,
  removeAllSlot
} = require("../controller/slots");

//param
router.param("slotID", getSlotByID);

//slot routes
router.post("/create", createSlot);
router.put("/update/:slotID", updateSlot);
router.get("/get/all", getAllSlot);
router.get("/get/custom/all", getAllCustomSlot);
router.get("/individual/slot/get/:slotID", getSlot);
router.delete("/delete/:slotID", deleteSlot);
router.delete("/all/remove", removeAllSlot);
//exports all route to main index
module.exports = router;
