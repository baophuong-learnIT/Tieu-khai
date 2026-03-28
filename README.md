# 🎰 Quay Số Trúng Thưởng - Hợp Trí Summit

**Chương trình Khai Lộc Đầu Xuân – Nhân Đôi May Mắn**
Vụ Đông Xuân 2025–2026

---

## 📁 Cấu trúc thư mục

```
quay-so-hop-tri/
├── index.html          ← Trang chính (mở file này để chạy)
├── css/
│   └── styles.css      ← Toàn bộ CSS
├── js/
│   ├── storage.js      ← Lưu trữ localStorage
│   ├── wheel.js        ← Logic vẽ + quay vòng quay
│   ├── audio.js        ← Hiệu ứng âm thanh (Web Audio API)
│   ├── confetti.js     ← Hiệu ứng confetti + sparkle
│   ├── ui.js           ← Render giao diện
│   └── app.js          ← Controller chính
├── data/
│   ├── users.js        ← Database 79 tài khoản sales
│   └── prizes.js       ← Cấu hình giải thưởng + xác suất
├── assets/             ← Thư mục chứa hình ảnh/logo (nếu có)
└── README.md           ← File này
```

---

## 🚀 Cách chạy

### Cách 1: Mở trực tiếp
Mở file `index.html` bằng trình duyệt (Chrome/Edge/Firefox)

### Cách 2: Dùng Live Server (VSCode)
1. Cài extension **Live Server** trong VSCode
2. Click chuột phải vào `index.html` → **Open with Live Server**

### Cách 3: Deploy lên server
Upload toàn bộ thư mục lên hosting (Vercel, Netlify, GitHub Pages, hoặc server riêng)

---

## 👤 Tài khoản đăng nhập

**79 tài khoản sales** được parse từ file Excel. User = Password.

| Khu vực | Ví dụ tài khoản |
|---------|----------------|
| An Giang | angiang1 / angiang1 |
| Kiên Giang | kiengiang1 / kiengiang1 |
| Cần Thơ | cantho1 / cantho1 |
| Long An | longan1 / longan1 |
| Đồng Tháp | bacdongthap1 / bacdongthap1 |
| Tây Ninh | tayninh1 / tayninh1 |
| Lâm Đồng | lamdong1 / lamdong1 |
| Gia Lai | gialai1 / gialai1 |

Xem đầy đủ: click nút **"👤 DS Tài khoản"** ở góc phải dưới

---

## ⚙️ Cách tùy chỉnh

### Thay đổi số lượt quay
Mở file `src/data/users.ts`, chỉnh giá trị `s` (spins) của từng user:
```js
{ r:"AN GIANG", a:"AN GIANG 1", u:"angiang1", p:"angiang1", s:3 },
//                                                            ↑ đổi số này
```

### Thay đổi giải thưởng
Mở file `src/data/prizes.ts`, chỉnh tên/mô tả/xác suất:
```js
{
  name: "Giải Đặc Biệt",    // Tên hiển thị trên vòng quay
  color: "#B71C1C",           // Màu ô
  text: "#FFFFFF",            // Màu chữ
  desc: "Xe máy Honda Vision",// Mô tả giải
  icon: "🏆",                // Emoji
  weight: 1                   // Xác suất (thấp = khó trúng)
}
```

### Thêm user mới
Thêm dòng vào mảng `USERS` trong `src/data/users.ts`:
```js
{ r:"KHU VỰC", a:"TÊN ĐỊA BÀN", u:"username", p:"password", s:2 },
```

### Reset dữ liệu
Mở Console (F12) → chạy: `Storage.resetAll()`

---

## 🔧 Logic hoạt động

1. **Đăng nhập**: Kiểm tra user/pass trong mảng USERS
2. **Load state**: Lấy lượt quay còn lại + lịch sử từ localStorage
3. **Quay**: Weighted random chọn giải → animation canvas rotate 4.5s
4. **Kết quả**: Hiển thị modal + confetti + lưu localStorage
5. **Persistent**: Đóng trình duyệt mở lại vẫn giữ nguyên data

---

## 📋 Xác suất giải thưởng

| Giải | Weight | Xác suất |
|------|--------|----------|
| Giải Đặc Biệt | 1 | ~1% |
| Giải Nhất | 2 | ~2% |
| Giải Nhì | 4 | ~4% |
| Giải Ba | 8 | ~8% |
| Giải KK 1 | 15 | ~15% |
| Giải KK 2 | 18 | ~18% |
| Chúc May Mắn | 32 | ~32% |
| Giải KK 3 | 20 | ~20% |

---

## 🌐 Lưu ý khi deploy production

- Dữ liệu hiện lưu ở **localStorage** (client-side), phù hợp demo/nội bộ
- Nếu cần production thực tế, cần thêm backend (Node.js/PHP/Python) để:
  - Xác thực user từ database
  - Lưu kết quả quay vào server
  - Chống gian lận (server-side random)
  - API để admin quản lý
