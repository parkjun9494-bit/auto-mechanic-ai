import { EXAM_MATRIX } from './data/matrix.js';
import { INSPECTION_STANDARDS } from './data/inspection_standards.js';
import { RECORD_SHEET_ITEMS } from './data/records_data.js';
import { ASSEMBLY_GUIDES } from './data/assembly_data.js';

// 상태 관리
const state = {
  currentRound: 1,
  currentCategory: 'engine', // engine, chassis, electrical, inspection
  examMode: 'practice', // practice, mock
  mockTimerSeconds: 7200, // 2시간
  mockTimerInterval: null,
  wakeLock: null,
  wakeLockActive: false,
  userAnswers: {}, // { "1_injection_nozzle": { standard: "", measured: "", judgment: "", action: "", completed: false } }
  assemblyChecks: {} // { "1_diesel_head_step_1": true }
};

// 로컬스토리지 동기화 키
const STORAGE_KEY_ANSWERS = 'auto_mechanic_exam_answers_v1';
const STORAGE_KEY_CHECKS = 'auto_mechanic_assembly_checks_v1';

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  initUI();
  renderRoundNav();
  renderContent();
  setupWakeLock();
});

// 로컬스토리지 불러오기
function loadStorage() {
  try {
    const savedAnswers = localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (savedAnswers) state.userAnswers = JSON.parse(savedAnswers);
    const savedChecks = localStorage.getItem(STORAGE_KEY_CHECKS);
    if (savedChecks) state.assemblyChecks = JSON.parse(savedChecks);
  } catch (e) {
    console.error('Storage load failed', e);
  }
}

// 로컬스토리지 저장
function saveStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(state.userAnswers));
    localStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(state.assemblyChecks));
    updateProgressBadges();
  } catch (e) {
    console.error('Storage save failed', e);
  }
}

// UI 초기 설정
function initUI() {
  // 모바일 카테고리 탭 이벤트
  const catButtons = document.querySelectorAll('.cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = btn.dataset.category;
      switchCategory(cat);
    });
  });

  // 하단 탭 바 이벤트
  const navButtons = document.querySelectorAll('.bottom-nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      if (cat === 'rounds') {
        openRoundSelectorModal();
      } else {
        switchCategory(cat);
      }
    });
  });

  // 화면 켜짐 유지 토글
  const wakeLockBtn = document.getElementById('wakeLockToggle');
  if (wakeLockBtn) {
    wakeLockBtn.addEventListener('click', toggleWakeLock);
  }

  // 모의고사 모드 토글
  const mockExamBtn = document.getElementById('mockExamBtn');
  if (mockExamBtn) {
    mockExamBtn.addEventListener('click', startRandomMockExam);
  }

  // 족보 모달 열기
  const formulaBookBtn = document.getElementById('formulaBookBtn');
  if (formulaBookBtn) {
    formulaBookBtn.addEventListener('click', openFormulaModal);
  }
}

// 카테고리 전환
function switchCategory(cat) {
  state.currentCategory = cat;
  
  // 카테고리 버튼 UI 업데이트
  document.querySelectorAll('.cat-btn').forEach(b => {
    if (b.dataset.category === cat) {
      b.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-slate-800', 'dark:text-gray-300');
      b.classList.add('bg-blue-600', 'text-white', 'shadow-md');
    } else {
      b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      b.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-slate-800', 'dark:text-gray-300');
    }
  });

  // 하단 네비게이션 버튼 UI 업데이트
  document.querySelectorAll('.bottom-nav-btn').forEach(b => {
    const isTarget = b.dataset.category === cat;
    const icon = b.querySelector('.nav-icon');
    const label = b.querySelector('.nav-label');
    if (isTarget) {
      b.classList.add('text-blue-600', 'font-bold');
      b.classList.remove('text-gray-500');
    } else if (b.dataset.category !== 'rounds') {
      b.classList.remove('text-blue-600', 'font-bold');
      b.classList.add('text-gray-500');
    }
  });

  renderContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 1~15안 상단 수평 스크롤 네비게이션 렌더링
function renderRoundNav() {
  const container = document.getElementById('roundNavContainer');
  if (!container) return;

  container.innerHTML = '';
  for (let r = 1; r <= 15; r++) {
    const isCurrent = state.currentRound === r;
    const roundData = EXAM_MATRIX[r];
    
    // 진행도 계산
    const progress = calculateRoundProgress(r);

    const btn = document.createElement('button');
    btn.className = `flex-shrink-0 px-4 py-2.5 rounded-2xl flex items-center space-x-2 transition-all duration-200 ${
      isCurrent 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105 font-bold ring-2 ring-blue-400' 
        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 hover:border-blue-400'
    }`;
    btn.innerHTML = `
      <span>제 ${r} 안</span>
      <span class="text-xs px-2 py-0.5 rounded-full ${
        isCurrent ? 'bg-white/20 text-white' : progress === 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-gray-100 dark:bg-slate-700 text-gray-500'
      }">${progress}%</span>
    `;

    btn.addEventListener('click', () => {
      selectRound(r);
    });

    container.appendChild(btn);
  }
}

// 안 선택
function selectRound(r) {
  state.currentRound = r;
  renderRoundNav();
  renderContent();
}

// 특정 안 진행도 계산 (%)
function calculateRoundProgress(round) {
  const roundInfo = EXAM_MATRIX[round];
  if (!roundInfo) return 0;
  
  let totalTasks = 6; // 기록표 3개 + 탈부착 3개
  let completedTasks = 0;

  // 기록표 완료 여부
  const engineRecKey = `${round}_${roundInfo.engine.record.type}`;
  if (state.userAnswers[engineRecKey]?.completed) completedTasks++;

  const chassisRecKey = `${round}_${roundInfo.chassis.record.type}`;
  if (state.userAnswers[chassisRecKey]?.completed) completedTasks++;

  const electRecKey = `${round}_${roundInfo.electrical.record.type}`;
  if (state.userAnswers[electRecKey]?.completed) completedTasks++;

  // 탈부착 완료 여부 (체크 50% 이상 완료 시 인정)
  if (checkAssemblyDone(round, 'engine')) completedTasks++;
  if (checkAssemblyDone(round, 'chassis')) completedTasks++;
  if (checkAssemblyDone(round, 'electrical')) completedTasks++;

  return Math.round((completedTasks / totalTasks) * 100);
}

function checkAssemblyDone(round, cat) {
  const prefix = `${round}_${cat}_`;
  let total = 0;
  let checked = 0;
  Object.keys(state.assemblyChecks).forEach(k => {
    if (k.startsWith(prefix)) {
      total++;
      if (state.assemblyChecks[k]) checked++;
    }
  });
  return total > 0 && checked >= total * 0.8;
}

// 뱃지 갱신
function updateProgressBadges() {
  renderRoundNav();
}

// 메인 콘텐츠 렌더링
function renderContent() {
  const container = document.getElementById('mainContentArea');
  if (!container) return;

  const round = state.currentRound;
  const roundData = EXAM_MATRIX[round];

  if (state.currentCategory === 'inspection') {
    renderInspectionStandards(container);
    return;
  }

  // 현재 파트에 맞는 정보 추출
  let partData = null;
  let partTitle = '';
  let partIcon = '';
  let guideKey = '';

  if (state.currentCategory === 'engine') {
    partData = roundData.engine;
    partTitle = '기관 (Engine) 파트';
    partIcon = '⚙️';
    guideKey = getGuideKeyForEngine(round);
  } else if (state.currentCategory === 'chassis') {
    partData = roundData.chassis;
    partTitle = '섀시 (Chassis) 파트';
    partIcon = '🛞';
    guideKey = getGuideKeyForChassis(round);
  } else if (state.currentCategory === 'electrical') {
    partData = roundData.electrical;
    partTitle = '전기 (Electrical) 파트';
    partIcon = '⚡';
    guideKey = getGuideKeyForElectrical(round);
  }

  const guide = ASSEMBLY_GUIDES[guideKey] || null;
  const recordItem = RECORD_SHEET_ITEMS[partData.record.type] || RECORD_SHEET_ITEMS.injection_nozzle;

  container.innerHTML = `
    <!-- 상단 안 개요 카드 -->
    <div class="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 mb-6 shadow-xl border border-indigo-900/50">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span class="text-xs font-semibold px-2.5 py-1 bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30">공개시험문제</span>
          <h2 class="text-xl font-bold text-white tracking-tight">제 ${round} 안 — ${partTitle}</h2>
        </div>
        <span class="text-2xl">${partIcon}</span>
      </div>

      <!-- 과제 요약 칩 리스트 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 mb-2">
        <div class="bg-white/5 rounded-xl p-2.5 flex items-start space-x-2 border border-white/5">
          <span class="text-amber-400 font-bold flex-shrink-0">탈거/조립:</span>
          <span class="font-medium text-white">${partData.removal}</span>
        </div>
        <div class="bg-white/5 rounded-xl p-2.5 flex items-start space-x-2 border border-white/5">
          <span class="text-sky-400 font-bold flex-shrink-0">기록표:</span>
          <span class="font-medium text-white">${partData.record.name}</span>
        </div>
      </div>

      ${partData.fault ? `
        <div class="mt-2 text-xs bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-2 flex items-center justify-between">
          <span>🚨 시동 고장 1개소: <strong>${partData.fault}</strong></span>
          <span class="text-[11px] bg-red-500/20 px-2 py-0.5 rounded-full font-mono">시동 확인 필수</span>
        </div>
      ` : ''}
    </div>

    <!-- 1. 부품 탈거/조립 인터랙티브 실습 체크리스트 -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 mb-6 shadow-md border border-gray-100 dark:border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold text-sm">1</div>
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white text-base">탈거·조립 실습 체크리스트</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">단계별 분해 ➔ 🚨감독관 확인 ➔ 규정 체결 조립</p>
          </div>
        </div>
        <button id="resetChecklistBtn" class="text-xs text-gray-400 hover:text-red-500 flex items-center space-x-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>체크 초기화</span>
        </button>
      </div>

      ${guide ? renderAssemblyGuide(guide, round) : `
        <div class="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl text-xs text-gray-500">
          이 과제는 부품 탈거 후 감독관 확인을 받고 규정 토크로 재조립합니다.
        </div>
      `}
    </div>

    <!-- 2. 실기 기록표(답안지) 인터랙티브 훈련장 -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 mb-8 shadow-md border border-gray-100 dark:border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-sm">2</div>
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white text-base">실기 기록표(답안지) 작성 훈련</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">실제 Q-Net 답안지 양식과 100% 동일한 선택형/직접입력 훈련</p>
          </div>
        </div>
        <button id="showModelAnswerBtn" class="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-800 hover:bg-blue-100">
          🎯 모범 답안 보기
        </button>
      </div>

      <!-- 기록표 훈련 컴포넌트 -->
      <div id="recordSheetTrainerContainer">
        ${renderRecordSheetTrainer(recordItem, round)}
      </div>
    </div>
  `;

  // 이벤트 바인딩
  attachContentEvents(round, recordItem, guide);
}

// 탈부착 가이드 키 매핑 헬퍼
function getGuideKeyForEngine(round) {
  if ([1].includes(round)) return 'diesel_head';
  if ([2].includes(round)) return 'gasoline_head';
  if ([4].includes(round)) return 'timing_belt';
  if ([5, 6, 9, 10, 12].includes(round)) return 'crankshaft';
  return 'engine_sensors';
}

function getGuideKeyForChassis(round) {
  if ([1, 9].includes(round)) return 'strut_absorber';
  if ([1, 2, 4, 8, 9, 13, 14].includes(round)) return 'brake_pad_caliper';
  if ([5, 7].includes(round)) return 'tie_rod_end';
  return 'brake_pad_caliper';
}

function getGuideKeyForElectrical(round) {
  if ([1, 3, 14].includes(round)) return 'wiper_motor';
  if ([2, 12].includes(round)) return 'alternator';
  if ([4].includes(round)) return 'starter_motor';
  return 'starter_motor';
}

// 탈부착 가이드 HTML 렌더링
function renderAssemblyGuide(guide, round) {
  const cat = state.currentCategory;
  return `
    <!-- 공구 및 안전 수칙 칩 -->
    <div class="mb-4 space-y-2">
      <div class="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
        <span class="text-xs font-bold text-gray-500 flex-shrink-0">🛠️ 필요 공구:</span>
        ${guide.tools.map(t => `<span class="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg whitespace-nowrap">${t}</span>`).join('')}
      </div>
      <div class="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
        <span class="text-xs font-bold text-red-500 flex-shrink-0">⚠️ 안전 수칙:</span>
        ${guide.safety.map(s => `<span class="text-xs px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-lg whitespace-nowrap border border-red-100 dark:border-red-900/50">${s}</span>`).join('')}
      </div>
    </div>

    <!-- 스텝별 체크리스트 목록 -->
    <div class="space-y-2.5">
      ${guide.steps.map((st) => {
        const checkKey = `${round}_${cat}_step_${st.step}`;
        const isChecked = !!state.assemblyChecks[checkKey];
        const isInspect = st.type === 'inspect_point';

        if (isInspect) {
          return `
            <div class="p-3.5 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 border-2 border-dashed border-red-500/40 rounded-2xl flex items-start space-x-3 transition-all duration-200 ${isChecked ? 'opacity-70 bg-gray-100 dark:bg-slate-800' : ''}">
              <input type="checkbox" id="${checkKey}" data-key="${checkKey}" ${isChecked ? 'checked' : ''} class="assembly-step-checkbox mt-1 w-5 h-5 text-red-600 rounded-md focus:ring-red-400">
              <label for="${checkKey}" class="cursor-pointer text-xs sm:text-sm font-bold text-red-700 dark:text-red-300 leading-snug">
                ${st.desc}
              </label>
            </div>
          `;
        }

        return `
          <div class="p-3 rounded-2xl border transition-all duration-200 flex items-start space-x-3 ${
            isChecked 
              ? 'bg-blue-50/50 dark:bg-slate-700/30 border-blue-200 dark:border-slate-600 opacity-60 line-through text-gray-400' 
              : 'bg-white dark:bg-slate-700/50 border-gray-100 dark:border-slate-700 text-gray-800 dark:text-gray-200 hover:border-blue-300'
          }">
            <input type="checkbox" id="${checkKey}" data-key="${checkKey}" ${isChecked ? 'checked' : ''} class="assembly-step-checkbox mt-0.5 w-5 h-5 text-blue-600 rounded-md focus:ring-blue-400">
            <label for="${checkKey}" class="cursor-pointer text-xs sm:text-sm font-medium leading-snug flex-1">
              <span class="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold mr-1.5 ${
                st.type === 'disassembly' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
              }">${st.type === 'disassembly' ? '분해' : '조립'} ${st.step}</span>
              ${st.desc}
            </label>
          </div>
        `;
      }).join('')}
    </div>

    <!-- 핵심 합격 팁 박스 -->
    ${guide.tips ? `
      <div class="mt-4 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-2xl flex items-start space-x-2.5">
        <span class="text-amber-500 text-base">💡</span>
        <div class="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong class="font-bold">감독관 감점 방지 팁:</strong> ${guide.tips}
        </div>
      </div>
    ` : ''}
  `;
}

// 실기 기록표 훈련장 HTML 렌더링
function renderRecordSheetTrainer(item, round) {
  const answerKey = `${round}_${item.id}`;
  const saved = state.userAnswers[answerKey] || {
    standard: '',
    measured: '',
    hujeok: '무',
    judgment: '',
    action: '',
    completed: false
  };

  // 대표 시나리오 예시
  const sampleCase = item.cases[0] || {};

  return `
    <!-- 실제 Q-Net 서식 모바일 카드 -->
    <div class="border-2 border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden mb-5">
      <!-- 서식 타이틀 헤더 -->
      <div class="bg-gray-100 dark:bg-slate-700 px-4 py-3 border-b border-gray-200 dark:border-slate-600 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span class="text-xs font-bold text-gray-700 dark:text-gray-200">측정 항목: ${item.title}</span>
        </div>
        <span class="text-[11px] font-mono px-2 py-0.5 bg-white dark:bg-slate-800 rounded text-gray-500">단위: ${item.unit}</span>
      </div>

      <div class="p-4 space-y-4">
        <!-- 1. 규정값 입력 / 선택 -->
        <div>
          <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
            <span>① 규정(정비 한계)값</span>
            <span class="text-[11px] font-normal text-blue-600 dark:text-blue-400">💡 시험장 제시값 숙지</span>
          </label>
          <input type="text" id="input_standard" value="${saved.standard || ''}" placeholder="예: ${item.standardVal}" 
            class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium">
          
          <!-- 원터치 규정값 추천 칩 -->
          <div class="flex items-center flex-wrap gap-1.5 mt-2">
            <span class="text-[11px] text-gray-400">추천값:</span>
            <button type="button" class="preset-chip text-xs px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg hover:bg-blue-100 border border-blue-200 dark:border-blue-800" data-target="input_standard" data-val="${item.standardVal}">
              ${item.standardVal}
            </button>
          </div>
        </div>

        <!-- 2. 측정값 입력 / 선택 -->
        <div>
          <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
            <span>② 측정(점검)값</span>
            <span class="text-[11px] font-normal text-gray-500">단위 포함 필수</span>
          </label>
          <input type="text" id="input_measured" value="${saved.measured || ''}" placeholder="예: ${sampleCase.measured || '측정값을 단위와 함께 입력'}" 
            class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium">
          
          <!-- 원터치 측정값 추천 칩 (모의 연습용) -->
          <div class="flex items-center flex-wrap gap-1.5 mt-2">
            <span class="text-[11px] text-gray-400">샘플 시나리오:</span>
            ${item.cases.map((c, i) => `
              <button type="button" class="preset-chip text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300 rounded-lg hover:bg-gray-200" data-target="input_measured" data-val="${c.measured}">
                사례 ${i+1} (${c.measured})
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 후적 유무 (노즐 전용) -->
        ${item.hasHujeok ? `
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">후적 유무 판정</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="flex items-center justify-center space-x-2 p-2.5 rounded-xl border border-gray-200 dark:border-slate-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
                <input type="radio" name="input_hujeok" value="유" ${saved.hujeok === '유' ? 'checked' : ''} class="w-4 h-4 text-red-600">
                <span class="text-xs font-bold text-red-600">후적 있음 (유)</span>
              </label>
              <label class="flex items-center justify-center space-x-2 p-2.5 rounded-xl border border-gray-200 dark:border-slate-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
                <input type="radio" name="input_hujeok" value="무" ${saved.hujeok !== '유' ? 'checked' : ''} class="w-4 h-4 text-green-600">
                <span class="text-xs font-bold text-green-600">후적 없음 (무)</span>
              </label>
            </div>
          </div>
        ` : ''}

        <!-- 3. 판정 (양호 / 불량) -->
        <div>
          <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">③ 판정 (양호 / 불량)</label>
          <div class="grid grid-cols-2 gap-3">
            <button type="button" id="btn_judge_good" class="judge-btn py-3 rounded-xl border text-center transition-all ${
              saved.judgment === '양호' ? 'bg-green-600 text-white font-bold border-green-600 shadow-md' : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600'
            }">
              <span class="text-base">🟢</span> <span class="text-xs sm:text-sm font-bold ml-1">양 호</span>
            </button>
            <button type="button" id="btn_judge_bad" class="judge-btn py-3 rounded-xl border text-center transition-all ${
              saved.judgment === '불량' ? 'bg-red-600 text-white font-bold border-red-600 shadow-md' : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600'
            }">
              <span class="text-base">🔴</span> <span class="text-xs sm:text-sm font-bold ml-1">불 량</span>
            </button>
          </div>
        </div>

        <!-- 4. 정비 및 조치할 사항 -->
        <div>
          <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
            <span>④ 정비 및 조치할 사항</span>
            <span class="text-[11px] font-normal text-amber-600 dark:text-amber-400">🚨 반드시 '○○ 후 재점검' 형식 준수</span>
          </label>
          <textarea id="input_action" rows="2" placeholder="예: 불량 시 '○○ 교환 후 재점검', 양호 시 '정비 및 조치할 사항 없음'"
            class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium leading-relaxed">${saved.action || ''}</textarea>

          <!-- 모바일 친화형 원클릭 조치사항 선택 칩 -->
          <div class="mt-2 space-y-1.5">
            <span class="text-[11px] text-gray-500 dark:text-gray-400 font-semibold block">📱 탭하여 조치사항 문장 자동 입력:</span>
            <div class="flex flex-col gap-1.5">
              ${(item.actionOptions || []).map(opt => `
                <button type="button" class="action-chip text-left text-xs px-3 py-2 bg-slate-50 dark:bg-slate-700/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-slate-600 transition-colors flex items-center justify-between" data-val="${opt}">
                  <span>${opt}</span>
                  <span class="text-blue-500 text-xs ml-2 font-bold">선택</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 저장 및 답안 채점 버튼 -->
        <div class="pt-2 flex items-center space-x-2">
          <button type="button" id="saveAnswerBtn" class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>답안 저장 및 완료</span>
          </button>
          <button type="button" id="clearAnswerBtn" class="px-4 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-xs transition-colors">
            지우기
          </button>
        </div>
      </div>
    </div>

    <!-- 모범 답안 모달/접이식 영역 (클릭 시 토글) -->
    <div id="modelAnswerAccordion" class="hidden p-4 bg-blue-50/70 dark:bg-slate-900/60 border border-blue-200 dark:border-blue-900/40 rounded-2xl space-y-3">
      <div class="flex items-center justify-between border-b border-blue-200 dark:border-blue-800/60 pb-2">
        <h4 class="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center space-x-1.5">
          <span>📖</span> <span>${item.title} 합격 모범 답안 분석</span>
        </h4>
        <span class="text-[11px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold">감점 제로 족보</span>
      </div>

      <div class="space-y-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200">
        ${item.cases.map((c, idx) => `
          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-blue-100 dark:border-slate-700">
            <div class="font-bold text-blue-700 dark:text-blue-400 mb-1.5 flex items-center space-x-1">
              <span>CASE ${idx + 1}:</span>
              <span>${c.scenario}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-2 font-mono text-[11px]">
              <div class="bg-gray-50 dark:bg-slate-700 p-1.5 rounded">규정값: <strong>${c.standard || item.standardVal}</strong></div>
              <div class="bg-gray-50 dark:bg-slate-700 p-1.5 rounded">측정값: <strong>${c.measured || '정상 범위'}</strong></div>
            </div>
            <div class="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/30 text-amber-900 dark:text-amber-200 mb-1.5">
              <strong>모범 조치사항:</strong> "${c.action}"
            </div>
            ${c.tip ? `<p class="text-[11px] text-gray-500 dark:text-gray-400">💡 <strong>해설:</strong> ${c.tip}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 이벤트 바인딩
function attachContentEvents(round, recordItem, guide) {
  const cat = state.currentCategory;
  const answerKey = `${round}_${recordItem.id}`;

  // 탈부착 체크박스 이벤트
  document.querySelectorAll('.assembly-step-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const key = e.target.dataset.key;
      state.assemblyChecks[key] = e.target.checked;
      saveStorage();
      renderContent(); // 라인쓰루 스타일 반영
    });
  });

  // 체크리스트 리셋
  const resetBtn = document.getElementById('resetChecklistBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('현재 파트의 체크리스트를 모두 초기화하시겠습니까?')) {
        const prefix = `${round}_${cat}_`;
        Object.keys(state.assemblyChecks).forEach(k => {
          if (k.startsWith(prefix)) delete state.assemblyChecks[k];
        });
        saveStorage();
        renderContent();
      }
    });
  }

  // 모범답안 토글
  const modelBtn = document.getElementById('showModelAnswerBtn');
  const accordion = document.getElementById('modelAnswerAccordion');
  if (modelBtn && accordion) {
    modelBtn.addEventListener('click', () => {
      accordion.classList.toggle('hidden');
      if (!accordion.classList.contains('hidden')) {
        accordion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 규정값 / 측정값 추천 칩 클릭
  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const targetId = chip.dataset.target;
      const val = chip.dataset.val;
      const input = document.getElementById(targetId);
      if (input) {
        input.value = val;
        triggerAutoJudge();
      }
    });
  });

  // 조치사항 문장 추천 칩 클릭
  document.querySelectorAll('.action-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.dataset.val;
      const input = document.getElementById('input_action');
      if (input) {
        input.value = val;
        // 조치사항 선택 시 양호/불량 판정 자동 연동
        if (val.includes('없음')) {
          setJudgment('양호');
        } else {
          setJudgment('불량');
        }
      }
    });
  });

  // 양호/불량 버튼 클릭
  const btnGood = document.getElementById('btn_judge_good');
  const btnBad = document.getElementById('btn_judge_bad');
  if (btnGood) btnGood.addEventListener('click', () => setJudgment('양호'));
  if (btnBad) btnBad.addEventListener('click', () => setJudgment('불량'));

  function setJudgment(judge) {
    if (!state.userAnswers[answerKey]) state.userAnswers[answerKey] = {};
    state.userAnswers[answerKey].judgment = judge;

    if (btnGood && btnBad) {
      if (judge === '양호') {
        btnGood.className = 'judge-btn py-3 rounded-xl border text-center transition-all bg-green-600 text-white font-bold border-green-600 shadow-md';
        btnBad.className = 'judge-btn py-3 rounded-xl border text-center transition-all bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600';
        // 양호 시 조치사항 자동 세팅
        const actionInput = document.getElementById('input_action');
        if (actionInput && !actionInput.value.trim()) {
          actionInput.value = '정비 및 조치할 사항 없음';
        }
      } else {
        btnBad.className = 'judge-btn py-3 rounded-xl border text-center transition-all bg-red-600 text-white font-bold border-red-600 shadow-md';
        btnGood.className = 'judge-btn py-3 rounded-xl border text-center transition-all bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600';
      }
    }
  }

  // 답안 저장
  const saveBtn = document.getElementById('saveAnswerBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const std = document.getElementById('input_standard')?.value.trim() || '';
      const meas = document.getElementById('input_measured')?.value.trim() || '';
      const act = document.getElementById('input_action')?.value.trim() || '';
      const hujeok = document.querySelector('input[name="input_hujeok"]:checked')?.value || '무';
      const judge = state.userAnswers[answerKey]?.judgment || '';

      if (!std || !meas || !judge || !act) {
        alert('규정값, 측정값, 양호/불량 판정, 조치사항을 모두 입력해주세요!');
        return;
      }

      state.userAnswers[answerKey] = {
        standard: std,
        measured: meas,
        hujeok: hujeok,
        judgment: judge,
        action: act,
        completed: true
      };

      saveStorage();
      alert('🎉 답안이 안전하게 저장되었습니다!');
      renderRoundNav();
    });
  }

  // 답안 지우기
  const clearBtn = document.getElementById('clearAnswerBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('작성 중인 답안을 지우시겠습니까?')) {
        delete state.userAnswers[answerKey];
        saveStorage();
        renderContent();
      }
    });
  }
}

// 자동 판정 보조
function triggerAutoJudge() {
  // 사용자가 값 입력 시 자동 피드백 (필요 시 확장)
}

// 검사 규정값 탭 렌더링 (PDF Page 3)
function renderInspectionStandards(container) {
  container.innerHTML = `
    <div class="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-5 mb-6 shadow-xl">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-xl font-bold flex items-center space-x-2">
          <span>📜</span> <span>검사 규정값 및 계산 공식 족보</span>
        </h2>
        <span class="text-xs px-2.5 py-1 bg-white/10 rounded-full font-mono">100% 필수 암기</span>
      </div>
      <p class="text-xs text-indigo-200 leading-relaxed">
        시험장에서 규정값이 작업대에 붙어있지 않고 <strong>수험생이 반드시 외워서 기재해야 하는 법정 규정값 및 산출식</strong>입니다.
      </p>
    </div>

    <!-- 1. 제동력 계산기 & 공식 -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 mb-6 shadow-md border border-gray-100 dark:border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-gray-900 dark:text-white text-base flex items-center space-x-2">
          <span>🚗</span> <span>전·후 제동력 측정 공식 & 인터랙티브 계산기</span>
        </h3>
        <span class="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">섀시 검사</span>
      </div>

      <div class="p-3.5 bg-gray-50 dark:bg-slate-700/50 rounded-2xl mb-4 text-xs space-y-1.5 leading-relaxed text-gray-700 dark:text-gray-300">
        <div>• <strong>제동력 총합:</strong> 차량 총중량의 <strong>50% 이상</strong>이어야 양호</div>
        <div>• <strong>전축(앞축) 제동력:</strong> 전축 중량의 <strong>50% 이상</strong>이어야 양호</div>
        <div>• <strong>후축(뒤축) 제동력:</strong> 후축 중량의 <strong>20% 이상</strong>이어야 양호</div>
        <div>• <strong>좌·우 제동력 편차:</strong> 해당 축중의 <strong>8% 이하</strong>이어야 양호</div>
        <div class="text-red-500 font-bold">• 산출근거 작성 시 '%' 기호는 무조건 생략하여 작성합니다!</div>
      </div>

      <!-- 제동력 실시간 계산 시뮬레이터 -->
      <div class="bg-blue-50/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-blue-100 dark:border-slate-700">
        <h4 class="text-xs font-bold text-blue-900 dark:text-blue-300 mb-3">🧮 제동력 실시간 산출근거 자동 생성기</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div>
            <label class="text-[11px] font-bold text-gray-500 block mb-1">축중 (kg)</label>
            <input type="number" id="calc_axle_weight" value="500" class="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border rounded-xl">
          </div>
          <div>
            <label class="text-[11px] font-bold text-gray-500 block mb-1">좌측 제동력 (kg)</label>
            <input type="number" id="calc_left_force" value="270" class="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border rounded-xl">
          </div>
          <div>
            <label class="text-[11px] font-bold text-gray-500 block mb-1">우측 제동력 (kg)</label>
            <input type="number" id="calc_right_force" value="190" class="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border rounded-xl">
          </div>
        </div>
        <button type="button" id="calcBrakeBtn" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors">
          계산 실행 및 산출근거 생성
        </button>
        <div id="brakeCalcResult" class="mt-3 p-3 bg-white dark:bg-slate-800 rounded-xl text-xs space-y-1.5 font-mono">
          <!-- 계산 결과 렌더링 -->
        </div>
      </div>
    </div>

    <!-- 2. 매연 (광투과식 %) 규정값 표 -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 mb-6 shadow-md border border-gray-100 dark:border-slate-700">
      <h3 class="font-bold text-gray-900 dark:text-white text-base mb-3 flex items-center space-x-2">
        <span>💨</span> <span>디젤 매연 (광투과식 %) 연식별 법정 기준</span>
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left text-gray-700 dark:text-gray-300">
          <thead class="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-200">
            <tr>
              <th class="p-2.5 rounded-l-xl">차량 제작 연식</th>
              <th class="p-2.5 rounded-r-xl">광투과식 규정값</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
            <tr><td class="p-2.5 font-medium">1995년 12월 31일 이전</td><td class="p-2.5 font-bold text-red-600">60% 이하</td></tr>
            <tr><td class="p-2.5 font-medium">1996.01.01 ~ 2000.12.31</td><td class="p-2.5 font-bold text-red-600">55% 이하</td></tr>
            <tr><td class="p-2.5 font-medium">2001.01.01 ~ 2003.12.31</td><td class="p-2.5 font-bold text-amber-600">45% 이하</td></tr>
            <tr><td class="p-2.5 font-medium">2004.01.01 ~ 2007.12.31</td><td class="p-2.5 font-bold text-amber-600">40% 이하</td></tr>
            <tr><td class="p-2.5 font-medium">2008.01.01 ~ 2016.08.31</td><td class="p-2.5 font-bold text-blue-600">20% 이하</td></tr>
            <tr><td class="p-2.5 font-medium">2016년 9월 1일 이후</td><td class="p-2.5 font-bold text-green-600">10% 이하</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-[11px] text-gray-500 mt-2">📌 3회 측정 평균값에서 소수점 이하는 버림(절사) 표기, 산출근거는 소수점 둘째 자리까지 표기.</p>
    </div>

    <!-- 3. 가솔린 배기가스 (CO, HC) 기준표 -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 mb-6 shadow-md border border-gray-100 dark:border-slate-700">
      <h3 class="font-bold text-gray-900 dark:text-white text-base mb-3 flex items-center space-x-2">
        <span>🏭</span> <span>가솔린 배기가스 (CO, HC) 기준</span>
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left text-gray-700 dark:text-gray-300">
          <thead class="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-200">
            <tr>
              <th class="p-2.5 rounded-l-xl">차량 연식 / 구분</th>
              <th class="p-2.5">CO (일산화탄소)</th>
              <th class="p-2.5 rounded-r-xl">HC (탄화수소)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
            <tr><td class="p-2.5">1987년 12월 31일 이전</td><td class="p-2.5 font-bold">4.5% 이하</td><td class="p-2.5 font-bold">1200 ppm 이하</td></tr>
            <tr><td class="p-2.5">1988.01.01 ~ 2000.12.31</td><td class="p-2.5 font-bold">1.2% 이하</td><td class="p-2.5 font-bold">220 ppm (LPG 400ppm) 이하</td></tr>
            <tr><td class="p-2.5">2001.01.01 ~ 2005.12.31</td><td class="p-2.5 font-bold">1.2% 이하</td><td class="p-2.5 font-bold">220 ppm 이하</td></tr>
            <tr><td class="p-2.5">2006년 1월 1일 이후</td><td class="p-2.5 font-bold text-blue-600">1.0% 이하</td><td class="p-2.5 font-bold text-blue-600">120 ppm 이하</td></tr>
            <tr><td class="p-2.5">경형 승용 (2004년 이후)</td><td class="p-2.5 font-bold">1.0% 이하</td><td class="p-2.5 font-bold">150 ppm 이하</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 4. 기타 검사 기준 한눈에 보기 카드 그리드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-1 flex items-center space-x-1.5">
          <span>📐</span> <span>최소 회전반경</span>
        </h4>
        <div class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <div>• <strong>규정값:</strong> 12m 이하</div>
          <div>• <strong>공식:</strong> R = (L / sin α) + r</div>
          <div class="text-[11px] text-gray-500">L: 축거(m), α: 바깥쪽 바퀴 조향각, r: 킹핀 오프셋</div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-1 flex items-center space-x-1.5">
          <span>↔️</span> <span>사이드 슬립 (Side Slip)</span>
        </h4>
        <div class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <div>• <strong>규정값:</strong> In 또는 Out으로 5m/km 이하</div>
          <div>• <strong>조치:</strong> 타이로드로 토우를 규정값 내로 조정 후 재점검</div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-1 flex items-center space-x-1.5">
          <span>💡</span> <span>전조등 광도</span>
        </h4>
        <div class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <div>• <strong>규정값:</strong> 4등식 3,000cd 이상 (2등식 15,000cd)</div>
          <div>• <strong>조치:</strong> 전조등 교환(광축 조정) 후 재점검</div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-1 flex items-center space-x-1.5">
          <span>📢</span> <span>경음기 음량 (Horn)</span>
        </h4>
        <div class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <div>• <strong>2000년 이전:</strong> 90dB 이상 115dB 이하</div>
          <div>• <strong>2000년 이후:</strong> 90dB 이상 110dB 이하</div>
          <div>• <strong>06년 이후 대형:</strong> 90dB 이상 112dB 이하</div>
        </div>
      </div>
    </div>
  `;

  // 제동력 계산기 이벤트 연결
  const calcBtn = document.getElementById('calcBrakeBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', runBrakeCalculation);
    runBrakeCalculation(); // 기본 실행
  }
}

// 제동력 계산 로직
function runBrakeCalculation() {
  const axle = parseFloat(document.getElementById('calc_axle_weight')?.value || 500);
  const left = parseFloat(document.getElementById('calc_left_force')?.value || 270);
  const right = parseFloat(document.getElementById('calc_right_force')?.value || 190);
  const resultArea = document.getElementById('brakeCalcResult');
  if (!resultArea) return;

  const diff = Math.abs(left - right);
  const diffPercent = ((diff / axle) * 100).toFixed(1);
  const sum = left + right;
  const sumPercent = ((sum / axle) * 100).toFixed(1);

  const isDiffGood = parseFloat(diffPercent) <= 8.0;
  const isSumGood = parseFloat(sumPercent) >= 50.0;
  const isOverallGood = isDiffGood && isSumGood;

  resultArea.innerHTML = `
    <div class="text-blue-700 dark:text-blue-300 font-bold mb-1">【제동력 산출근거 및 판정 결과】</div>
    <div>• <strong>편차 산출근거:</strong> (${left} - ${right}) / ${axle} × 100 = <strong>${diffPercent}</strong> (규정: 8% 이하 ➔ ${isDiffGood ? '<span class="text-green-600 font-bold">양호</span>' : '<span class="text-red-600 font-bold">불량</span>'})</div>
    <div>• <strong>합계 산출근거:</strong> (${left} + ${right}) / ${axle} × 100 = <strong>${sumPercent}</strong> (규정: 50% 이상 ➔ ${isSumGood ? '<span class="text-green-600 font-bold">양호</span>' : '<span class="text-red-600 font-bold">불량</span>'})</div>
    <div class="pt-1.5 border-t border-gray-200 dark:border-slate-700 font-bold ${isOverallGood ? 'text-green-600' : 'text-red-600'}">
      최종 판정: ${isOverallGood ? '양호 (정비 및 조치할 사항 없음)' : '불량 (브레이크 패드 및 캘리퍼 교환 후 재점검)'}
    </div>
  `;
}

// 화면 켜짐 유지 토글 (Wake Lock API)
async function toggleWakeLock() {
  const btn = document.getElementById('wakeLockToggle');
  const statusSpan = document.getElementById('wakeLockStatus');

  if ('wakeLock' in navigator) {
    if (!state.wakeLockActive) {
      try {
        state.wakeLock = await navigator.wakeLock.request('screen');
        state.wakeLockActive = true;
        if (btn) btn.classList.add('bg-amber-500', 'text-white', 'border-amber-400');
        if (statusSpan) statusSpan.textContent = '켜짐 유지 중';
        alert('💡 실습 중 화면이 꺼지지 않도록 켜짐 유지가 활성화되었습니다!');
        state.wakeLock.addEventListener('release', () => {
          state.wakeLockActive = false;
          if (btn) btn.classList.remove('bg-amber-500', 'text-white', 'border-amber-400');
          if (statusSpan) statusSpan.textContent = '화면 꺼짐 방지';
        });
      } catch (err) {
        console.error(err);
        alert('화면 켜짐 유지를 활성화할 수 없습니다.');
      }
    } else {
      if (state.wakeLock) {
        await state.wakeLock.release();
        state.wakeLock = null;
      }
      state.wakeLockActive = false;
      if (btn) btn.classList.remove('bg-amber-500', 'text-white', 'border-amber-400');
      if (statusSpan) statusSpan.textContent = '화면 꺼짐 방지';
    }
  } else {
    alert('현재 브라우저에서는 화면 꺼짐 유지 기능(Wake Lock)을 지원하지 않습니다.');
  }
}

function setupWakeLock() {
  document.addEventListener('visibilitychange', async () => {
    if (state.wakeLock !== null && document.visibilityState === 'visible') {
      state.wakeLock = await navigator.wakeLock.request('screen');
    }
  });
}

// 실전 랜덤 모의고사
function startRandomMockExam() {
  const randomRound = Math.floor(Math.random() * 15) + 1;
  state.currentRound = randomRound;
  state.examMode = 'mock';
  selectRound(randomRound);
  alert(`🎲 당일 시험 대비 모의고사!\n\n오늘의 출제 문제는 [제 ${randomRound} 안] 입니다!\n지금부터 제한시간 내에 탈부착 및 기록표를 완료해보세요.`);
}

// 족보 모달
function openFormulaModal() {
  switchCategory('inspection');
}

// 안 선택 모바일 모달
function openRoundSelectorModal() {
  const modal = document.getElementById('roundSelectorModal');
  if (modal) modal.classList.remove('hidden');
}

window.closeRoundSelectorModal = function() {
  const modal = document.getElementById('roundSelectorModal');
  if (modal) modal.classList.add('hidden');
};

window.selectRoundFromModal = function(r) {
  selectRound(r);
  closeRoundSelectorModal();
};
