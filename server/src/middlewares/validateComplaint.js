module.exports = (req, res, next) => {
    const { full_name, phone_number, title, description } = req.body;

    if (!full_name)    return res.status(400).json({ error: "ข้อมูลไม่ครบ! โปรดระบุ full_name" });
    if (!phone_number) return res.status(400).json({ error: "ข้อมูลไม่ครบ! โปรดระบุ phone_number" });
    if (!title)        return res.status(400).json({ error: "ข้อมูลไม่ครบ! โปรดระบุ title" });
    if (!description)  return res.status(400).json({ error: "ข้อมูลไม่ครบ! โปรดระบุ description" });

    next();
};