const express = require("express");
const {
 getAllTables,createTable,getByIdTable,updateTable,deleteTable
} = require("../controllers/tableController");

const router = express.Router();

router.get('/', getAllTables);

router.get('/:id', getByIdTable);

router.post('/', createTable);

router.put('/:id', updateTable);

router.delete('/:id', deleteTable);

module.exports = router;
