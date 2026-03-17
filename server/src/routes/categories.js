const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ดึงหมวดหมู่ทั้งหมด: GET http://localhost:8000/categories
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM categories");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;