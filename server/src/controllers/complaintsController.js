//เปลี่ยน controllers ต้องเปลี่ยน Routes เพื่อเรียกใช้ฟังก์ชันใหม่
const Complaint = require('../models/complaintModel');

// 1. ดึงข้อมูลทั้งหมด
exports.getAll = async (req, res) => {
    try {
        const rows = await Complaint.getAll(); // ใช้ Model แทนการเขียน query ตรงๆ
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. ดึงข้อมูลตาม ID (ใหม่! สำหรับประชาชนติดตามเรื่อง)
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Complaint.getById(id);
        if (!data) return res.status(404).json({ message: "ไม่พบข้อมูล" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. สร้างเรื่องร้องเรียน (รองรับรูปภาพ)
exports.create = async (req, res) => {
    try {
        const image_url = req.file ? req.file.filename : null;
        
        // ดึง user_id และ category_id ออกมาจาก req.body
        const { user_id, category_id, title, description, location, contact_phone } = req.body;

        const result = await Complaint.create({
            user_id,
            category_id,
            title,
            description,
            location,
            contact_phone,
            image_url
        });

        res.status(201).json({ 
            message: "บันทึกเรื่องร้องเรียนสำเร็จ", 
            id: result.insertId 
        });
    } catch (err) {
    console.error("🔥 บักอยู่ตรงนี้เพื่อน!: ", err); // เพิ่มบรรทัดนี้!!!
    res.status(500).json({ error: err.message });
}
};

// 4. อัปเดตสถานะ (ใหม่! สำหรับเจ้าหน้าที่)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // รับค่า status เช่น 'processing', 'resolved'

        const result = await Complaint.updateStatus(id, status);
        
        if (result.affectedRows === 0) return res.status(404).json({ message: "ไม่พบข้อมูล" });
        res.json({ message: "อัปเดตสถานะสำเร็จ", status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. ลบข้อมูล (Delete)
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = require('../config/db'); // เรียกใช้ pool โดยตรง (ตามที่เราแก้ db.js ไว้)
        const [result] = await pool.execute("DELETE FROM complaints WHERE id=?", [id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ message: "ไม่พบข้อมูล" });
        res.json({ message: "ลบสำเร็จ" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, contact_phone } = req.body;
        const pool = require('../config/db'); // ดึง pool มาใช้ตรงๆ
        
        const sql = "UPDATE complaints SET title=?, description=?, location=?, contact_phone=? WHERE id=?";
        const [result] = await pool.execute(sql, [title, description, location, contact_phone, id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ message: "ไม่พบข้อมูล" });
        res.json({ message: "อัปเดตข้อมูลสำเร็จ" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};