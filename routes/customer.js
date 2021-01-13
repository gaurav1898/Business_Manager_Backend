const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/CustomerController')
const permits = require('../handler/oauthorization');



router.get('/', permits('Su', 'Admin'), CustomerController.GetAll);
router.get('/getByStatus/:companyStatus', permits('Su', 'Admin'), CustomerController.GetByStatus);
router.get('/count/', permits('Su', 'Admin'), CustomerController.GetCount);
router.get('/:id', permits('Su', 'Admin'), CustomerController.GetById);
router.get('/statusUpdate/:_id', permits('Su', 'Admin'), CustomerController.UpdateStatus);

router.post('/', permits('Su', 'Admin'), CustomerController.Add);

router.patch("/:id", permits('Su', 'Admin'), CustomerController.Update);

router.delete("/:id", permits("Su", "Admin"), CustomerController.DeActivateUser);

router.get('/updateCompanyStatus/:_id', permits('Su', 'Admin'), CustomerController.updateCustomerStatus);

module.exports = router;