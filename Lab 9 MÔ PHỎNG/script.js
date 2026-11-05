/*
 * Chatbot tuyển sinh Đại học ABC – BẢN DEMO TĨNH.
 * Không kết nối Azure OpenAI, không thu thập hoặc gửi dữ liệu người dùng.
 * Có thể triển khai trực tiếp trên Azure Static Web Apps.
 */
(() => {
  'use strict';

  const chatPanel = document.getElementById('chat-panel');
  const chatLauncher = document.getElementById('chat-launcher');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-links');

  if (!chatPanel || !chatLauncher || !chatMessages || !chatForm || !chatInput) return;

  function normalize(value) {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const programs = [
    {
      terms: ['cong nghe thong tin', 'cntt', 'lap trinh', 'phan mem', 'it'],
      name: 'Công nghệ thông tin',
      detail: 'Ngành học liên quan đến lập trình, phát triển phần mềm, cơ sở dữ liệu, mạng máy tính và các ứng dụng công nghệ. Thông tin chương trình và chỉ tiêu trong website này chỉ mang tính minh họa.'
    },
    {
      terms: ['quan tri kinh doanh', 'kinh doanh', 'quan tri', 'marketing'],
      name: 'Quản trị kinh doanh',
      detail: 'Ngành học cung cấp kiến thức về quản lý, marketing, tài chính và hoạt động doanh nghiệp. Danh mục môn học và điều kiện xét tuyển cần đối chiếu thông báo chính thức.'
    },
    {
      terms: ['thiet ke do hoa', 'do hoa', 'thiet ke', 'design'],
      name: 'Thiết kế đồ họa',
      detail: 'Ngành học tập trung vào tư duy sáng tạo, thiết kế hình ảnh, thương hiệu và các sản phẩm truyền thông số. Đây là ví dụ minh họa cho bài thực hành.'
    },
    {
      terms: ['ngon ngu anh', 'tieng anh', 'anh van'],
      name: 'Ngôn ngữ Anh',
      detail: 'Ngành học phát triển năng lực sử dụng tiếng Anh, nghiên cứu ngôn ngữ và giao tiếp trong môi trường đa văn hóa. Thông tin tuyển sinh cụ thể chưa được cung cấp.'
    }
  ];

  const answers = {
    welcome: 'Chào bạn! Mình là chatbot mô phỏng của Đại học ABC. Bạn có thể hỏi về ngành học, học phí, học bổng và phương thức xét tuyển. Thông tin ở đây là dữ liệu minh họa, không phải thông báo chính thức.',
    programs: 'Trong bản demo này, Trường Đại học ABC giới thiệu 4 ngành minh họa:\n• Công nghệ thông tin\n• Quản trị kinh doanh\n• Thiết kế đồ họa\n• Ngôn ngữ Anh\n\nBạn có thể hỏi cụ thể từng ngành để xem mô tả.',
    tuition: 'Học phí có thể thay đổi theo ngành, số tín chỉ và từng năm học. Để biết chính xác, hãy kiểm tra bảng học phí do trường công bố. Hiện dự án mô phỏng chưa có bảng học phí chính thức và không đưa ra số tiền giả định.',
    scholarships: 'Các nhóm học bổng thường gặp gồm:\n• Học bổng đầu vào\n• Học bổng thành tích học tập\n• Học bổng hỗ trợ sinh viên\n\nĐiều kiện, hồ sơ và giá trị học bổng tùy thuộc thông báo chính thức từng năm của nhà trường.',
    admissions: 'Các phương thức xét tuyển của trường cần được xác nhận theo đề án tuyển sinh của từng năm. Một số hình thức thường gặp tại các trường đại học là xét điểm thi tốt nghiệp THPT, xét học bạ hoặc xét kết quả kỳ thi đánh giá năng lực. Không nên coi đây là danh sách phương thức chính thức của ABC.',
    documents: 'Bạn nên chuẩn bị các giấy tờ theo hướng dẫn tuyển sinh chính thức, kiểm tra mốc thời gian, thông tin cá nhân và điều kiện của phương thức đã chọn. Danh mục hồ sơ cụ thể chưa được cung cấp trong bản demo.',
    deadlines: 'Website mô phỏng chưa có lịch nhận hồ sơ hoặc hạn chót chính thức. Hãy xem thông báo tuyển sinh của trường cho đúng năm đăng ký.',
    contact: 'Đây là website thực hành, không phải cổng thông tin chính thức của một trường đại học có thật. Vì vậy mình không cung cấp số điện thoại, địa chỉ hoặc email tuyển sinh chưa được xác minh.',
    azure: 'Bản demo sử dụng HTML, CSS và JavaScript, chạy được trên Azure Static Web Apps. Để trả lời bằng AI thực tế cần thêm Azure Functions/API, Azure AI Foundry hoặc Azure OpenAI, Azure AI Search và Azure Blob Storage.',
    fallback: 'Mình chưa tìm thấy câu trả lời phù hợp trong bộ câu hỏi mẫu. Bạn hãy thử hỏi về “ngành học”, “học phí”, “học bổng”, “xét tuyển” hoặc tên ngành cụ thể. Đây là chatbot demo, chưa dùng mô hình AI.'
  };

  function getAnswer(question) {
    const q = normalize(question);
    if (!q) return 'Bạn hãy nhập một câu hỏi nhé!';
    if (/\b(xin chao|chao|hello|hi|hey)\b/.test(q) || q === 'alo') return answers.welcome;
    if (/\b(azure|openai|chatgpt|ai that|tri tue nhan tao)\b/.test(q)) return answers.azure;
    if (/\b(lien he|so dien thoai|email|dia chi|hotline)\b/.test(q)) return answers.contact;
    if (/\b(han chot|han nop|thoi gian|khi nao|lich tuyen sinh|ngay nop)\b/.test(q)) return answers.deadlines;
    if (/\b(ho so|giay to|dang ky nhu the nao|thu tuc|nhap hoc)\b/.test(q)) return answers.documents;
    if (/\b(hoc bong|mien giam|ho tro tai chinh)\b/.test(q)) return answers.scholarships;
    if (/\b(hoc phi|bao nhieu tien|chi phi hoc|dong tien|tin chi)\b/.test(q)) return answers.tuition;
    if (/\b(xet tuyen|tuyen sinh|diem chuan|diem thi|hoc ba|danh gia nang luc|phuong thuc)\b/.test(q)) return answers.admissions;

    for (const program of programs) {
      if (program.terms.some(term => q.includes(term))) {
        return `${program.name}: ${program.detail}\n\nBạn cũng có thể hỏi về “học phí” hoặc “phương thức xét tuyển”.`;
      }
    }
    if (/\b(nganh|nganh hoc|dao tao|hoc gi|chuong trinh|khoa)\b/.test(q)) return answers.programs;
    return answers.fallback;
  }

  function addMessage(text, origin) {
    const message = document.createElement('div');
    message.className = `chat-message chat-message--${origin}`;
    if (origin === 'bot') {
      const icon = document.createElement('span');
      icon.className = 'chat-message__avatar';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✦';
      message.appendChild(icon);
    }
    const bubble = document.createElement('div');
    bubble.className = 'chat-message__bubble';
    bubble.textContent = text; // textContent tránh chèn HTML/script từ nội dung người dùng
    message.appendChild(bubble);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function openChat(focusInput = true) {
    chatPanel.hidden = false;
    chatPanel.setAttribute('aria-hidden', 'false');
    chatLauncher.setAttribute('aria-expanded', 'true');
    if (focusInput) chatInput.focus({ preventScroll: true });
  }

  function closeChat() {
    chatPanel.hidden = true;
    chatPanel.setAttribute('aria-hidden', 'true');
    chatLauncher.setAttribute('aria-expanded', 'false');
    chatLauncher.focus({ preventScroll: true });
  }

  function sendQuestion(rawQuestion) {
    const question = String(rawQuestion).trim();
    if (!question) return;
    openChat(false);
    addMessage(question, 'user');
    addMessage(getAnswer(question), 'bot');
    chatInput.value = '';
    chatInput.focus({ preventScroll: true });
  }

  chatLauncher.addEventListener('click', () => {
    if (chatPanel.hidden) openChat();
    else closeChat();
  });
  chatClose?.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    sendQuestion(chatInput.value);
  });

  document.querySelectorAll('[data-open-chat]').forEach(button => {
    button.addEventListener('click', () => openChat());
  });

  document.querySelectorAll('[data-question]').forEach(button => {
    button.addEventListener('click', () => {
      sendQuestion(button.getAttribute('data-question') || '');
    });
  });

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('is-open', !expanded);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !chatPanel.hidden) closeChat();
  });
})();
