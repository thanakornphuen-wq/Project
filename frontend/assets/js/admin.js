const API_URL = "http://localhost:8000/complaints";

const statusLabel = {
    pending:    "รอดำเนินการ",
    processing: "กำลังดำเนินการ",
    resolved:   "เสร็จสิ้น"
};

async function loadComplaints() {
    const loadingMsg  = document.getElementById("loadingMsg");
    const tableWrapper = document.getElementById("tableWrapper");
    const emptyMsg    = document.getElementById("emptyMsg");
    const tbody       = document.getElementById("adminList");

    try {
        const res  = await fetch(API_URL);
        const data = await res.json();

        loadingMsg.style.display = "none";

        if (!data.length) {
            emptyMsg.style.display = "block";
            return;
        }

        tableWrapper.style.display = "block";
        tbody.innerHTML = "";

        data.forEach((item, index) => {
            const statusClass = `status-${item.status}`;
            const desc = item.description
                ? (item.description.length > 60 ? item.description.slice(0, 60) + "…" : item.description)
                : "-";

            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><strong>${item.title}</strong></td>
                    <td style="color:#666; font-size:0.9em;">${desc}</td>
                    <td style="font-size:0.9em;">👤 ${item.full_name || '-'}<br>📞 ${item.phone_number || '-'}</td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            ${statusLabel[item.status] || item.status}
                        </span>
                    </td>
                    <td>
                        ${item.status !== "pending"
                            ? `<button class="action-btn btn-pending" onclick="changeStatus(${item.id}, 'pending')">รอดำเนินการ</button>`
                            : ""}
                        ${item.status !== "processing"
                            ? `<button class="action-btn btn-processing" onclick="changeStatus(${item.id}, 'processing')">กำลังทำ</button>`
                            : ""}
                        ${item.status !== "resolved"
                            ? `<button class="action-btn btn-resolved" onclick="changeStatus(${item.id}, 'resolved')">เสร็จสิ้น</button>`
                            : ""}
                    </td>
                </tr>`;
        });

    } catch (err) {
        loadingMsg.innerHTML = "⚠️ โหลดข้อมูลไม่สำเร็จ (เปิด Backend หรือยัง?)";
        loadingMsg.style.color = "#dc3545";
    }
}

async function changeStatus(id, newStatus) {
    try {
        const res = await fetch(`${API_URL}/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        if (res.ok) {
            showToast(`✅ เปลี่ยนเป็น "${statusLabel[newStatus]}" แล้ว!`);
            loadComplaints(); // โหลดตารางใหม่
        } else {
            showToast("❌ อัปเดตไม่สำเร็จ", true);
        }
    } catch (err) {
        showToast("⚠️ เชื่อมต่อ Server ไม่ได้", true);
    }
}

function showToast(msg, isError = false) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.style.background = isError ? "#dc3545" : "#28a745";
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3000);
}

loadComplaints();
