const express = require('express');
const mongoose = require('mongoose');
const CollectionItem = require('./models/CollectionItem');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5020;

// Sử dụng CORS middleware
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://anhsonduong:MmSv8wkDaIMU3mpn@cluster0.u3ndupg.mongodb.net/elearning_2024?retryWrites=true&w=majority', {});

// Middleware để parse JSON body
app.use(express.json());

// Cấu hình Express để phục vụ các file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// API 1: Lưu dữ liệu từ client vào DB
app.post('/api/collect', async (req, res) => {
  try {
    const data = req.body; // Lấy dữ liệu từ client
    
    // Sử dụng Promise.all để kiểm tra và lưu các phần tử chưa tồn tại
    const savedItems = [];
    
    for (const item of data) {
      const existingItem = await CollectionItem.findOne({ que: item.que });
      if (!existingItem) {
        const newItem = new CollectionItem(item);
        const savedItem = await newItem.save();
        savedItems.push(savedItem);
      }
    }

    if (savedItems.length > 0) {
      res.status(201).json({ message: 'Dữ liệu đã được lưu thành công.', data: savedItems });
    } else {
      res.status(200).json({ message: 'Không có dữ liệu mới được lưu vì tất cả các giá trị que đã tồn tại trong DB.' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi lưu dữ liệu.', error: error?.errorResponse?.message });
  }
});

// API 2: Trả về danh sách dữ liệu thu thập được
app.get('/api/collections', async (req, res) => {
  try {
    const items = await CollectionItem.find(); // Lấy tất cả dữ liệu từ DB
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu.', error });
  }
});

app.get('/', async (req, res) => {
  try {
    res.status(200).json({status: "OK", data: []});
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu.', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});