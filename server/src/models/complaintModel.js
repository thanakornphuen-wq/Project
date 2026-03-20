const db = require('../config/db'); 
const pool = require('../config/db');

const Complaint = {
    create: async (data) => {
        const sql = `INSERT INTO complaints 
            (user_id, title, description, image_url) 
            VALUES (?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [
            data.user_id || null,
            data.title,
            data.description,
            data.image_url
        ]);
        return result;
    },
    getAll: async () => {
        const sql = `
            SELECT c.*, u.full_name, u.phone_number
            FROM complaints c
            LEFT JOIN users u ON c.user_id = u.id
            ORDER BY c.created_at DESC
        `;
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