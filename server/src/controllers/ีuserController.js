const User = require('../models/userModel');
const db = require('../config/db'); // ดึง pool มาใช้สำหรับกรณี query ตรง

exports.register = async (req, res) => {
    try {
        const { username, password, full_name, role } = req.body;
        
        // ตรวจสอบก่อนว่ามี username นี้หรือยัง
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: "ชื่อผู้ใช้นี้มีคนใช้แล้ว" });
        }

        const result = await User.create({ username, password, full_name, role });
        res.status(201).json({ 
            message: "สมัครสมาชิกสำเร็จ", 
            userId: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // ใช้ db.query (เพราะเราใช้ mysql2/promise ใน db.js)
        const [rows] = await db.query("SELECT id, username, full_name, role FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};