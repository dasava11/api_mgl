const { Router } = require("express");

const {
  getAllContacts,
  getContactById,
  postContact,
  deleteContact,
} = require("../controllers/contactController");

const router = Router();

router
  .get("/", getAllContacts)
  .get("/id/:id", getContactById)
  .post("/", postContact)
  .put("/delete/:id", deleteContact);

module.exports = router;
