const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Create a client with the service account JSON key
const client = new vision.ImageAnnotatorClient({
  keyFilename: './path-to-your-service-account-file.json',
});

app.post('/clarifai', async (req, res) => {
  try {
    const { base64Image } = req.body;

    const [result] = await client.labelDetection({
      image: { content: base64Image },
    });

    const labels = result.labelAnnotations.map(label => ({
      name: label.description,
      score: label.score,
    }));

    res.json({ labels });
  } catch (error) {
    console.error('Google Vision error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
