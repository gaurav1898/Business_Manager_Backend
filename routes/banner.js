const express = require('express');
const router = express.Router();
const BannerController = require('../controller/BannerController')
const permits = require('../handler/oauthorization');



router.get('/', permits('Su', 'Admin'), BannerController.GetAll);
router.get('/getByStatus/:status', permits('Su', 'Admin'), BannerController.GetByStatus);
router.get('/count/', permits('Su', 'Admin'), BannerController.GetCount);
router.get('/:id', permits('Su', 'Admin'), BannerController.GetById);
router.get('/statusUpdate/:_id', permits('Su', 'Admin'), BannerController.UpdateStatus);

router.post('/', permits('Su', 'Admin'), BannerController.Add);

router.patch("/:id", permits('Su', 'Admin'), BannerController.Update);

router.delete("/:id", permits("Su", "Admin"), BannerController.DeActivateUser);

module.exports = router;