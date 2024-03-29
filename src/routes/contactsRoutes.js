const { Router } = require("express");

const {
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactsController");

const router = Router();

router
  .get("/", getAllContacts)
  .get("/id/:id", getContactById)
  .put("/delete/:id", deleteContact);

module.exports = router;
