const db = require("_helpers/db");
const ClientDevice = db.ClientDevice;

module.exports = {
  getAll,
  getAllByDeviceId,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await ClientDevice.find();
}

async function getAllByDeviceId(req) {
  return await ClientDevice.find({ deviceId: req.params.deviceId });
}

async function getById(id) {
  return await ClientDevice.findById(id);
}

async function create(userParam) {
  // validate
  if (await ClientDevice.findOne({ name: userParam.name })) {
    throw 'Client Device "' + userParam.name + '" is already taken';
  }

  const device = new ClientDevice(userParam);

  // save user
  await device.save();
}

async function update(id, userParam) {
  const device = await ClientDevice.findById(id);

  // validate
  if (!device) throw "Client device not found";

  // copy userParam properties to user
  Object.assign(device, userParam);

  await device.save();
}

async function _delete(id) {
  await ClientDevice.findByIdAndRemove(id);
}
