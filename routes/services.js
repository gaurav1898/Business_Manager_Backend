const express = require('express');
const router = express.Router();
const ServiceController = require('../controller/ServiceController')
const permits = require('../handler/oauthorization');

router.get('/', permits('Su', 'Admin'), ServiceController.GetAll);
router.get('/getByStatus/:status', permits('Su', 'Admin'), ServiceController.GetByStatus);
router.get('/count/', permits('Su', 'Admin'), ServiceController.GetCount);
router.get('/:id', permits('Su', 'Admin'), ServiceController.GetById);
router.get('/statusUpdate/:_id', permits('Su', 'Admin'), ServiceController.UpdateStatus);

router.post('/', permits('Su', 'Admin'), ServiceController.Add);

router.patch("/:id", permits('Su', 'Admin'), ServiceController.Update);

router.delete("/:id", permits("Su", "Admin"), ServiceController.DeActivateUser);

module.exports = router;