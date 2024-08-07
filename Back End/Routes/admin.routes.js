const express = require('express');
const router = express.Router();
const {createAdmin, loginAdmin, logOutAdmin } = require('../controller/admin.controller')


router.post('/create', createAdmin)
router.get('/login', loginAdmin)
router.get('/logout', logOutAdmin);

module.exports = router;
