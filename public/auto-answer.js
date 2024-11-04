// Khởi tạo biến cauhoi
let cauhoi = [];

// Hàm để tải dữ liệu từ API
async function fetchData() {
    try {
        const response = await fetch(`https://auto-answer-exam.onrender.com/api/collections`);
        const data = await response.json();
        cauhoi = data; // Lưu dữ liệu vào biến cauhoi
        processQuestions(); // Gọi hàm xử lý câu hỏi sau khi nhận dữ liệu
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
    }
}

// Hàm để xử lý câu hỏi
function processQuestions() {
    $('.single_choice').each(function(i, ele) {
        setTimeout(function () {
            var q = $(ele).find('.media-body div pre').text()?.trim()?.toLowerCase();
            var cautraloi = 'a123s232';
            cauhoi.forEach(function(entry) {
                var n = q == document.createTextNode(entry.que).nodeValue?.trim()?.toLowerCase();
                if (n) {
                    cautraloi = entry.ans;
                }
            });
            $(ele).find('.question-option').each(function(i2, ele2) {
                if ($(ele2).text().trim() === cautraloi.trim()) {
                    $(ele2).parent().find('.questionAnswer').click();
                    console.log("Clicked:", $(ele2).text());
                }
            });
        }, i * ((Math.floor(Math.random() * 5) + 1) * 1000));
    });

    $('.multiple_choice').each(function(i, ele) {
        setTimeout(function () {
            var q = $(ele).find('.media-body div pre').text()?.trim()?.toLowerCase();
            var cautraloi1 = {};
            cauhoi.forEach(function(entry) {
                var n = q == document.createTextNode(entry.que).nodeValue?.trim()?.toLowerCase();
                if (n) {
                    cautraloi1 = entry;
                }
            });

            $(ele).find('.question-option').each(function(i2, ele2) {
                const ans = cautraloi1["ans"];
                if (`${ans}`.includes($(ele2).text())) {
                    setTimeout(() => {
                        $(ele2).parent().find('.questionAnswer').click();
                        console.log("Clicked:", $(ele2).text());
                    }, i2 * 500); // Thay đổi 500 thành thời gian trễ mong muốn
                }
            });
        }, i * ((Math.floor(Math.random() * 5) + 1) * 1000));
    });

    $('.true_false').each(function(i, ele) {
        setTimeout(function () {
            var q = $(ele).find('.media-body div pre').text()?.trim()?.toLowerCase();
            var cautraloi2 = 'a123s232';
            cauhoi.forEach(function(entry) {
                var n = q == document.createTextNode(entry.que).nodeValue?.trim()?.toLowerCase();
                if (n) {
                    cautraloi2 = entry.ans;
                }
            });
            $(ele).find('.question-option').each(function(i2, ele2) {
                if ($(ele2).text().indexOf(cautraloi2) > -1) {
                    $(ele2).parent().find('.questionAnswer').click();
                    console.log("Clicked:", $(ele2).text());
                }
            });
        }, i * ((Math.floor(Math.random() * 5) + 1) * 1000));
    });
}

// Gọi hàm fetchData để bắt đầu
fetchData();