import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public', 'images'), {
  maxAge: '1d',
  etag: false
}));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'images'), {
  maxAge: '1d',
  etag: false
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Images available at http://localhost:${PORT}/images/IMAGE_NAME`);
  console.log(`Or http://localhost:${PORT}/uploads/IMAGE_NAME`);
});
