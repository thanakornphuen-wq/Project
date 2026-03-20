const multer = require('multer');
const path = require('path');

// ตั้งค่าการจัดเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // เก็บไว้ที่โฟลเดอร์ uploads
  },
  filename: (req, file, cb) => {
    // ตั้งชื่อไฟล์ใหม่: วันที่-ชื่อไฟล์เดิม (ป้องกันชื่อซ้ำ)
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('ไม่ใช่ไฟล์รูปภาพ! กรุณาอัปโหลดเฉพาะรูป'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // จำกัดขนาด 5MB
});

module.exports = upload;