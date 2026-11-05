# WEBSITE CHATBOT TUYỂN SINH – ĐẠI HỌC ABC

Bài thực hành mô phỏng học phần **Điện toán đám mây Microsoft Azure**.

## Chức năng

- Website giới thiệu ngành học, học phí, học bổng và phương thức xét tuyển.
- Chatbot hoạt động ngay trên trình duyệt, trả lời theo **kịch bản FAQ JavaScript**.
- Giao diện tương thích máy tính và điện thoại, không cần cài thư viện.
- Có thể triển khai dưới dạng website tĩnh trên **Azure Static Web Apps**.

> Lưu ý: Tên trường, thông tin đào tạo và câu trả lời chỉ là nội dung **minh họa**. Đây **chưa phải** chatbot Azure OpenAI thật. Không có dữ liệu tuyển sinh hay học phí chính thức. Website không thu thập thông tin người dùng.

## Cách chạy trên máy tính (VS Code)

1. Giải nén thư mục `Website_Chatbot_Tuyen_Sinh_ABC`.
2. Mở thư mục trong Visual Studio Code.
3. Mở `index.html` bằng trình duyệt, hoặc nhấn chuột phải `index.html` > **Open with Live Server** (nếu đã cài Live Server).
4. Nhấn nút **Hỏi chatbot** để thử các câu hỏi: "Ngành Công nghệ thông tin", "Học phí", "Học bổng", "Phương thức xét tuyển".

## Danh sách tệp

- `index.html`: cấu trúc và nội dung website.
- `style.css`: giao diện và responsive.
- `script.js`: menu di động và logic chatbot demo.
- `favicon.svg`: biểu tượng website.
- `staticwebapp.config.json`: cấu hình cơ bản để triển khai trên Azure Static Web Apps.

## Cách deploy lên Azure Static Web Apps

1. Tạo một repository GitHub rồi đưa **các tệp trong thư mục này** lên root của repository.
2. Trên Azure Portal, tạo **Static Web App** và kết nối tài khoản GitHub.
3. Chọn đúng repository, nhánh `main` và **Build Presets: Custom**.
4. Đặt **App location** là `/`, **API location** để trống, **Output location** là `/` (đối với cấu hình ứng dụng HTML thuần, không dùng công cụ build).
5. Đợi GitHub Actions hoàn thành, mở URL website từ Azure Portal.
6. Chụp ảnh website hoạt động và Azure Static Web App để làm minh chứng.

**Cảnh báo bảo mật:** Nếu sau này tích hợp Azure OpenAI, không viết API key trong `script.js`. Hãy gọi Azure OpenAI từ Azure Functions hoặc backend bảo mật thông qua Managed Identity / Key Vault.

## Gợi ý ảnh minh chứng

- Hình 1: GitHub Repository có `index.html`, `style.css`, `script.js`.
- Hình 2: Azure Portal – thông tin Static Web App.
- Hình 3: Website đang hoạt động với chatbot mở.
