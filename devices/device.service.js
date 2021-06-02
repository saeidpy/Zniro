const db = require("_helpers/db");
const { isPhoneNumber } = require("../utils/utils");
const Device = db.Device;

module.exports = {
  getAll,
  getAllByOwner,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Device.find();
}

async function getAllByOwner(req) {
  return await Device.find({ owner: req.user.sub });
}

async function getById(id) {
  return await Device.findById(id);
}

async function create(userParam) {
  // phone number validate to
  if (!isPhoneNumber(userParam.phoneNumber)) {
    throw 'Phone Number "' + userParam.phoneNumber + '" is incorrect';
  }

  // validate
  if (await Device.findOne({ phoneNumber: userParam.phoneNumber })) {
    throw 'Device "' + userParam.phoneNumber + '" is already taken';
  }

  const device = new Device(userParam);

  // save user
  await device.save();
}

async function update(id, userParam) {
  const device = await Device.findById(id);

  // validate
  if (!device) throw "User not found";

  // copy userParam properties to user
  Object.assign(device, userParam);

  await device.save();
}

async function _delete(id) {
  await Device.findByIdAndRemove(id);
}
