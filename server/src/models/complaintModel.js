const db = require('../config/db'); // นี่คือตัว pool ที่เรา export มา
const pool = require('../config/db');

const Complaint = {
    create: async (data) => {
        const sql = `INSERT INTO complaints 
            (user_id, category_id, title, description, location, contact_phone, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        // ส่งค่าไปให้ครบตามลำดับ
        const [result] = await pool.execute(sql, [
            data.user_id || null, 
            data.category_id || null, 
            data.title, 
            data.description, 
            data.location, 
            data.contact_phone, 
            data.image_url
        ]);
        return result;
    },
    // ดึงข้อมูลทั้งหมด (เพื่อให้เจ้าหน้าที่ดู)
    getAll: async () => {
        const sql = "SELECT * FROM complaints ORDER BY created_at DESC";
        const [rows] = await db.execute(sql);
        return rows;
    },
    // ดึงข้อมูลตาม ID (สำหรับประชาชนไว้ติดตามสถานะ)
    getById: async (id) => {
        const sql = "SELECT * FROM complaints WHERE id = ?";
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    },
    // อัปเดตสถานะ (สำหรับเจ้าหน้าที่)
    updateStatus: async (id, status) => {
        const sql = "UPDATE complaints SET status = ? WHERE id = ?";
        const [result] = await db.execute(sql, [status, id]);
        return result;
    }
};

module.exports = Complaint;