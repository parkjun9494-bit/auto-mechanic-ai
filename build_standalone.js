// build_standalone.js
// 모든 JS 모듈, 데이터, CSS를 하나의 단독 실행 HTML 파일로 번들링하는 스크립트
// 다른 PC에서 Node.js, 웹서버, npm 설치 없이 더블클릭만으로 즉시 작동하도록 제작합니다.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🚗 AutoMechanic AI 단독 실행용 HTML 번들링 시작...');

// 1. 소스 파일 로드
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'css', 'styles.css'), 'utf-8');

const warningLightsJs = fs.readFileSync(path.join(__dirname, 'js', 'data', 'warningLights.js'), 'utf-8');
const symptomRulesJs = fs.readFileSync(path.join(__dirname, 'js', 'data', 'symptomRules.js'), 'utf-8');
const maintenanceDataJs = fs.readFileSync(path.join(__dirname, 'js', 'data', 'maintenanceData.js'), 'utf-8');
const costGuideDataJs = fs.readFileSync(path.join(__dirname, 'js', 'data', 'costGuideData.js'), 'utf-8');
const audioSimulatorJs = fs.readFileSync(path.join(__dirname, 'js', 'audioSimulator.js'), 'utf-8');
const storageJs = fs.readFileSync(path.join(__dirname, 'js', 'storage.js'), 'utf-8');
const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf-8');

// 2. export 및 import 문 제거 함수
function stripEsModules(code) {
  return code
    .replace(/^\s*import\s+.*?;?\s*$/gm, '') // import 제거
    .replace(/export\s+(const|let|var|function|class)/g, '$1') // export const -> const
    .replace(/export\s*\{\s*.*?\s*\}\s*;?/g, '') // export { ... } 제거
    .replace(/export\s+default\s+.*?;?/g, ''); // export default 제거
}

// 3. 순서대로 JS 합치기
const bundledJs = [
  '// === 1. 경고등 데이터 ===',
  stripEsModules(warningLightsJs),
  '\n// === 2. 증상 진단 룰 엔진 데이터 ===',
  stripEsModules(symptomRulesJs),
  '\n// === 3. 소모품 주기 데이터 ===',
  stripEsModules(maintenanceDataJs),
  '\n// === 4. 정비 표준 견적 데이터 ===',
  stripEsModules(costGuideDataJs),
  '\n// === 5. Web Audio 고장 소음 시뮬레이터 ===',
  stripEsModules(audioSimulatorJs),
  '\n// === 6. 로컬스토리지 관리자 ===',
  stripEsModules(storageJs),
  '\n// === 7. 메인 애플리케이션 컨트롤러 ===',
  stripEsModules(appJs)
].join('\n\n');

// 4. 번들 JS 구문 유효성 검사 (Syntax Check)
try {
  new vm.Script(bundledJs);
  console.log('✅ 번들링된 자바스크립트 문법 무결성 검증 완료 (구문 오류 없음)');
} catch (e) {
  console.error('❌ JS 구문 오류 발생:', e.message);
  process.exit(1);
}

// 5. 단독 실행 HTML 조합
let standaloneHtml = indexHtml;

// CSS 인라인화
const cssTag = `<style>\n${stylesCss}\n</style>`;
standaloneHtml = standaloneHtml.replace(
  /<link\s+rel=["']stylesheet["']\s+href=["']css\/styles\.css["']\s*\/?>/i,
  cssTag
);

// JS 인라인화 (type="module" 제거하여 file:// 로컬 직접 실행 시 CORS 문제 원천 차단)
const jsTag = `<script>\n${bundledJs}\n</script>`;
standaloneHtml = standaloneHtml.replace(
  /<script\s+type=["']module["']\s+src=["']js\/app\.js["']\s*><\/script>/i,
  jsTag
);

// 단독 실행 파일 안내 뱃지 추가 (헤더)
const badgeNotice = `<div class="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-[11px] font-bold py-1 px-3 text-center flex items-center justify-center gap-2 shadow-sm">
  <span>💾 <strong>단독 실행(포터블) 버전</strong>: 다른 PC나 스마트폰으로 이 HTML 파일만 복사해서 더블클릭하면 서버 설치 없이 즉시 실행됩니다.</span>
</div>\n`;

standaloneHtml = standaloneHtml.replace('<body', badgeNotice + '<body');

// 6. 파일 저장 (한글 파일명 & 영문 파일명 2가지 생성)
const outputPathKorean = path.join(__dirname, 'AutoMechanic_AI_단독실행.html');
const outputPathAscii = path.join(__dirname, 'auto-mechanic-ai-standalone.html');

fs.writeFileSync(outputPathKorean, standaloneHtml, 'utf-8');
fs.writeFileSync(outputPathAscii, standaloneHtml, 'utf-8');

const statsKorean = fs.statSync(outputPathKorean);
console.log(`🎉 성공: ${outputPathKorean} 생성 완료 (${Math.round(statsKorean.size / 1024)} KB)`);
console.log(`🎉 성공: ${outputPathAscii} 생성 완료`);
