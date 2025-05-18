const express = require('express');
const multer = require('multer');
const { detectIngredients } = require('./vision');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('dish'), async (req, res) => {
  const filePath = req.file.path;
  const ingredients = await detectIngredients(filePath);
  res.json({ ingredients });
});

app.listen(3001, () => console.log('Server running on port 3001'));
