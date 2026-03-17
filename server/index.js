const app = require("./src/app");
const pool = require("./src/config/db");
require("dotenv").config();

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  try {
    // ทดสอบการเชื่อมต่อ Database เฉยๆ ว่าต่อติดไหม
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release(); // คืนการเชื่อมต่อกลับเข้า Pool

    console.log(`🚀 Server run at http://localhost:${port}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
});