const express = require("express");
const router = express.Router()
const admin = require("./admin")
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.get('/', (req, res) => {
    res.send("Welcome to Learnin API")
})

router.use('/api', admin)
module.exports = router