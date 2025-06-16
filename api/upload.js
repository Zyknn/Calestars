import nextConnect from 'next-connect';
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();

handler.use((req, res, next) => {
  const form = formidable({ maxFileSize: 5 * 1024 * 1024 });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('[upload] Formidable error:', err);
      return res.status(400).json({ error: 'File parsing error' });
    }
    req.body = fields;
    req.files = files;
    next();
  });
});

handler.post(async (req, res) => {
  try {
    const file = req.files.images;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.filepath));

    console.log('[upload] Sending to telegra.ph...');

    const response = await axios.post('https://telegra.ph/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/90.0.0.0 Safari/537.36'
      }
    });

    console.log('[upload] telegra.ph status:', response.status);
    console.log('[upload] telegra.ph data:', response.data);

    const src = response.data[0]?.src;
    if (!src) throw new Error('No src returned from telegra.ph');

    res.status(200).json({ url: 'https://telegra.ph' + src });
  } catch (e) {
    console.error('[upload] Upload failed:', e.message);
    res.status(500).json({ error: 'Upload failed', detail: e.message });
  }
});

export default handler;
