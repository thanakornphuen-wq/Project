module.exports = (req, res, next) => {
    const { title, description, location, contact_phone } = req.body;

    // เช็กว่ามีข้อมูลครบไหม
    if (!title || !description || !location || !contact_phone) {
        return res.status(400).json({ 
            error: "ข้อมูลไม่ครบ! โปรดระบุ title, description, location และ contact_phone ให้ครบถ้วน" 
        });
    }

    // ถ้าผ่านหมด ให้ไปที่ Controller ถัดไป
    next(); 
};