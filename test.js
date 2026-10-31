// test.js - 자동차 정비기능사 실기 마스터 정적 무결성 및 구문 검사
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- 자동차 정비기능사 실기 마스터 프로젝트 무결성 테스트 시작 ---');

// 1. 핵심 파일 존재 확인
const files = [
  'index.html',
  'js/app.js',
  'js/data/matrix.js',
  'js/data/inspection_standards.js',
  'js/data/records_data.js',
  'js/data/assembly_data.js',
  'scripts/server.js',
  'package.json',
  'vercel.json',
  'README.md'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  assert(fs.existsSync(fullPath), `파일 존재 확인: ${f}`);
});

// 2. index.html 핵심 모바일 UI 마크업 검사
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
assert(indexHtml.includes('id="roundNavContainer"'), '1~15안 수평 스크롤 컨테이너 존재');
assert(indexHtml.includes('id="mainContentArea"'), '메인 콘텐츠 렌더링 영역 존재');
assert(indexHtml.includes('id="wakeLockToggle"'), '화면 켜짐 유지(Wake Lock) 토글 존재');
assert(indexHtml.includes('id="mockExamBtn"'), '랜덤 모의고사 버튼 존재');
assert(indexHtml.includes('bottom-nav-btn'), '모바일 하단 네비게이션 바 존재');
assert(indexHtml.includes('viewport-fit=cover'), '아이폰 노치 및 세이프에어리어 메타태그 대응');

// 3. 자바스크립트 파일 문법 구문 분석 (Syntax Validation)
const jsFiles = [
  'scripts/server.js',
  'js/data/matrix.js',
  'js/data/inspection_standards.js',
  'js/data/records_data.js',
  'js/data/assembly_data.js',
  'js/app.js'
];

jsFiles.forEach(f => {
  const code = fs.readFileSync(path.join(__dirname, f), 'utf-8');
  try {
    new vm.Script(code.replace(/export\s+(const|default|class|let|var|function)/g, '$1').replace(/import\s+.*?from\s+['"].*?['"];?/g, ''));
    assert(true, `JS 문법 무결성 검증: ${f}`);
  } catch (e) {
    assert(false, `JS 구문 오류 발생 (${f}): ${e.message}`);
  }
});

// 4. JSON 파일 유효성 검사
['package.json', 'vercel.json'].forEach(f => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, f), 'utf-8');
    JSON.parse(raw);
    assert(true, `JSON 유효성 확인: ${f}`);
  } catch (e) {
    assert(false, `JSON 파싱 오류 (${f}): ${e.message}`);
  }
});

if (failures > 0) {
  console.error(`\n총 ${failures}건의 테스트 실패 발생.`);
  process.exit(1);
} else {
  console.log('\n🎉 모든 자동 테스트 통과 완료 (100% 무결점)!');
  process.exit(0);
}
