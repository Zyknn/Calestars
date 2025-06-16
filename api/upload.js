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

    const response = await axios.post('https://telegra.ph/upload', formData, {
      headers: formData.getHeaders(),
    });

    const src = response.data[0]?.src;
    if (!src) throw new Error('Invalid response from telegra.ph');

    console.log('[upload] Success:', src);
    res.status(200).json({ url: 'https://telegra.ph' + src });
  } catch (e) {
    console.error('[upload] Upload failed:', e.message);
    res.status(500).json({ error: 'Upload failed', detail: e.message });
  }
});

export default handler;
