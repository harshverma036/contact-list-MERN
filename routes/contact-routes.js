const router = require("express").Router();
const contact = require("../modules/contact-module");

router.get("/contacts", (req, res) => {
  contact
    .find()
    .sort({ name: -1 })
    .then((allContact) => res.json(allContact))
    .catch((err) => res.json(err));
});

router.post("/contacts", (req, res) => {
  const { name } = req.body;
  const newContact = new contact({
    name,
  });
  newContact
    .save()
    .then((newcontact) => res.json(newcontact))
    .catch((err) => res.json(err));
});

router.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  contact
    .findByIdAndDelete(id)
    .then((deletedContact) => res.json(deletedContact))
    .catch((err) => res.json(err));
});

module.exports = router;
