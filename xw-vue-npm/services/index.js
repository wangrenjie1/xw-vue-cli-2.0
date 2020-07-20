

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp');
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});  
var upload = multer({
    storage:storage
});

router.post("/create", controller.create);
router.get("/test", controller.test);
router.post("/upload", upload.single('file'), controller.upload);

module.exports = router;