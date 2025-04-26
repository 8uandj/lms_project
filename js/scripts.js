// Kiểm tra xem có đang ở trang đăng nhập hay không
if (document.getElementById('login-btn')) {
  const loginBtn = document.getElementById('login-btn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  loginBtn.addEventListener('click', async () => {
    const userId = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Lưu token vào localStorage
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Tên truy cập hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      alert('Lỗi khi đăng nhập. Vui lòng thử lại!');
    }
  });
}

// Lấy phần tử main-content (chỉ áp dụng cho trang index.html)
const mainContent = document.getElementById('main-content');

if (mainContent) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html'; // Chuyển hướng nếu chưa đăng nhập
  }

  // Hàm gọi API với token
  const fetchWithAuth = async (url) => {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
      }
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  // Lấy thông tin người dùng
  const fetchUser = async () => {
    return await fetchWithAuth('http://localhost:5000/api/auth/me');
  };

  // Lấy thông tin tiêm phòng COVID (giả sử có API)
  const fetchVaccinationInfo = async () => {
    return await fetchWithAuth('http://localhost:5000/api/vaccination');
  };

  // Lấy hồ sơ cá nhân
  const fetchProfile = async () => {
    return await fetchWithAuth('http://localhost:5000/api/profile');
  };

  // Lấy kết quả học tập
  const fetchStudyResults = async () => {
    return await fetchWithAuth('http://localhost:5000/api/study-results');
  };

  // Lấy lịch thi
  const fetchExamSchedules = async () => {
    return await fetchWithAuth('http://localhost:5000/api/exam-schedule');
  };

  // Định nghĩa nội dung các trang cho trang chính (index.html)
  const pages = {
    'covid-vaccination': async () => {
  try {
    const user = await fetchUser();
    const vaccinationInfo = await fetchVaccinationInfo();
    return `
      <div class="content-block">
        <h3>KHAI BÁO TIÊM PHÒNG COVID</h3>
        <div class="vaccination-section">
          <div class="form-row">
            <div class="form-group">
              <label>THÔNG TIN CÁ NHÂN</label>
              <p><strong>Mã sinh viên:</strong> ${user.userId}</p>
              <p><strong>Họ và tên:</strong> ${user.fullName}</p>
              <p><strong>Giới tính:</strong> ${vaccinationInfo.gender || 'Nam'}</p>
            </div>
            <div class="form-group">
              <label>THÔNG TIN TIÊM PHÒNG NCOVID</label>
              <select class="filter-select" id="vaccination-status">
                <option value="Chưa tiêm" ${vaccinationInfo.status === 'Chưa tiêm' ? 'selected' : ''}>Chưa tiêm</option>
                <option value="Đã tiêm mũi 1" ${vaccinationInfo.status === 'Đã tiêm mũi 1' ? 'selected' : ''}>Đã tiêm mũi 1</option>
                <option value="Đã tiêm mũi 2" ${vaccinationInfo.status === 'Đã tiêm mũi 2' ? 'selected' : ''}>Đã tiêm mũi 2</option>
              </select>
            </div>
          </div>
          <button class="submit-btn" onclick="saveVaccinationStatus()">Gửi nhận</button>
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Error in covid-vaccination:', err);
    return `<div class="content-block"><p>Lỗi khi tải thông tin tiêm phòng COVID: ${err.message}</p></div>`;
  }
},

    'guide': `
      <div class="content-block">
        <h3>THÔNG BÁO</h3>
        <div class="guide-section">
          <ul>
            <li>Hướng dẫn này là lời khuyên Cổng thông tin đào tạo <span style="color: red;">mới</span></li>
            <li>Hướng dẫn này là lời khuyên email@vnu.edu.vn <span style="color: red;">mới</span></li>
            <li>(Video) Hướng dẫn sử dụng cổng thông tin đào tạo – Đăng ký học năm 2023 <span style="color: red;">mới</span></li>
            <li>Hướng dẫn cài app sinh viên – OneVNU</li>
          </ul>
          <p><strong>Cổng thông tin danh cho sinh viên đạt tốt nghiệp</strong></p>
          <p><a href="https://svotnghiep.vnu.edu.vn" class="link">https://svotnghiep.vnu.edu.vn</a></p>
          <p><strong>Sinh viên theo dõi các điều kiện chuẩn đầu ra tốt nghiệp tại đây</strong></p>
        </div>
      </div>
    `,
    'support-profile': async () => {
  try {
    const user = await fetchUser();
    const profile = await fetchProfile();
    return `
      <div class="content-block">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${profile.avatar || 'https://via.placeholder.com/150?text=Avatar'}" alt="Ảnh cá nhân" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">
        </div>
        <h3>CẬP NHẬT HỒ SƠ SINH VIÊN</h3>
        <div class="tabs">
          <button class="tab-btn active">Thông tin cá nhân</button>
          <button class="tab-btn">Thông tin giảng dạy</button>
          <button class="tab-btn">Quá trình học tập</button>
        </div>
        <div class="profile-section">
          <div class="form-section">
            <h4>NƠI Ở HIỆN NAY</h4>
            <p class="form-hint">Bấm vào đây nếu Nơi ở của bạn là nơi đăng ký thường trú</p>
            <div class="form-row">
              <div class="form-group">
                <label>Quốc gia</label>
                <select id="country-input">
                  <option selected>${profile.address?.country || 'Việt Nam'}</option>
                  <option>Việt Nam</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tình/Thành phố</label>
                <select id="city-input">
                  <option selected>${profile.address?.city || '-- Thái Bình --'}</option>
                  <option>Thái Bình</option>
                </select>
              </div>
              <div class="form-group">
                <label>Quận/Huyện</label>
                <select id="district-input">
                  <option selected>${profile.address?.district || '-- Thành phố Thái Bình --'}</option>
                  <option>Thành phố Thái Bình</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Phường/Xã</label>
                <input type="text" id="ward-input" value="${profile.address?.ward || '-- Phường Trần Hưng Đạo --'}">
              </div>
              <div class="form-group">
                <label>Đường/Thôn</label>
                <input type="text" id="street-input" value="${profile.address?.street || ''}">
              </div>
              <div class="form-group">
                <label>Số nhà/Đội</label>
                <input type="text" id="houseNumber-input" value="${profile.address?.houseNumber || ''}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Đối tượng chính sách</label>
                <select id="policyObject-input">
                  <option selected>${profile.policyObject || '-- Lựa chọn đối tượng chính sách --'}</option>
                  <option>Lựa chọn đối tượng chính sách</option>
                </select>
              </div>
              <div class="form-group">
                <label>Số trung/NK</label>
                <input type="text" id="studentNumber-input" value="${profile.studentNumber || ''}">
              </div>
              <div class="form-group">
                <label>Chiều cao(Cm)</label>
                <input type="text" id="height-input" value="${profile.height || ''}">
              </div>
              <div class="form-group">
                <label>Cân nặng(Kg)</label>
                <input type="text" id="weight-input" value="${profile.weight || ''}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Đối tượng chính sách</label>
                <select id="policyObject2-input">
                  <option selected>${profile.policyObject || '-- Lựa chọn đối tượng chính sách --'}</option>
                  <option>Lựa chọn đối tượng chính sách</option>
                </select>
              </div>
              <div class="form-group">
                <label>Số trung/NK</label>
                <input type="text" id="studentNumber2-input" value="${profile.studentNumber || ''}">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>QUÁ TRÌNH HỌC TẬP</h4>
            <p class="form-hint">Bấm vào đây nếu Địa chỉ liên lạc của bạn chính là Nơi ở</p>
            <div class="form-row">
              <div class="form-group">
                <label>Bậc</label>
                <select id="educationLevel-input">
                  <option selected>Đại học</option>
                </select>
              </div>
              <div class="form-group">
                <label>Hình thức đào tạo</label>
                <select id="trainingForm-input">
                  <option selected>Chính quy</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chương trình đào tạo</label>
                <select id="trainingProgram-input">
                  <option selected>${profile.trainingProgram || 'QH-2022-I/CQ'}</option>
                  <option>QH-2022-I/CQ</option>
                </select>
              </div>
              <div class="form-group">
                <label>Lớp quản lý</label>
                <select id="class-input">
                  <option selected>${user.class || 'QH-2022-I/CQ-CSI'}</option>
                  <option>QH-2022-I/CQ-CSI</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Ngành</label>
                <select id="major-input">
                  <option selected>${profile.major || 'Khoa học máy tính'}</option>
                  <option>Khoa học máy tính</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chuyên ngành</label>
                <select id="specialization-input">
                  <option selected>Trường Đại học Công nghệ</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>THÔNG TIN LIÊN LẠC</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Địa chỉ liên lạc</label>
                <input type="text" id="contactAddress-input" value="${profile.contactAddress || ''}">
              </div>
              <div class="form-group">
                <label>Điện thoại</label>
                <input type="text" id="phone-input" value="${profile.phone || ''}">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="email-input" value="${user.email || ''}" readonly>
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>THÔNG TIN NHẬP HỌC</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Là Đoàn viên</label>
                <input type="checkbox" id="unionMember-isMember" ${profile.unionMember?.isMember ? 'checked' : ''}>
              </div>
              <div class="form-group">
                <label>Ngày vào Đoàn</label>
                <input type="text" id="unionMember-joinDate" value="${profile.unionMember?.joinDate || ''}">
              </div>
              <div class="form-group">
                <label>Nơi vào Đoàn</label>
                <input type="text" id="unionMember-joinPlace" value="${profile.unionMember?.joinPlace || ''}">
              </div>
              <div class="form-group">
                <label>Chức vụ cao nhất</label>
                <input type="text" id="unionMember-highestPosition" value="${profile.unionMember?.highestPosition || ''}">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>THÔNG TIN ĐẢNG</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Là Đảng viên</label>
                <input type="checkbox" id="partyMember-isMember" ${profile.partyMember?.isMember ? 'checked' : ''}>
              </div>
              <div class="form-group">
                <label>Ngày vào Đảng</label>
                <input type="text" id="partyMember-joinDate" value="${profile.partyMember?.joinDate || ''}">
              </div>
              <div class="form-group">
                <label>Nơi vào Đảng</label>
                <input type="text" id="partyMember-joinPlace" value="${profile.partyMember?.joinPlace || ''}">
              </div>
              <div class="form-group">
                <label>Chức vụ cao nhất</label>
                <input type="text" id="partyMember-highestPosition" value="${profile.partyMember?.highestPosition || ''}">
              </div>
            </div>
          </div>
          <button class="submit-btn" onclick="saveProfile()">Submit</button>
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return `<div class="content-block"><p>Lỗi khi tải hồ sơ cá nhân.</p></div>`;
  }
},
    'view-schedule': `
      <div class="content-block">
        <h3>XEM THỜI KHÓA BIỂU BẰNG TÀI KHOẢN SINH VIÊN</h3>
        <div class="notification-section">
          <p>Chức năng xem đăng ký học được chuyển sang địa chỉ <a href="http://dangkyhoc.vnu.edu.vn" class="notification-link">http://dangkyhoc.vnu.edu.vn</a></p>
        </div>
      </div>
    `,
    'course-registration': `
      <div class="content-block">
        <h3>ĐĂNG KÝ MÔN HỌC</h3>
        <div class="notification-section">
          <p>Tạm ngừng đăng ký học. Vui lòng quay lại sau!</p>
        </div>
      </div>
    `,
    'study-results': async () => {
      try {
        const user = await fetchUser();
        const results = await fetchStudyResults();
        let html = `
          <div class="content-block">
            <h3>KẾT QUẢ HỌC TẬP</h3>
            <div class="tabs">
              <button class="tab-btn">Xem điểm ngành 1</button>
              <button class="tab-btn">Xem điểm ngành 2</button>
              <button class="tab-btn">Xem điểm trường gửi</button>
              <label style="margin-left: 20px;">
                <input type="checkbox"> Xem cập nhật môn ngoài CTDT
              </label>
              <button class="print-btn" style="margin-left: auto;">In ấn</button>
            </div>
            <div class="results-section">
              <p><strong>Sinh viên:</strong> ${user.fullName}</p>
              <p><strong>Mã số:</strong> ${user.userId}</p>
              <p><strong>Lớp quản lý:</strong> ${user.class}</p>
        `;
        results.forEach(result => {
          html += `
            <table class="results-table">
              <thead>
                <tr>
                  <th colspan="8">${result.semester}</th>
                </tr>
                <tr>
                  <th>STT</th>
                  <th>MÃ MH</th>
                  <th>MÔN HỌC</th>
                  <th>SỐ TC</th>
                  <th>Điểm hệ 10</th>
                  <th>Điểm chữ</th>
                  <th>Điểm hệ 4</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
          `;
          result.results.forEach((r, index) => {
            html += `
              <tr>
                <td>${r.stt}</td>
                <td>${r.courseCode}</td>
                <td>${r.courseName}</td>
                <td>${r.credits}</td>
                <td class="score10-${result._id}-${index}">${r.score10}</td>
                <td class="letterGrade-${result._id}-${index}">${r.letterGrade}</td>
                <td class="score4-${result._id}-${index}">${r.score4}</td>
                <td></td>
              </tr>
            `;
          });
          html += `
              </tbody>
            </table>
          `;
        });
  
        // Tính toán các giá trị
        // 1. Tổng tín chỉ đã học (tất cả các môn)
        const totalCredits = results.reduce((total, result) => 
          total + result.results.reduce((sum, r) => sum + r.credits, 0), 0);
  
        // 2. Số tín chỉ tích lũy (không tính môn dưới điểm 4 hệ 10, dưới 1 hệ 4, dưới D hệ chữ)
        const passingGrades = ['D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+']; // Điểm chữ đạt yêu cầu
        const accumulatedCredits = results.reduce((total, result) => 
          total + result.results.reduce((sum, r) => {
            const score10 = r.score10 === 'Đạt' ? 10 : Number(r.score10); // Xử lý trường hợp "Đạt"
            const score4 = Number(r.score4);
            const letterGrade = r.letterGrade;
            // Kiểm tra điều kiện: điểm hệ 10 >= 4, điểm hệ 4 >= 1, và điểm chữ >= D
            if (
              score10 >= 4 &&
              score4 >= 1 &&
              (r.score10 === 'Đạt' || passingGrades.includes(letterGrade))
            ) {
              return sum + r.credits;
            }
            return sum;
          }, 0),
        0);
  
        // 3. Điểm trung bình tích lũy hệ 10 (tổng điểm hệ 10 của các môn đạt / tổng tín chỉ tích lũy)
        const totalScore10 = results.reduce((total, result) => 
          total + result.results.reduce((sum, r) => {
            const score10 = r.score10 === 'Đạt' ? 10 : Number(r.score10);
            const score4 = Number(r.score4);
            const letterGrade = r.letterGrade;
            if (
              score10 >= 4 &&
              score4 >= 1 &&
              (r.score10 === 'Đạt' || passingGrades.includes(letterGrade))
            ) {
              return sum + (score10 * r.credits);
            }
            return sum;
          }, 0),
        0);
        const avgScore10 = accumulatedCredits > 0 ? (totalScore10 / accumulatedCredits).toFixed(2) : 0;
  
        // 4. Điểm trung bình tích lũy hệ 4 (tổng điểm hệ 4 của các môn đạt / tổng tín chỉ tích lũy)
        const totalScore4 = results.reduce((total, result) => 
          total + result.results.reduce((sum, r) => {
            const score10 = r.score10 === 'Đạt' ? 10 : Number(r.score10);
            const score4 = Number(r.score4);
            const letterGrade = r.letterGrade;
            if (
              score10 >= 4 &&
              score4 >= 1 &&
              (r.score10 === 'Đạt' || passingGrades.includes(letterGrade))
            ) {
              return sum + (score4 * r.credits);
            }
            return sum;
          }, 0),
        0);
        const avgScore4 = accumulatedCredits > 0 ? (totalScore4 / accumulatedCredits).toFixed(2) : 0;
  
        // Hiển thị các giá trị tính toán
        html += `
          <p><strong>Tổng tín chỉ đã học:</strong> ${totalCredits}</p>
          <p><strong>Số tín chỉ tích lũy:</strong> ${accumulatedCredits}</p>
          <p><strong>Điểm trung bình tích lũy hệ 10:</strong> ${avgScore10}</p>
          <p><strong>Điểm trung bình tích lũy hệ 4:</strong> ${avgScore4}</p>
        </div>
      </div>
      `;
      return html;
      } catch (err) {
        return `<div class="content-block"><p>Lỗi khi tải kết quả học tập.</p></div>`;
      }
    },
    'exam-schedule': async () => {
      try {
        const user = await fetchUser();
        const schedules = await fetchExamSchedules();
        let html = `
          <div class="content-block">
            <h3>XEM ĐĂNG KÝ THI HỌC KỲ II, NĂM HỌC 2024-2025, MÃ HỌC KỲ 242</h3>
            <div class="exam-schedule-section">
              <div class="filters">
                <select class="filter-select">
                  <option>Xem lịch thi</option>
                </select>
                <select class="filter-select">
                  <option>Học kỳ: 242 - Học kỳ 2 năm 2024-2025</option>
                </select>
              </div>
              <div class="student-info">
                <p><strong>Mã sinh viên:</strong> ${user.userId}</p>
                <p><strong>Tên sinh viên:</strong> ${user.fullName}</p>
                <p class="total-exams"><strong>Tổng số kỳ thi đăng ký:</strong> ${schedules.length > 0 ? schedules[0].exams.length : 0}</p>
              </div>
              <table class="exam-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã KT</th>
                    <th>Kỳ thi</th>
                    <th>Ngày thi</th>
                    <th>Ca thi(giờ)</th>
                    <th>Hình thức thi</th>
                    <th>Phòng</th>
                    <th>SBD</th>
                  </tr>
                </thead>
                <tbody>
        `;
        if (schedules.length > 0) {
          schedules[0].exams.forEach(exam => {
            html += `
              <tr>
                <td>${exam.stt}</td>
                <td>${exam.examCode}</td>
                <td>${exam.examName}</td>
                <td>${exam.date}</td>
                <td>${exam.timeSlot}</td>
                <td>${exam.method}</td>
                <td>${exam.room}</td>
                <td>${exam.examNumber}</td>
              </tr>
            `;
          });
        }
        html += `
                </tbody>
              </table>
              <button class="print-btn">In đăng ký thi</button>
            </div>
          </div>
        `;
        return html;
      } catch (err) {
        return `<div class="content-block"><p>Lỗi khi tải lịch thi.</p></div>`;
      }
    },
    'course-syllabus': `
      <div class="content-block">
        <h3>ĐỀ CƯƠNG MÔN HỌC</h3>
        <div class="syllabus-section">
          <table class="syllabus-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Số TC</th>
                <th>Tên tệp tin</th>
                <th>Dung lượng</th>
                <th>Ngày tải lên</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>EMA 3071</td>
                <td>Ứng dụng máy tính trong lương và kiến</td>
                <td>3</td>
                <td><a href="#" class="file-link">khien.pdf</a></td>
                <td>289 KB</td>
                <td>17/12/2014</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>2</td>
                <td>PES1100</td>
                <td>Đề cương môn học Bóng chuyền</td>
                <td>1</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>EMA4050</td>
                <td>Đề cương môn học</td>
                <td>10</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>EMA 3148</td>
                <td>Đề án Thiết kế hệ điều khiển Công nghiệp</td>
                <td>4</td>
                <td><a href="#" class="file-link">EMA4003.pdf</a></td>
                <td>135 KB</td>
                <td>25/10/2024</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>5</td>
                <td>EMA4003</td>
                <td>Đề án Thiết kế hệ điều khiển Công</td>
                <td>4</td>
                <td><a href="#" class="file-link">EMA4004.pdf</a></td>
                <td>155 KB</td>
                <td>25/10/2024</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>6</td>
                <td>INT3403</td>
                <td>Đồ họa máy tính</td>
                <td>3</td>
                <td><a href="#" class="file-link">INT3403_Đề họa máy tính.docx</a></td>
                <td>220 KB</td>
                <td>25/10/2024</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>7</td>
                <td>EMA 3088</td>
                <td>Động cơ và sự truyền động điện</td>
                <td>2</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>8</td>
                <td>MAT1093</td>
                <td>Đại số</td>
                <td>4</td>
                <td><a href="#" class="file-link">MAT1093_Đại số.pdf</a></td>
                <td>300 KB</td>
                <td>11/10/2024</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>9</td>
                <td>FLT2041</td>
                <td>Điện tử số</td>
                <td>3</td>
                <td><a href="#" class="file-link">Điện tử số_FLT2041.pdf</a></td>
                <td>347 KB</td>
                <td>20/4/2017</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>10</td>
                <td>ELT2040</td>
                <td>Điện tử tương tự</td>
                <td>3</td>
                <td><a href="#" class="file-link">Điện tử tuong tu_TQViNh.pdf</a></td>
                <td>450 KB</td>
                <td>20/4/2017</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>11</td>
                <td>INT3319</td>
                <td>Điện toán đám mây</td>
                <td>3</td>
                <td><a href="#" class="file-link">51.INT3319_Điện toán đám mây.docx</a></td>
                <td>124 KB</td>
                <td>30/5/2022</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>12</td>
                <td>PES1003</td>
                <td>Điền kinh</td>
                <td>1</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>13</td>
                <td>EMA 3062</td>
                <td>Điều khiển PLC</td>
                <td>3</td>
                <td><a href="#" class="file-link">Đieu khien PLC.pdf</a></td>
                <td>258 KB</td>
                <td>17/12/2014</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>14</td>
                <td>INT307E</td>
                <td>An toàn và an ninh mạng</td>
                <td>3</td>
                <td><a href="#" class="file-link">An toan va an ninh mang_vi.pdf</a></td>
                <td>363 KB</td>
                <td>20/4/2017</td>
                <td>Viết</td>
              </tr>
              <tr>
                <td>16</td>
                <td>PES1070</td>
                <td>Bài tập thể lực chung</td>
                <td>1</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17</td>
                <td>PES1025</td>
                <td>Bóng đá</td>
                <td>1</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18</td>
                <td>PES1026</td>
                <td>Bóng đá 2</td>
                <td>1</td>
                <td>Chưa có</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <span>1 2 3 4 5 7 8 9 10 <a href="#">></a></span>
            <p>Trang 1/1</p>
            <input type="text" class="search-input" placeholder="Tìm kiếm đề cương (Nhập mã/tên môn học/tệp tín)">
          </div>
        </div>
      </div>
    `,
    'forms-list': `
      <div class="content-block">
        <h3>BIỂU MẪU</h3>
        <div class="forms-section">
          <div class="filters">
            <label>Chọn loại biểu mẫu:</label>
            <select class="filter-select">
              <option>Tất cả</option>
            </select>
          </div>
          <table class="forms-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên tệp tín</th>
                <th>Mô tả</th>
                <th>Phân loại</th>
                <th>Xem nội dung</th>
                <th>Dung lượng</th>
                <th>Ngày tải lên</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="8" class="no-data">Hiện tại chưa có biểu mẫu nào!</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <p>Trang 0/</p>
            <input type="text" class="search-input" placeholder="Tìm kiếm biểu mẫu">
          </div>
        </div>
      </div>
    `,
    'support-request': `
      <div class="content-block">
        <h3>LIÊN HỆ VỚI QUẢN TRỊ HỆ THỐNG</h3>
        <div class="support-section">
          <p>Liên hệ với Người quản trị để giải quyết các vấn đề:</p>
          <ul>
            <li>Sửa điểm</li>
            <li>Sửa thông tin</li>
            <li>Không nhập được số, và các vấn đề khác...</li>
          </ul>
          <div class="form-group">
            <label>Tiêu đề:</label>
            <input type="text" class="form-input" placeholder="">
          </div>
          <div class="form-group">
            <label>Nội dung:</label>
            <textarea class="form-textarea" rows="5"></textarea>
          </div>
          <button class="submit-btn">Gửi liên hệ</button>
        </div>
      </div>
    `,
    'email-account': async () => {
      try {
        const user = await fetchUser();
        return `
          <div class="content-block">
            <h3>THÔNG TIN TÀI KHOẢN TRUY CẬP EMAIL</h3>
            <div class="email-account-section">
              <p><strong>Tên truy cập:</strong> ${user.userId}</p>
              <p><strong>Mật khẩu khóa tài khoản:</strong> 405fbtc</p>
              <h4>HƯỚNG DẪN:</h4>
              <ul>
                <li>Để sử dụng dịch vụ email, học sinh cần truy cập vào địa chỉ <a href="https://idp.vnu.edu.vn" class="link">https://idp.vnu.edu.vn</a></li>
                <li>Lưu ý: Tên đăng nhập không bao gồm @vnu.edu.vn</li>
                <li>Nếu bạn cần hỗ trợ thông tin liên quan đến kỹ thuật xin gửi email cho Phòng Quản trị mạng và An ninh hệ thống trung tâm UDCNTT theo địa chỉ: <a href="mailto:vnunet@vnu.edu.vn" class="link">vnunet@vnu.edu.vn</a></li>
              </ul>
            </div>
          </div>
        `;
      } catch (err) {
        return `<div class="content-block"><p>Lỗi khi tải thông tin tài khoản email.</p></div>`;
      }
    },
  };

  // Thêm sự kiện click cho từng mục menu
  const menuItems = document.querySelectorAll('.sidebar li');
  menuItems.forEach(item => {
    item.addEventListener('click', async () => {
      menuItems.forEach(menu => menu.classList.remove('active'));
      item.classList.add('active');
      const pageKey = item.getAttribute('data-page');
      if (pages[pageKey]) {
        mainContent.innerHTML = typeof pages[pageKey] === 'function' ? await pages[pageKey]() : pages[pageKey];
      }
    });
  });

  // Hiển thị trang mặc định (study-results) khi tải trang
  const defaultMenuItem = document.querySelector('.sidebar li[data-page="study-results"]');
  if (defaultMenuItem) {
    defaultMenuItem.click();
  }
}

// Thêm vào cuối file scripts.js
window.saveProfile = async () => {
  try {
    // Thu thập dữ liệu từ các ô nhập liệu
    const profileData = {
      userId: "22028293", // Đảm bảo userId được lấy từ token hoặc dữ liệu người dùng
      address: {
        country: document.getElementById('country-input').value,
        city: document.getElementById('city-input').value,
        district: document.getElementById('district-input').value,
        ward: document.getElementById('ward-input').value,
        street: document.getElementById('street-input').value,
        houseNumber: document.getElementById('houseNumber-input').value,
      },
      height: parseFloat(document.getElementById('height-input').value) || 0,
      weight: parseFloat(document.getElementById('weight-input').value) || 0,
      phone: document.getElementById('phone-input').value,
      policyObject: document.getElementById('policyObject-input').value,
      studentNumber: document.getElementById('studentNumber-input').value,
      trainingProgram: document.getElementById('trainingProgram-input').value,
      major: document.getElementById('major-input').value,
      contactAddress: document.getElementById('contactAddress-input').value,
      unionMember: {
        isMember: document.getElementById('unionMember-isMember').checked,
        joinDate: document.getElementById('unionMember-joinDate').value,
        joinPlace: document.getElementById('unionMember-joinPlace').value,
        highestPosition: document.getElementById('unionMember-highestPosition').value,
      },
      partyMember: {
        isMember: document.getElementById('partyMember-isMember').checked,
        joinDate: document.getElementById('partyMember-joinDate').value,
        joinPlace: document.getElementById('partyMember-joinPlace').value,
        highestPosition: document.getElementById('partyMember-highestPosition').value,
      },
    };

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập lại để tiếp tục.');
      window.location.href = 'login.html';
      return;
    }

    // Gửi yêu cầu PUT để cập nhật toàn bộ dữ liệu profile
    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Lỗi khi cập nhật hồ sơ.');
    }

    // Làm mới trang để hiển thị dữ liệu mới
    alert('Cập nhật hồ sơ thành công!');
    const menuItems = document.querySelectorAll('.sidebar li');
    const profileMenu = document.querySelector('.sidebar li[data-page="support-profile"]');
    menuItems.forEach(menu => menu.classList.remove('active'));
    profileMenu.classList.add('active');
    mainContent.innerHTML = await pages['support-profile']();
  } catch (err) {
    console.error('Error saving profile:', err);
    alert('Lỗi khi cập nhật hồ sơ: ' + err.message);
  }
};

window.logout = () => {
  // Xóa token từ localStorage
  localStorage.removeItem('token');
  
  // Chuyển hướng về trang đăng nhập
  window.location.href = 'login.html';
};
window.saveVaccinationStatus = async () => {
  try {
    const status = document.getElementById('vaccination-status').value;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập lại để tiếp tục.');
      window.location.href = 'login.html';
      return;
    }

    const response = await fetch('http://localhost:5000/api/vaccination', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Lỗi khi cập nhật thông tin tiêm phòng.');
    }

    alert('Cập nhật thông tin tiêm phòng thành công!');
    const menuItems = document.querySelectorAll('.sidebar li');
    const vaccinationMenu = document.querySelector('.sidebar li[data-page="covid-vaccination"]');
    menuItems.forEach(menu => menu.classList.remove('active'));
    vaccinationMenu.classList.add('active');
    mainContent.innerHTML = await pages['covid-vaccination']();
  } catch (err) {
    console.error('Error saving vaccination status:', err);
    alert('Lỗi khi cập nhật thông tin tiêm phòng: ' + err.message);
  }
};

// Hàm random số từ 100 đến 200
const getRandomOnlineUsers = () => {
  return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
};

// Hàm cập nhật số người online
const updateOnlineUsers = () => {
  const onlineUsersElement = document.getElementById('online-users');
  if (onlineUsersElement) {
    onlineUsersElement.textContent = getRandomOnlineUsers();
  }
};

// Cập nhật ngay khi trang tải
document.addEventListener('DOMContentLoaded', () => {
  updateOnlineUsers();
  // Cập nhật mỗi 10 giây
  setInterval(updateOnlineUsers, 10000);
});

// Thêm vào cuối file scripts.js
window.showChangePasswordForm = () => {
  const form = document.getElementById('change-password-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

window.changePassword = async () => {
  try {
    const oldPassword = document.getElementById('old-password').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();

    if (!oldPassword || !newPassword) {
      alert('Vui lòng nhập đầy đủ mật khẩu cũ và mới.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập lại để tiếp tục.');
      window.location.href = 'login.html';
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Lỗi khi đổi mật khẩu.');
    }

    alert(data.message || 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
    // Xóa token và chuyển hướng về trang đăng nhập
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Error changing password:', err);
    alert('Lỗi khi đổi mật khẩu: ' + err.message);
  }
};