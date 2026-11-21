# Chỉnh profile Moe Shinn

## Đưa lên GitHub

Đặt `README.md` và **toàn bộ thư mục `assets/`** ở gốc repo public `MoeShinn/MoeShinn`. README dùng đường dẫn tương đối, upload riêng README sẽ mất hình.

Thư mục `art/` và `scripts/` chỉ để tạo lại SVG, **không bắt buộc upload** (ảnh đã được nhúng sẵn trong các SVG).

## Đổi ảnh / logo

Ảnh nguồn nằm trong `art/` (định dạng WebP cho nhẹ):

| File | Dùng cho | Gợi ý |
| --- | --- | --- |
| `avatar.webp` | Avatar trong banner | Vuông, ~440 px |
| `background.webp` / `background-mobile.webp` | Nền banner (máy tính / điện thoại) | Ngang ~1600 px / gần vuông ~780 px, phần trái tối để đè chữ |
| `logo-msm/pl/lp.webp` | Logo thẻ dự án | Vuông, 128 px |
| `logo-ezy/mc.webp` | Thẻ công nghệ Ezy Tuber / Minecraft | Vuông, 128 px |
| `icons.json` | Icon Python, TS, JS, HTML, YouTube, Discord, Telegram | Lấy từ simple-icons |

Thay file rồi chạy `node scripts/build-assets.mjs`. Giữ mỗi SVG banner dưới ~300 KB (nén ảnh bằng Picture-Lite nếu cần).

## Sửa nội dung và màu

- Lời giới thiệu, link, liên hệ: sửa trong `README.md`.
- Chữ trong banner, terminal, thẻ công nghệ, thẻ dự án, badge liên hệ, màu (biến `C`): sửa trong `scripts/build-assets.mjs`, rồi chạy lại.
- Thêm dự án: thêm một mục vào mảng `projects` (dùng `logo:'tên'` nếu có `art/logo-tên.webp`, hoặc `emblem:true` để dùng biểu trưng vẽ bằng code), chạy lại, rồi thêm khối `<a><picture>…` tương ứng vào README.

SVG có bản riêng cho màn hình nhỏ. Hiệu ứng dùng SVG/CSS, không cần JavaScript, và tự tắt khi thiết bị bật giảm chuyển động. Không phụ thuộc dịch vụ ngoài.
