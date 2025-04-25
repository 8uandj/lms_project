// Kiểm tra xem có đang ở trang đăng nhập hay không
if (document.getElementById('login-btn')) {
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
  
    loginBtn.addEventListener('click', function() {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Giả lập kiểm tra thông tin đăng nhập
      if (username === '22028293' && password === 'Hung1234') {
        // Đăng nhập thành công, chuyển hướng đến trang chính
        window.location.href = 'index.html';
      } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi
        alert('Tên truy cập hoặc mật khẩu không đúng!');
      }
    });
  }
  
  // Định nghĩa nội dung các trang cho trang chính (index.html)
  const pages = {
    'covid-vaccination': `
      <div class="content-block">
        <h3>KHAI BÁO TIÊM PHÒNG COVID</h3>
        <div class="vaccination-section">
          <div class="form-row">
            <div class="form-group">
              <label>THÔNG TIN CÁ NHÂN</label>
              <p><strong>Mã sinh viên:</strong> 22028293</p>
              <p><strong>Họ và tên:</strong> Hoàng Duy Hưng</p>
              <p><strong>Giới tính:</strong> Nam</p>
            </div>
            <div class="form-group">
              <label>THÔNG TIN TIÊM PHÒNG NCOVID</label>
              <select class="filter-select">
                <option>Chưa tiêm</option>
              </select>
            </div>
          </div>
          <button class="submit-btn">Gửi nhận</button>
        </div>
      </div>
    `,
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
    'support-profile': `
      <div class="content-block">
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
                <select>
                  <option>Việt Nam</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tình/Thành phố</label>
                <select>
                  <option>-- Thái Bình --</option>
                </select>
              </div>
              <div class="form-group">
                <label>Quận/Huyện</label>
                <select>
                  <option>-- Thành phố Thái Bình --</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Phường/Xã</label>
                <input type="text" placeholder="-- Phường Trần Hưng Đạo --">
              </div>
              <div class="form-group">
                <label>Đường/Thôn</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Số nhà/Đội</label>
                <input type="text">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Đối tượng chính sách</label>
                <select>
                  <option>-- Lựa chọn đối tượng chính sách --</option>
                </select>
              </div>
              <div class="form-group">
                <label>Số trung/NK</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Chiều cao(Cm)</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Cân nặng(Kg)</label>
                <input type="text">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Đối tượng chính sách</label>
                <select>
                  <option>-- Lựa chọn đội tượng chính sách --</option>
                </select>
              </div>
              <div class="form-group">
                <label>Số trung/NK</label>
                <input type="text">
              </div>
            </div>
            <button class="submit-btn">Ghi nhận</button>
          </div>
          <div class="form-section">
            <h4>QUÁ TRÌNH HỌC TẬP</h4>
            <p class="form-hint">Bấm vào đây nếu Địa chỉ liên lạc của bạn chính là Nơi ở</p>
            <div class="form-row">
              <div class="form-group">
                <label>Bậc</label>
                <select>
                  <option>Đại học</option>
                </select>
              </div>
              <div class="form-group">
                <label>Hình thức đào tạo</label>
                <select>
                  <option>Chính quy</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chương trình đào tạo</label>
                <select>
                  <option>QH-2022-I/CQ</option>
                </select>
              </div>
              <div class="form-group">
                <label>Lớp quản lý</label>
                <select>
                  <option>QH-2022-I/CQ-CSI</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Ngành</label>
                <select>
                  <option>Khoa học máy tính</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chuyên ngành</label>
                <select>
                  <option>Trường Đại học Công nghệ</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>THÔNG TIN LIÊN LẠC</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Địa chỉ liên lạc</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Điện thoại</label>
                <input type = "">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>THÔNG TIN NHẬP HỌC</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Là Đoàn viên</label>
                <input type="checkbox">
              </div>
              <div class="form-group">
                <label>Ngày vào Đoàn</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Nơi vào Đoàn</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Chức vụ cao nhất</label>
                <input type="text">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4>THÔNG TIN ĐẢNG</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Là Đảng viên</label>
                <input type="checkbox">
              </div>
              <div class="form-group">
                <label>Ngày vào Đảng</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Nơi vào Đảng</label>
                <input type="text">
              </div>
              <div class="form-group">
                <label>Chức vụ cao nhất</label>
                <input type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    'view-schedule': `
      <div class="content-block">
        <h3>XEM THÔI KHOẢN BIỂU BẰNG TÀI KHOẢN SINH VIÊN</h3>
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
    'study-results': `
      <div class="content-block">
        <h3>KẾT QUẢ HỌC TẬP</h3>
        <div class="tabs">
          <button class="tab-btn">Xem điểm năm 1</button>
          <button class="tab-btn">Xem điểm năm 2</button>
          <button class="tab-btn">Xem điểm trường gửi</button>
          <label style="margin-left: 20px;">
            <input type="checkbox"> Xem cập nhật môn ngoại ngữ CDT
          </label>
          <button class="print-btn" style="margin-left: auto;">In ấn</button>
        </div>
        <div class="results-section">
          <p><strong>Sinh viên:</strong> Hoàng Duy Hưng</p>
          <p><strong>Mã số:</strong> 22028293</p>
          <p><strong>Lớp quản lý:</strong> QH-2022-I/CQ-CSI</p>
          <table class="results-table">
              <thead>
                <tr>
                  <th colspan="8">HỌC KỲ 1 - 2024-2025, MÃ HỌC KỲ 241</th>
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
                <tr>
                  <td>1</td>
                  <td>PES1020</td>
                  <td>Bóng rổ 1</td>
                  <td>1</td>
                  <td>Đạt</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>INT2041</td>
                  <td>Tương tác người máy</td>
                  <td>3</td>
                  <td>4</td>
                  <td>D</td>
                  <td>1</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>INT3121</td>
                  <td>Các chuyên đề trong Khoa học máy tính</td>
                  <td>3</td>
                  <td>8.4</td>
                  <td>B+</td>
                  <td>3.5</td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>INT3230</td>
                  <td>Mật mã và an toàn thông tin</td>
                  <td>4</td>
                  <td>9</td>
                  <td>A+</td>
                  <td>4</td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>INT3103</td>
                  <td>Tối ưu hóa</td>
                  <td>3</td>
                  <td>9</td>
                  <td>A+</td>
                  <td>4</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table class="results-table">
              <thead>
                <tr>
                  <th colspan="8">HỌC KỲ 2 - 2023-2024, MÃ HỌC KỲ 232</th>
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
                <tr>
                  <td>1</td>
                  <td>PHI1002</td>
                  <td>Chủ nghĩa xã hội khoa học</td>
                  <td>2</td>
                  <td>8.2</td>
                  <td>B+</td>
                  <td>3.5</td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ELT2035</td>
                  <td>TÍn hiệu và hệ thống</td>
                  <td>3</td>
                  <td>8.1</td>
                  <td>B+</td>
                  <td>3.5</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>FLF1108</td>
                  <td>Tiếng Anh B2</td>
                  <td>5</td>
                  <td>7</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>INT2208</td>
                  <td>Công nghệ phần mềm</td>
                  <td>3</td>
                  <td>7.7</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>THL1057</td>
                  <td>Nhà nước và pháp luật đại cương</td>
                  <td>2</td>
                  <td>7.6</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>INT2213</td>
                  <td>Mạng máy tính</td>
                  <td>4</td>
                  <td>7</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>INT1008</td>
                  <td>Kinh tế chính trị trị Mác – Lênin</td>
                  <td>2</td>
                  <td>7.5</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>UET1002</td>
                  <td>Kỹ năng khởi nghiệp</td>
                  <td>2</td>
                  <td>8.5</td>
                  <td>A</td>
                  <td>3.7</td>
                  <td></td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>INT2044E</td>
                  <td>Lý thuyết thông tin</td>
                  <td>3</td>
                  <td>7.5</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </table>
          <table class="results-table">
            <thead>
              <tr>
                <th colspan="8">HỌC KỲ 1 - 2022-2023, MÃ HỌC KỲ 221</th>
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
              <tr>
                <td>1</td>
                <td>INT2204</td>
                <td>Lập trình hướng đối tượng</td>
                <td>3</td>
                <td>8.5</td>
                <td>A</td>
                <td>3.7</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>2210</td>
                <td>Cấu trúc dữ liệu và giải thuật</td>
                <td>4</td>
                <td>8.6</td>
                <td>A</td>
                <td>3.7</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>INT2211</td>
                <td>Cơ sở dữ liệu</td>
                <td>4</td>
                <td>6.8</td>
                <td>C+</td>
                <td>2.5</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>INT2212</td>
                <td>Kiến trúc máy tính</td>
                <td>4</td>
                <td>7.5</td>
                <td>B</td>
                <td>3</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <table class="results-table">
            <thead>
              <tr>
                <th colspan="8">HỌC KỲ 2 - 2022-2023, MÃ HỌC KỲ 222</th>
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
              <tr>
                <td>1</td>
                <td>HIS1001</td>
                <td>Lịch sử Đảng Cộng sản Việt Nam</td>
                <td>2</td>
                <td>7.8</td>
                <td>B</td>
                <td>3</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>POL1001</td>
                <td>Tư tưởng Hồ Chí Minh</td>
                <td>2</td>
                <td>8.6</td>
                <td>A</td>
                <td>3.7</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>INT1050</td>
                <td>Toán rời rạc</td>
                <td>4</td>
                <td>8.5</td>
                <td>A+</td>
                <td>4</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>MAT1042</td>
                <td>Giải tích 2</td>
                <td>4</td>
                <td>6.8</td>
                <td>C+</td>
                <td>2.5</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>INT2215</td>
                <td>Lập trình nâng cao</td>
                <td>4</td>
                <td>7.5</td>
                <td>B</td>
                <td>3</td>
                <td></td>
              </tr>
              <tr>
                <td>7</td>
                <td>EPN1096</td>
                <td>Vật lý đại cương 2</td>
                <td>2</td>
                <td>8</td>
                <td>B+</td>
                <td>3.5</td>
                <td></td>
              </tr>
              <tr>
                <td>5</td>
                <td>PHI1006</td>
                <td>Triết học Mác – Lênin</td>
                <td>3</td>
                <td>7.5</td>
                <td>B</td>
                <td>3</td>
                <td></td>
              </tr>
            </tbody>
          </table>
            <table class="results-table">
              <thead>
                <tr>
                  <th colspan="8">HỌC KỲ 1 - 2022-2023, MÃ HỌC KỲ 221</th>
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
                <tr>
                  <td>1</td>
                  <td>FLT107</td>
                  <td>Tiếng Anh B1</td>
                  <td>5</td>
                  <td>0.2</td>
                  <td>F</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>MAT1093</td>
                  <td>Đại số</td>
                  <td>4</td>
                  <td>7.4</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>EPN1095</td>
                  <td>Vật lý đại cương 1</td>
                  <td>2</td>
                  <td>6.8</td>
                  <td>C+</td>
                  <td>2.5</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>MAT1094</td>
                  <td>Giải tích 1</td>
                  <td>4</td>
                  <td>7.8</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>INT1008</td>
                  <td>Nhập môn lập trình</td>
                  <td>3</td>
                  <td>7.9</td>
                  <td>B</td>
                  <td>3</td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>INT1007</td>
                  <td>Giới thiệu về Công nghệ thông tin</td>
                  <td>3</td>
                  <td>6.9</td>
                  <td>C</td>
                  <td>2</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          <p><strong>Tổng tín chỉ:</strong> 97</p>
          <p><strong>Điểm trung bình tích lũy:</strong> 92</p>
          <p><strong>Điểm trung bình tích lũy hệ 4:</strong> 3.11</p>
        </div>
      </div>
    `,
    'exam-schedule': `
      <div class="content-block">
        <h3>XEM DANG KÝ THI HỌC KỲ II, NĂM HỌC 2024-2025, MÃ HỌC KỲ 242</h3>
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
            <p><strong>Mã sinh viên:</strong> 22028293</p>
            <p><strong>Tên sinh viên:</strong> Hoàng Duy Hưng</p>
            <p class="total-exams"><strong>Tổng số kỳ thi đăng ký:</strong> 9</p>
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
              <tr>
                <td>1</td>
                <td>242-PES1075-01</td>
                <td>Bóng chuyền hơi</td>
                <td>0</td>
                <td></td>
                <td>Viết</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>242-INT3104 14</td>
                <td>Các vấn đề hiện đại trong KHMT</td>
                <td>0</td>
                <td></td>
                <td>Bài tập lớn</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>242-INT3405E 1</td>
                <td>Học máy</td>
                <td>0</td>
                <td></td>
                <td>Tự luận</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>242-INT3239E 2</td>
                <td>Kỹ thuật lập trình ứng dụng lớn</td>
                <td>0</td>
                <td></td>
                <td>Viết</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>5</td>
                <td>242-INT3416 4</td>
                <td>Khoa học dữ liệu</td>
                <td>0</td>
                <td></td>
                <td>Viết</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>6</td>
                <td>242-INT2214 10</td>
                <td>Nguyên lý hệ điều hành</td>
                <td>0</td>
                <td></td>
                <td>Bài tập lớn</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>7</td>
                <td>242-INT3236E 2</td>
                <td>Phát triển ứng dụng di động toàn diện máy</td>
                <td>0</td>
                <td></td>
                <td>Viết</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>8</td>
                <td>242-INT3103 1</td>
                <td>Phát triển ứng dụng Web</td>
                <td>0</td>
                <td></td>
                <td>Viết</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>9</td>
                <td>242-EPN1096 31</td>
                <td>Vật lý đại cương 2</td>
                <td>0</td>
                <td></td>
                <td>Viết</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button class="print-btn">In đăng ký thi</button>
        </div>
      </div>
    `,
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
                <td>4</tdx>
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
    'email-account': `
      <div class="content-block">
        <h3>THÔNG TIN TÀI KHOẢN TRUY CẬP EMAIL</h3>
        <div class="email-account-section">
          <p><strong>Tên truy cập:</strong> 22028293</p>
          <p><strong>Mật khẩu khóa tài khoản:</strong> 405fbtc</p>
          <h4>HƯỚNG DẪN:</h4>
          <ul>
            <li>Để sử dụng dịch vụ email, học sinh cần truy cập vào địa chỉ <a href="https://idp.vnu.edu.vn" class="link">https://idp.vnu.edu.vn</a></li>
            <li>Lưu ý: Tên đăng nhập không bao gồm @vnu.edu.vn</li>
            <li>Nếu bạn cần hỗ trợ thông tin liên quan đến kỹ thuật xin gửi email cho Phòng Quản trị mạng và An ninh hệ thống trung tâm UDCNTT theo địa chỉ: <a href="mailto:vnunet@vnu.edu.vn" class="link">vnunet@vnu.edu.vn</a></li>
          </ul>
        </div>
      </div>
    `
  };
  
  // Lấy phần tử main-content (chỉ áp dụng cho trang index.html)
  const mainContent = document.getElementById('main-content');
  
  if (mainContent) {
    // Lấy tất cả các mục menu trong sidebar
    const menuItems = document.querySelectorAll('.sidebar li');
  
    // Thêm sự kiện click cho từng mục menu
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        // Xóa trạng thái active khỏi tất cả các mục menu
        menuItems.forEach(menu => menu.classList.remove('active'));
        
        // Thêm trạng thái active cho mục menu được nhấp
        this.classList.add('active');
        
        // Lấy page key từ data-page của mục menu
        const pageKey = this.getAttribute('data-page');
        
        // Cập nhật nội dung trong main-content
        if (pages[pageKey]) {
          mainContent.innerHTML = pages[pageKey];
        }
      });
    });
  }