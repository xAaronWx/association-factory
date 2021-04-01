const { Router } = require("express");
const { Address } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

router.post("/create", validateSession, function (req, res) {
  console.log(req.user.id);
  const addressEntry = {
    street: req.body.street,
    state: req.body.state,
    zipcode: req.body.zipcode,
    city: req.body.city,
    userId: req.user.id,
  };
  Address.create(addressEntry)
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
});

// this can be used to find a particular owner to an address
router.get("/get", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "user",
  };
  Address.findOne(query)
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
