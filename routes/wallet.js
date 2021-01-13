const express = require('express');
const router = express.Router();
const WalletController = require('../controller/WalletController')
const permits = require('../handler/oauthorization');

router.get('/', permits('Su', 'Admin'), WalletController.GetAll);
router.get('/getByStatus/:status', permits('Su', 'Admin'), WalletController.GetByStatus);
router.get('/count/', permits('Su', 'Admin'), WalletController.GetCount);
router.get('/:id', permits('Su', 'Admin'), WalletController.GetById);
router.get('/statusUpdate/:_id', permits('Su', 'Admin'), WalletController.UpdateStatus);

router.post('/addWallet', permits('Su', 'Admin'), WalletController.Add);
// router.post('/addWallet/:id', WalletController.Add);

router.patch("/:id", permits('Su', 'Admin'), WalletController.Update);

router.delete("/:id", permits("Su", "Admin"), WalletController.DeActivateUser);


// router.get('/getByWarehouse/:assignedWarehouse', permits("Su", "Admin"), WalletController.GetWalletByWarehouse);
// router.get('/getWarehouseByWallet/:_id', permits("Su", "Admin"), WalletController.GetWarehouseByWallet);




module.exports = router;