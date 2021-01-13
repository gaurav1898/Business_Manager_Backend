const express = require('express');
const router = express.Router();
const WarehouseController = require('../controller/WarehouseController')
const permits = require('../handler/oauthorization');
const fileUpload = require('../handler/UploadHandler/FileUpload');
const bannerUpload = require('../handler/UploadHandler/FileUpload');
const staffUpload = require('../handler/UploadHandler/FileUpload');
const companyUpload = require('../handler/UploadHandler/FileUpload');
const CompanyController = require('../controller/CustomerController');
const StaffController = require('../controller/StaffController');

router.post('/', permits('Su', 'Admin'), fileUpload.upload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});


router.post('/banner', permits('Su', 'Admin'), fileUpload.bannerUpload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});

router.post('/staff', permits('Su', 'Admin'), fileUpload.staffUpload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});

router.post('/company', permits('Su', 'Admin'), fileUpload.companyUpload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});

module.exports = router;