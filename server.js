// server.js - Vercel Serverless 및 로컬 Node.js 겸용 웹 서버
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Vercel Serverless 및 로컬 HTTP 공용 요청 핸들러
function requestHandler(req, res) {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const cleanPath = reqPath.replace(/^[/\\]+/, '');
  const filePath = path.join(__dirname, cleanPath);

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  } catch (err) {
    console.error('File serve error:', err);
  }

  // SPA Fallback: index.html
  const indexPath = path.join(__dirname, 'index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(indexPath).pipe(res);
}

// 로컬 직접 실행 시
if (require.main === module) {
  const localServer = http.createServer(requestHandler);
  localServer.listen(PORT, () => {
    console.log(`🚗 정비기능사 실기 마스터 서버 실행 중: http://localhost:${PORT}`);
  });
}

// Vercel Serverless 핸들러 내보내기
module.exports = requestHandler;
