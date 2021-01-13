const multer = require('multer');
const mkdirp = require('mkdirp')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/warehouse';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const staffStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/staff';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const bannerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/banner';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const companyStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/company';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1000
    },
    fileFilter: fileFilter
});

const bannerUpload = multer({
    storage: bannerStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const staffUpload = multer({
    storage: staffStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const companyUpload = multer({
    storage: companyStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports.upload = upload;
module.exports.bannerUpload = bannerUpload;
module.exports.staffUpload = staffUpload;
module.exports.companyUpload = companyUpload;