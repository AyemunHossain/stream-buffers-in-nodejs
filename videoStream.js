const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, 'video.mp4');
  
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const range = req.headers.range;
    if (!range) {
      res.writeHead(416, { 'Content-Type': 'text/plain' });
      res.end('Range Not Satisfiable');
      return;
    }

    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    const chunksize = (end - start) + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    });

    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);

    stream.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
