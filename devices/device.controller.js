const express = require("express");
const router = express.Router();
const deviceService = require("./device.service");
const userService = require("../users/user.service");
const { ROLE } = require("../_helpers/userType");

// routes
router.post("/create", create);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  deviceService
    .create({ owner: req.user.sub, ...req.body })
    .then(() => res.json({ message: "Success" }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) =>
      user.role === ROLE.ADMIN
        ? deviceService
            .getAll()
            .then((devices) => res.json(devices))
            .catch((err) => next(err))
        : deviceService
            .getAllByOwner(req)
            .then((devices) => res.json(devices))
            .catch((err) => next(err))
    )
    .catch((err) => next(err));
}
function getCurrent(req, res, next) {
  deviceService
    .getById(req.user.sub)
    .then((device) => (device ? res.json(device) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  deviceService
    .getById(req.params.id)
    .then((device) => (device ? res.json(device) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  deviceService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Success" }))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  deviceService
    .delete(req.params.id)
    .then(() => res.json({ message: "Success" }))
    .catch((err) => next(err));
}
