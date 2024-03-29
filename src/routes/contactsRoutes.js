const { Router } = require("express");

const {
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");

const router = Router();

router
  .get("/", getAllContacts)
  .get("/id/:id", getContactById)
  .put("/delete/:id", deleteContact);

module.exports = router;
