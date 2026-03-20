const express = require('express');
const router = express.Router();
const controller = require('../controllers/complaintsController');
const validateComplaint = require('../middlewares/validateComplaint');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', controller.getAll);  
router.get('/:id', controller.getById);//ประชาชนใช้ติดตามสถานะเรื่องของตัวเอง
router.delete('/:id', controller.delete); // ใช้ DELETE สำหรับลบ
router.post('/', upload.single('image'), validateComplaint, controller.create);//ประชาชนแจ้งเรื่อง
router.put('/:id', validateComplaint, controller.update);//แก้ไขหัวข้อ/รายละเอียด
router.patch('/:id/status',controller.updateStatus);//อัปเดตสถานะสำหรับเจ้าหน้าที่

module.exports = router;