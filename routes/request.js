const express = require('express');
const router = express.Router();
const RequestController = require('../controller/RequestController')
const permits = require('../handler/oauthorization');

router.get('/', permits('Su', 'Admin'), RequestController.GetAll);
router.get('/getByStatus/:status', permits('Su', 'Admin'), RequestController.GetByStatus);
router.get('/count/', permits('Su', 'Admin'), RequestController.GetCount);
router.get('/:id', permits('Su', 'Admin'), RequestController.GetById);
router.get('/statusUpdate/:_id', permits('Su', 'Admin'), RequestController.UpdateStatus);

router.post('/', permits('Su', 'Admin'), RequestController.Add);

router.patch("/:id", permits('Su', 'Admin'), RequestController.Update);


router.delete("/:id", permits("Su", "Admin"), RequestController.DeActivateUser);

router.get('/requestStatus/:_id', permits('Su', 'Admin'), RequestController.UpdateServiceBoy);

router.put('/updateServiceBoy/:id', permits('Su', 'Admin'), RequestController.AssignServiceBoy);

router.get('/getByRequestStatus/:requestStatus', permits("Su", "Admin"), RequestController.GetByRequestStatus);

router.get('/getInProgressRequestByServiceBoy/:assignToServiceBoy', permits("Su", "Admin"), RequestController.GetInProgressRequestByServiceBoy);

router.get('/getCompletedRequestByServiceBoy/:assignToServiceBoy', permits("Su", "Admin"), RequestController.GetCompletedRequestByServiceBoy);

router.get('/getCancelledRequestByServiceBoy/:assignToServiceBoy', permits("Su", "Admin"), RequestController.GetCancelledRequestByServiceBoy);

router.get('/getAcceptedCustomersByRequest/:customerName', permits("Su", "Admin"), RequestController.GetAcceptedRequestByCustomer);

router.get('/getInProgressCustomersByRequest/:customerName', permits("Su", "Admin"), RequestController.GetInProgressRequestByCustomer);

router.get('/getCompletedCustomersByRequest/:customerName', permits("Su", "Admin"), RequestController.GetCompletedRequestByCustomer);

router.get('/getCancelledCustomersByRequest/:customerName', permits("Su", "Admin"), RequestController.GetAcceptedRequestByCustomer);

module.exports = router;