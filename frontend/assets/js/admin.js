const API_URL = "http://localhost:8000/complaints";

// 1. โหลดรายการมาโชว์
async function loadComplaints() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const tbody = document.getElementById("adminList");
  tbody.innerHTML = "";

  data.forEach((item) => {
    tbody.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td><strong>${item.status}</strong></td>
                <td>
                    <button onclick="changeStatus(${item.id}, 'processing')">🔨 กำลังทำ</button>
                    <button onclick="changeStatus(${item.id}, 'resolved')">✅ เสร็จสิ้น</button>
                </td>
            </tr>
        `;
  });
}

// 2. ฟังก์ชันกดปุ่มเพื่อเปลี่ยนสถานะ
async function changeStatus(id, newStatus) {
  if (!confirm(`ยืนยันการเปลี่ยนสถานะเป็น ${newStatus}?`)) return;

  try {
    const res = await fetch(`${API_URL}/${id}/status`, {
      method: "PATCH", // เปลี่ยนจาก PUT เป็น PATCH ให้ตรงกับ Backend
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      alert("อัปเดตเรียบร้อย!");
      loadComplaints(); // โหลดตารางใหม่
    }
  } catch (err) {
    alert("อัปเดตไม่สำเร็จ");
  }
}

loadComplaints();
