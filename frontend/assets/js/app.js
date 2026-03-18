const API_URL = "http://localhost:8000";

document
  .getElementById("complaintForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // ดึงค่าจากหน้าเว็บ
    formData.append("title", document.getElementById("title").value);
    formData.append(
      "description",
      document.getElementById("description").value,
    );

    // ข้อมูลจำลอง (ส่งค่าเดียวพอเพื่อน!)
    formData.append("user_id", 1);
    formData.append("category_id", 1);
    formData.append("location", "กรุงเทพ");
    formData.append("contact_phone", "0123456789");

    // จัดการไฟล์รูปภาพ
    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // ลบ formData.append('user_id', 1) ตัวเดิมที่อยู่ตรงนี้ออกไปแล้วนะ!

    try {
      const response = await fetch(`${API_URL}/complaints`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("ส่งเรื่องสำเร็จแล้วเพื่อนรัก!");
        location.reload();
      } else {
        // แก้จาก data.message เป็น data.error หรือ data (เพื่อให้เห็นข้อความ error จริงจาก backend)
        alert(
          "พังตรงนี้: " + (data.error || data.message || JSON.stringify(data)),
        );
      }
    } catch (err) {
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ เช็คว่ารัน node index.js หรือยัง?");
    }
  });
