const pool = require('../config/db');

const User = {
    create: async (userData) => {
        const sql = "INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)";
        const [result] = await pool.execute(sql, [userData.username, userData.password, userData.full_name, userData.role || 'user']);
        return result;
    },
    findByUsername: async (username) => {
        const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0];
    }
};

module.exports = User;