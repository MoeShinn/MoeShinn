# Chỉnh profile Moe Shinn

## Đưa lên GitHub

Đặt `README.md` và **toàn bộ thư mục `assets/`** ở gốc repo public `MoeShinn/MoeShinn`. README dùng đường dẫn tương đối, upload riêng README sẽ mất hình.

## Thêm avatar và ảnh nền (khuyên dùng)

Hiện avatar là chữ "M" và nền là gradient vẽ sẵn. Để dùng ảnh của bạn:

1. Chép avatar vào `assets/avatar.jpg` (hoặc `.png`, `.webp`), nên là ảnh vuông.
2. (Tuỳ chọn) chép ảnh nền vào `assets/background.jpg` (hoặc `.png`, `.webp`), nên ngang, khoảng 1920px.
3. Chạy `node scripts/build-assets.mjs` để tạo lại SVG. Ảnh lớn sẽ làm `hero.svg` nặng, nên nén ảnh (ví dụ bằng Picture-Lite) xuống dưới ~300 KB.

Chỉ dùng ảnh bạn có quyền sử dụng.

## Sửa nội dung và màu

- Lời giới thiệu, link, liên hệ: sửa trong `README.md`.
- Chữ trong banner, terminal, thẻ công nghệ, thẻ dự án, màu (biến `C`): sửa trong `scripts/build-assets.mjs`, rồi chạy lại `node scripts/build-assets.mjs`.
- Thêm dự án: thêm một mục vào mảng `projects` trong script, chạy lại, rồi thêm khối `<a><picture>…` tương ứng vào README.

SVG có bản riêng cho màn hình nhỏ. Hiệu ứng dùng SVG/CSS, không cần JavaScript, và tự tắt khi thiết bị bật giảm chuyển động. Không phụ thuộc dịch vụ ngoài.
