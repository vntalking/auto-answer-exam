(function () {
  let mydata = [];
  let bai_thi = "all";

  for (let i = 0; i < 20; i++) {
    let element = $("#question_" + i);
    let dung = $(element).find(".cauhoi").find(".bg-blue-steel");
    if (dung.length > 0) {
      const cauhoi = $(element).find(".media-body").find(".mt-0").text();
      const found = mydata.some((el) => el.que === cauhoi);
      if (!found) {
        const dapan = $(element)
          .find(".input-group")
          .find(".icheck-item")
          .find(".checked")
          .parent()
          .find(".question-option")
          .text();
        mydata.push({
          bai_thi: bai_thi, // Thêm trường bai_thi vào mỗi item
          que: cauhoi,
          ans: dapan,
        });
      }
    }
  }

  // Đẩy dữ liệu lên server
  fetch('https://auto-answer-exam.onrender.com/api/collect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mydata),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Dữ liệu đã được gửi thành công:', data);
    })
    .catch((error) => {
      console.error('Lỗi khi gửi dữ liệu:', error);
    });

})();