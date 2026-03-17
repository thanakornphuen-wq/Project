-- 1. ตารางหมวดหมู่ (Categories)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE -- เช่น 'ไฟฟ้า', 'ประปา', 'ขยะ', 'ถนน'
) ENGINE=InnoDB;

-- 2. ตารางผู้ใช้งาน (Users)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. ตารางเรื่องร้องเรียน (Complaints) - จุดรวมพล
DROP TABLE IF EXISTS complaints;
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,               -- ใครแจ้ง (FK)
    category_id INT,           -- แจ้งเรื่องประเภทไหน (FK)
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    status ENUM('pending', 'processing', 'resolved') DEFAULT 'pending',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- แถม: ใส่ข้อมูลหมวดหมู่เริ่มต้นให้เลย
INSERT INTO categories (name) VALUES ('ไฟฟ้า'), ('ประปา'), ('ขยะ'), ('ถนน'), ('ความสะอาด');