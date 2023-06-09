const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const multer = require('multer')

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('Only jpg, png are allowed'), false)
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single('file')


//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
    //after getting the image from client 
    // we need to save it inside node Server
    // multer library needs to be downloaded
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        } else {
            return res.json({
                success: true,
                image: res.req.file.path,
                filename: res.req.file.filename
            })
        }
    })
});

module.exports = router;
