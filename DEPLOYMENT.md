# Triển khai

Website static Astro trên Cloudflare Pages project `angidalat`, production branch `main`.

## Triển khai trực tiếp từ WSL đã đăng nhập Wrangler

```sh
npm ci
npm run check
npm test
npm run build
npx wrangler@4 pages deploy dist --project-name angidalat --branch main
```

URL dự kiến: https://angidalat.pages.dev

GitHub lưu source và chạy CI. Project hiện được tạo kiểu Direct Upload, chưa kết nối Git tự động. Mỗi cập nhật cần build và deploy bằng Wrangler, hoặc cấu hình GitHub Actions với token Cloudflare giới hạn quyền Pages. Không đưa OAuth token cá nhân, `.env` hoặc cấu hình Wrangler vào repo.

Sau deploy cần kiểm tra URL production, các trang món/quán, ảnh tải được và nút Maps. Không xem upload thành công là đủ để xác nhận website live.
