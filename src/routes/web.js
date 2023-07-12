const express = require('express');
const router = express.Router();
const { getHomepage, getAbc, addUser, deleteUser } = require('../controllers/homeController')
const { editUser, getUserDetails, addPictures, changeAvatar } = require('../controllers/userDetailsController')
const multer = require("multer");
var appRoot = require('app-root-path');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files ( jpg, jpeg, png, gif) are allowed!';
        return cb(new Error('Only image files ( jpg, jpeg, png, gif) are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { filesize: process.env.MAX_SIZE_AVATAR }
});




router.get('/detail/user/:userId', getUserDetails);
router.post('/add-user', addUser);
router.post('/edit-user', upload.single('avatar'), editUser);
router.post('/delete-user', deleteUser);
router.post('/add-pictures', upload.array('multiple_pictures', 10), addPictures);
router.post('/change-avatar', changeAvatar);
router.get('/abc', getAbc);
router.get('/', getHomepage);

module.exports = router;