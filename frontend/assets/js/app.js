const API_URL = "http://localhost:8000";

// ประกาศฟังก์ชันให้ตรงกับที่เรียกใน HTML
async function sendComplaint() {
    const submitBtn = document.getElementById("submitBtn");
    const msgDiv = document.getElementById("responseMessage");
    const complaintForm = document.getElementById("complaintForm");

    // 1. ล็อกปุ่มและเตรียมสถานะ
    submitBtn.disabled = true;
    submitBtn.innerText = "⏳ กำลังส่งข้อมูล...";
    msgDiv.style.display = "none";

    // 2. เตรียมข้อมูล (ใช้ FormData เพราะมีรูปภาพ)
    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("user_id", 1);
    formData.append("category_id", 1);
    formData.append("location", "กรุงเทพ");
    formData.append("contact_phone", "0123456789");

    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
        formData.append("image", imageFile);
    }

    try {
        const response = await fetch(`${API_URL}/complaints`, {
            method: "POST",
            body: formData,
            // ห้ามใส่ Content-Type Header เด็ดขาดเมื่อใช้ FormData
        });

        if (response.ok) {
            // ✅ สำเร็จ: โชว์แถบเขียวค้างไว้
            msgDiv.innerHTML = "✅ ส่งข้อมูลสำเร็จแล้วครับเพื่อน!";
            msgDiv.className = "mt-3 msg-success";
            msgDiv.style.display = "block";
            
            // ล้างฟอร์ม
            complaintForm.reset();
        } else {
            // ❌ ผิดพลาดจากเซิร์ฟเวอร์
            msgDiv.innerHTML = "❌ ส่งไม่สำเร็จ (ลองเช็คขนาดไฟล์รูป)";
            msgDiv.className = "mt-3 msg-error";
            msgDiv.style.display = "block";
        }
    } catch (err) {
        // ⚠️ ติดต่อเซิร์ฟเวอร์ไม่ได้
        console.error("Error:", err);
        msgDiv.innerHTML = "⚠️ เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ (เปิด Backend หรือยัง?)";
        msgDiv.className = "mt-3 msg-error";
        msgDiv.style.display = "block";
    } finally {
        // คืนค่าปุ่ม
        submitBtn.disabled = false;
        submitBtn.innerText = "ส่งข้อมูลแจ้งเหตุ";
    }
}