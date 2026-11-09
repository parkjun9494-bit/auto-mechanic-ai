// test.js - AutoMechanic AI 정적 무결성 및 구문 검사
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

console.log('--- AutoMechanic AI 프로젝트 무결성 테스트 시작 ---');

// 1. 핵심 파일 존재 확인
const files = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/audioSimulator.js',
  'js/storage.js',
  'js/data/warningLights.js',
  'js/data/symptomRules.js',
  'js/data/maintenanceData.js',
  'js/data/costGuideData.js',
  'server.js',
  'package.json',
  'vercel.json',
  'README.md'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  assert(fs.existsSync(fullPath), `파일 존재 확인: ${f}`);
});

// 2. index.html 핵심 마크업 검사
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
assert(indexHtml.includes('id="tab-diagnose"'), 'AI 스마트 진단 탭 컨테이너 존재');
assert(indexHtml.includes('id="tab-warning_lights"'), '계기판 경고등 탭 컨테이너 존재');
assert(indexHtml.includes('id="tab-maintenance"'), '소모품 주기 계산기 탭 컨테이너 존재');
assert(indexHtml.includes('id="tab-cost_guide"'), '정비 표준 견적 탭 컨테이너 존재');
assert(indexHtml.includes('id="tab-ai_chat"'), 'AI 1:1 상담 탭 컨테이너 존재');
assert(indexHtml.includes('id="tab-garage"'), '내 차고 탭 컨테이너 존재');
assert(indexHtml.includes('id="wl-detail-modal"'), '경고등 모달 존재');
assert(indexHtml.includes('id="car-edit-modal"'), '차량 정보 변경 모달 존재');

// 3. 자바스크립트 파일 문법 구문 분석 (Syntax Validation)
const jsFiles = [
  'server.js',
  'js/audioSimulator.js',
  'js/storage.js',
  'js/data/warningLights.js',
  'js/data/symptomRules.js',
  'js/data/maintenanceData.js',
  'js/data/costGuideData.js',
  'js/app.js'
];

jsFiles.forEach(f => {
  const code = fs.readFileSync(path.join(__dirname, f), 'utf-8');
  try {
    // ES 모듈 파일은 vm.Script 대신 parse 확인 (또는 모듈 체크)
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
