const API_URL = "http://localhost:8000";
let allData = []; // ✅ ประกาศไว้ข้างนอกเพื่อเก็บข้อมูลทั้งหมดไว้ใช้ค้นหา

async function loadComplaints() {
  try {
    const response = await fetch(`${API_URL}/complaints`);

    if (!response.ok) {
      throw new Error("เรียกข้อมูลไม่สำเร็จ");
    }

    allData = await response.json(); // ✅ เก็บข้อมูลที่ได้ลงใน allData
    renderTable(allData); // ✅ เรียกฟังก์ชันวาดตารางโดยส่งข้อมูลทั้งหมดเข้าไป
  } catch (error) {
    console.error("Error:", error);
    const tableBody = document.getElementById("complaintList");
    if (tableBody) {
      tableBody.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:red;">เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ หรือโค้ดมีปัญหา</td></tr>';
    }
  }
}

const statusLabel = {
  pending: "รอดำเนินการ",
  processing: "กำลังดำเนินการ",
  resolved: "เสร็จสิ้น",
};

function renderTable(dataToRender) {
  const tableBody = document.getElementById("complaintList");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (dataToRender.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="4" style="text-align:center;">ไม่พบข้อมูลการแจ้งเหตุ</td></tr>';
    return;
  }

  dataToRender.forEach((item, index) => {
    const row = document.createElement("tr");
    const imageUrl = item.image_url
      ? `${API_URL}/uploads/${item.image_url}`
      : null;
    const statusClass = item.status.toLowerCase();
    const statusText = statusLabel[statusClass] || item.status;

    row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <strong>${item.title}</strong><br>
                <small>${item.description}</small><br>
                <small style="color:#888;">👤 ${item.full_name || "-"} | 📞 ${item.phone_number || "-"}</small>
            </td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
                ${
                  imageUrl
                    ? `<a href="${imageUrl}" target="_blank" rel="noopener noreferrer">
                         <img src="${imageUrl}" class="img-preview" alt="รูปแจ้งเหตุ">
                       </a>`
                    : '<span style="color:#ccc;">ไม่มีรูป</span>'
                }
            </td>
        `;
    tableBody.appendChild(row);
  });
}


document.getElementById("searchInput")?.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  const filteredData = allData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      (item.full_name && item.full_name.toLowerCase().includes(searchText)) ||
      (item.phone_number &&
        item.phone_number.toLowerCase().includes(searchText)),
  );

  renderTable(filteredData); // วาดตารางใหม่ด้วยข้อมูลที่กรองแล้ว
});


document.getElementById("statusFilter")?.addEventListener("change", (e) => {
  const selectedStatus = e.target.value.toLowerCase();

  const filteredData =
    selectedStatus === "all"
      ? allData
      : allData.filter((item) => item.status.toLowerCase() === selectedStatus);

  renderTable(filteredData);
});

// เรียกใช้งานครั้งแรก
loadComplaints();
