-- สร้าง Database
CREATE DATABASE IF NOT EXISTS webdb;
USE webdb;

-- ลบตารางเก่า (เรียงลำดับให้ถูกเพื่อไม่ให้ติด Foreign Key)
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- 1. ตาราง Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2. ตาราง Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. ตาราง Complaints
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_id INT,
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

-- 4. ใส่ข้อมูลเริ่มต้น (Seed Data) แบบที่อาจารย์ชอบทำ
INSERT INTO categories (name) VALUES 
('ไฟฟ้า'), ('ประปา'), ('ขยะ'), ('ถนน'), ('ความสะอาด');

INSERT INTO users (username, password, full_name, role) 
VALUES ('admin', '1234', 'System Admin', 'admin');