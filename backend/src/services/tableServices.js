const tableModel = require("../models/TableModel");

exports.getAllTables = async () => {
  const table = await tableModel.find({});
  return table;
};

exports.createTable = async (position, status, name) => {
  const table = new tableModel({ position, status, name });
  await table.save();
  return table;
};

exports.getByIdTable = async (id) => {
  const table = await tableModel.findById(id);
  return table;
};

exports.updateTable = async (id, position, status, name) => {
  const table = await tableModel.findByIdAndUpdate(id, {
    position,
    status,
    name,
  });
  return table;
};

exports.deleteTable = async (id) => {
  await tableModel.deleteOne({ _id: id });
};
