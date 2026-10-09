# Ăn gì ở Đà Lạt

Tạp chí món ăn tiếng Việt, ưu tiên khách du lịch. MVP Astro static; không CMS, không database, không thư viện UI hay framework client. Tìm kiếm JavaScript nhỏ, hoạt động không dấu; nội dung vẫn truy cập được khi tắt JavaScript.

## Chạy & kiểm tra

Node **22** (`nvm use`), npm, rồi:

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run test:routes
npx playwright install chromium
npm run test:e2e
```

`test:routes` cần `dist/` từ build mới nhất. Playwright tự khởi động preview, kiểm tra desktop và mobile (2 cột), tìm kiếm/lọc, điều hướng, Maps, 404, ảnh lỗi và ảnh thật tải được. CI chạy cùng bộ kiểm tra trên mỗi push/PR. Screenshot nằm trong `test-results/` (không commit).

## Chỉnh nội dung

- `src/data/catalog.mjs`: danh sách món, quán, trạng thái nguồn, ngày ghi nhận. Thêm slug duy nhất, liên kết `restaurant.dish` đúng slug món. Các route được tạo tự động tại `/mon/<slug>/` và `/quan/<slug>/`.
- `src/pages/index.astro`: lời dẫn biên tập; `src/styles/global.css`: giao diện và breakpoint.
- `public/images/{nem-nuong,mi-quang,bun-bo}.webp`: ảnh AI minh họa 1200×1200. Không dùng như ảnh quán thực tế. Component tự hiển thị nền dự phòng khi thiếu ảnh.
- Không sửa dữ liệu chưa biết thành số đoán: giờ/giá `null`, số nhà chưa có `null`, `verified:false`. Khi xác minh, ghi nguồn cụ thể và ngày; đồng thời cập nhật cách trình bày, không chỉ đổi boolean.

Dữ liệu ban đầu do người dùng cung cấp ngày 09/10/2026: Nem nướng Bà Hùng — 328 Phan Đình Phùng; Mì Quảng Xí — đường Mạc Đỉnh Chi; Bún Bò Hồng — đường Phan Đình Phùng. **Chưa xác minh độc lập**. Hai quán sau chưa có số nhà. Không có đánh giá/chấm điểm hoặc khẳng định về chất lượng, nội thất, lịch sử. Maps là tìm kiếm tên + địa chỉ được mã hóa URL, không ghim đã xác minh. Ảnh là AI, không phải món tại quán.

## Cloudflare Pages

Site/canonical: `https://angidalat.pages.dev`. Build: `npm run build`; thư mục xuất bản: `dist`; Node 22. Không cần adapter/Worker cho site static. Có sitemap, robots, OG, canonical và trang 404; không có rating schema giả.

Có thể deploy thủ công (sau khi được chủ dự án cho phép), ví dụ `npx wrangler pages deploy dist --project-name angidalat --branch main` với tài khoản Cloudflare đã đăng nhập. Project hiện là Direct Upload; để tự động deploy từ GitHub cần workflow với Cloudflare token giới hạn quyền, hoặc tạo project Git-integrated riêng. Xem `DEPLOYMENT.md`. **CI hiện chỉ kiểm tra; không tự deploy**, không mặc định GitHub integration đã kết nối. Không lưu token, secret hoặc thông tin tài khoản trong repo.

## Quyết định thiết kế

Giấy ivory, chữ charcoal, điểm nhấn đỏ gạch; typography lớn kiểu tạp chí, food photography làm trung tâm. Bố cục close-crop ấm áp lấy cảm hứng thị giác từ Wong Kar-wai / In the Mood for Love nhưng tránh animation nặng. Responsive: 3 cột desktop, 2 cột mobile; giảm chuyển động theo hệ điều hành, nhãn form, aria-live, focus visible, skip link và breadcrumb. Dùng font hệ thống để không tải font ngoài.

## TDD

Trước khi triển khai catalog/search, 5 test đã chạy RED (5 fail vì chưa có dữ liệu/hàm). Trước khi viết route, 8 test route đã chạy RED (8 fail do chưa có trang đầu ra). Sau triển khai, chạy lại GREEN; e2e kiểm tra thực trên browser. Không coi build thành công là thay thế kiểm tra route hoặc hành vi trình duyệt.
