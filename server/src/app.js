const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
//เพื่อให้โปรเจคเข้าถึงไฟล์ในโฟลเดอร์ uploads ได้
app.use('/uploads', express.static('uploads'));
app.use('/users', require('./routes/users'));
app.use('/complaints', require('./routes/complaints'));
app.use('/categories', require('./routes/categories'));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

module.exports = app;