// scripts/build.js - 정적 배포용 빌드 스크립트 (크로스 플랫폼 무결성 보장)
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public');

console.log('🔨 정적 빌드 시작:', outDir);

// public 디렉토리 정리 및 생성
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 복사 대상 파일 및 디렉토리
const copyItems = [
  'index.html',
  'js',
  'qnet_exam_guide.pdf'
];

copyItems.forEach(item => {
  const src = path.join(rootDir, item);
  const dest = path.join(outDir, item);
  if (fs.existsSync(src)) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      fs.cpSync(src, dest, { recursive: true });
      console.log(`📁 디렉토리 복사: ${item} ➔ public/${item}`);
    } else {
      fs.copyFileSync(src, dest);
      console.log(`📄 파일 복사: ${item} ➔ public/${item}`);
    }
  } else {
    console.warn(`⚠️ 대상 없음: ${item}`);
  }
});

console.log('✅ 정적 빌드 완료!');
