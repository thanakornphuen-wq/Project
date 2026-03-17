const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController'); // ใส่ .js ไปด้วยเลยครับ
// ทางเดินสำหรับสมัครสมาชิก: POST http://localhost:8000/users/register
router.post("/register", usersController.register);

// ทางเดินสำหรับดูรายชื่อทั้งหมด (เผื่อไว้เช็ก): GET http://localhost:8000/users
router.get("/", usersController.getAllUsers);

module.exports = router;
