const { Router } = require("express");

const partnerRoutes = require("./partnerRoutes.js");

const router = Router();

router.use("/partner", partnerRoutes);

module.exports = router;
