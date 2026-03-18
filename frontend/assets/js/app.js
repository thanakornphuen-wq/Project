const API_URL = "http://localhost:8000";

// ผูก event listener หลัง DOM โหลดเสร็จ (ปลอดภัยกว่า onclick ใน HTML)
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault(); // กัน browser ทำ default action ทุกกรณี
            sendComplaint();
        });
    }

    // กัน form submit ด้วย Enter หรือ Go Live trigger
    const form = document.getElementById("complaintForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            sendComplaint();
        });
    }
});

async function sendComplaint() {
    const submitBtn = document.getElementById("submitBtn");
    const msgDiv = document.getElementById("responseMessage");
    const complaintForm = document.getElementById("complaintForm");

    // ซ่อน message เก่าก่อน
    msgDiv.style.display = "none";
    msgDiv.innerHTML = "";

    // ── 1. Validate ฝั่ง Frontend ก่อนส่งเลย ──
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title && !description) {
        showMessage(msgDiv, "⚠️ กรุณากรอกหัวข้อเรื่องและรายละเอียดให้ครบก่อนส่ง", "error");
        return;
    }
    if (!title) {
        showMessage(msgDiv, "⚠️ กรุณากรอก หัวข้อเรื่อง ให้ครบก่อนส่ง", "error");
        return;
    }
    if (!description) {
        showMessage(msgDiv, "⚠️ กรุณากรอก รายละเอียด ให้ครบก่อนส่ง", "error");
        return;
    }

    // ── 2. ล็อกปุ่มและเตรียมส่ง ──
    submitBtn.disabled = true;
    submitBtn.innerText = "⏳ กำลังส่งข้อมูล...";

    // ── 3. เตรียม FormData ──
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
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

        // อ่าน response body ทุกกรณี
        const result = await response.json().catch(() => null);

        if (response.ok) {
            // ✅ สำเร็จ: โชว์แถบเขียวค้างไว้ ไม่รีเฟรช
            showMessage(msgDiv, "✅ ส่งข้อมูลแจ้งเหตุสำเร็จแล้ว!", "success");
            complaintForm.reset();
        } else {
            // ❌ ดึง error message จาก server มาแสดงตรงๆ
            const errMsg = result?.error || result?.message || "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";
            showMessage(msgDiv, `❌ ${errMsg}`, "error");
        }
    } catch (err) {
        // ⚠️ ติดต่อเซิร์ฟเวอร์ไม่ได้
        console.error("Error:", err);
        showMessage(msgDiv, "⚠️ เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ (เปิด Backend หรือยัง?)", "error");
    } finally {
        // คืนค่าปุ่มเสมอ
        submitBtn.disabled = false;
        submitBtn.innerText = "ส่งข้อมูลแจ้งเหตุ";
    }
}

// ── Helper: แสดง message แบบ reusable ──
function showMessage(el, text, type) {
    el.innerHTML = text;
    el.className = `mt-3 ${type === "success" ? "msg-success" : "msg-error"}`;
    el.style.display = "block";
    // scroll ขึ้นไปให้เห็น message
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
// ผูก event ที่นี่แทน onclick inline ใน HTML — ป้องกัน form submit ได้แน่นอนกว่า
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("submitBtn");
    if (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            sendComplaint();
        });
    }

    const form = document.getElementById("complaintForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
        });
    }
});
