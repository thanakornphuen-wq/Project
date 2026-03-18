const API_URL = 'http://localhost:8000';
let allData = []; // ✅ ประกาศไว้ข้างนอกเพื่อเก็บข้อมูลทั้งหมดไว้ใช้ค้นหา

async function loadComplaints() {
    try {
        const response = await fetch(`${API_URL}/complaints`);
        
        if (!response.ok) {
            throw new Error('เรียกข้อมูลไม่สำเร็จ');
        }

        allData = await response.json(); // ✅ เก็บข้อมูลที่ได้ลงใน allData
        renderTable(allData); // ✅ เรียกฟังก์ชันวาดตารางโดยส่งข้อมูลทั้งหมดเข้าไป

    } catch (error) {
        console.error('Error:', error);
        const tableBody = document.getElementById('complaintList');
        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ หรือโค้ดมีปัญหา</td></tr>';
        }
    }
}

// ✅ ฟังก์ชันสำหรับวาดตาราง (แยกออกมาเพื่อให้เรียกใช้ซ้ำตอนค้นหาได้)
function renderTable(dataToRender) {
    const tableBody = document.getElementById('complaintList');
    if (!tableBody) return;
    
    tableBody.innerHTML = ''; 

    if (dataToRender.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">ไม่พบข้อมูลการแจ้งเหตุ</td></tr>';
        return;
    }

    dataToRender.forEach((item, index) => {
        const row = document.createElement('tr');
        const imageUrl = item.image_url ? `${API_URL}/uploads/${item.image_url}` : null;
        
        // ปรับสถานะเป็นตัวพิมพ์เล็กเพื่อใช้กับ CSS Class
        const statusClass = item.status.toLowerCase();

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.title}</strong><br><small>${item.description}</small></td>
            <td>${item.location}</td>
            <td>${item.category_name || 'ทั่วไป'}</td>
            <td><span class="badge ${statusClass}">${item.status.toUpperCase()}</span></td>
            <td>
                ${imageUrl 
                    ? `<a href="${imageUrl}" target="_blank" rel="noopener noreferrer">
                         <img src="${imageUrl}" class="img-preview" alt="รูปแจ้งเหตุ">
                       </a>` 
                    : '<span style="color:#ccc;">ไม่มีรูป</span>'}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ✅ ระบบค้นหา (พิมพ์ปุ๊บ กรองปั๊บ)
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    
    const filteredData = allData.filter(item => 
        item.title.toLowerCase().includes(searchText) || 
        item.location.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
    );
    
    renderTable(filteredData); // วาดตารางใหม่ด้วยข้อมูลที่กรองแล้ว
});

// ✅ ระบบกรองสถานะ
document.getElementById('statusFilter')?.addEventListener('change', (e) => {
    const selectedStatus = e.target.value.toLowerCase();
    
    const filteredData = selectedStatus === 'all' 
        ? allData 
        : allData.filter(item => item.status.toLowerCase() === selectedStatus);
        
    renderTable(filteredData);
});

// เรียกใช้งานครั้งแรก
loadComplaints();