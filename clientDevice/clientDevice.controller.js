const express = require("express");
const router = express.Router();
const clientDeviceService = require("./clientDevice.service");

// routes
router.post("/create", create);
router.get("/:deviceId", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  clientDeviceService
    .create({ ...req.body })
    .then(() => res.json({ message: "Success" }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  clientDeviceService
    .getAllByDeviceId(req)
    .then((devices) => res.json(devices))
    .catch((err) => next(err));
}
function getCurrent(req, res, next) {
  clientDeviceService
    .getById(req.user.sub)
    .then((device) => (device ? res.json(device) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  clientDeviceService
    .getById(req.params.id)
    .then((device) => (device ? res.json(device) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  clientDeviceService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Success" }))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  clientDeviceService
    .delete(req.params.id)
    .then(() => res.json({ message: "Success" }))
    .catch((err) => next(err));
}
