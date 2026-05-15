const express = require('express');
const app = express();
const multer = require('multer');

const postModel = require('./models/post.model');
const uploadImage = require('./services/storage.service');

app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

app.get('/feeds', async (req, res) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/create-post', upload.single('image'), async (req, res) => {
    const { caption, user, createdAt, likes } = req.body;
    const { buffer, originalname } = req.file;

    const result = await uploadImage(buffer, originalname);
    const post = await postModel.create({
        image: result.url,
        caption,
        user,
        likes,
    });
    return res.status(200).json({ message: 'Post created successfully'});
})




module.exports = app;