const { Router } = require("express");

const partnerRoutes = require("./partnerRoutes.js");
const contactsRoutes = require("./contactsRoutes.js");

const router = Router();

router.use("/partner", partnerRoutes);
router.use("/contact", contactsRoutes);

module.exports = router;
