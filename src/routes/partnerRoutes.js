const { Router } = require("express");

const {
  getAllPartners,
  getPartnerById,
  postPartner,
  putPartner,
  deletePartner,
} = require("../controllers/partnerController");

const router = Router();

router
  .get("/", getAllPartners)
  .get("/id/:id", getPartnerById)
  .post("/", postPartner)
  .put("/edit/", putPartner)
  .put("/delete/:id", deletePartner);

module.exports = router;
