// js/app.js
// AutoMechanic AI 종합 애플리케이션 컨트롤러

import { WARNING_LIGHTS } from "./data/warningLights.js";
import { SYMPTOM_CATEGORIES, DRIVING_CONDITIONS, DIAGNOSIS_RULES } from "./data/symptomRules.js";
import { POWERTRAINS, MAINTENANCE_ITEMS } from "./data/maintenanceData.js";
import { CONSUMER_SHIELD_TIPS, REPAIR_PRICE_GUIDES } from "./data/costGuideData.js";
import { carAudio } from "./audioSimulator.js";
import { StorageManager } from "./storage.js";

// ================= APP STATE =================
const state = {
  currentTab: "diagnose",
  selectedCategories: new Set(),
  selectedConditions: new Set(),
  selectedPowertrain: "gasoline",
  currentMileage: 45000,
  carProfile: StorageManager.getCarProfile(),
  warningSearchQuery: "",
  warningFilterColor: "all",
  activeSound: null,
  chatMessages: []
};

// ================= DOM ELEMENTS =================
const elements = {
  // Nav
  navTabs: document.querySelectorAll(".nav-tab"),
  tabContents: document.querySelectorAll(".tab-content"),
  headerCarName: document.getElementById("header-car-name"),
  quickCarBtn: document.getElementById("quick-car-btn"),
  themeToggleBtn: document.getElementById("theme-toggle-btn"),
  brandLogoBtn: document.getElementById("brand-logo-btn"),

  // Tab: Diagnose
  categoryGrid: document.getElementById("category-selector-grid"),
  conditionChips: document.getElementById("condition-chips-container"),
  symptomInput: document.getElementById("symptom-input"),
  runDiagnosisBtn: document.getElementById("run-diagnosis-btn"),
  diagnosisResults: document.getElementById("diagnosis-results-section"),
  soundButtons: document.querySelectorAll(".sound-play-btn"),
  soundStopBtn: document.getElementById("sound-stop-btn"),

  // Tab: Warning Lights
  warningSearchInput: document.getElementById("warning-search-input"),
  wlFilterBtns: document.querySelectorAll(".wl-filter-btn"),
  warningLightsGrid: document.getElementById("warning-lights-grid"),
  wlModal: document.getElementById("wl-detail-modal"),
  closeWlModalBtn: document.getElementById("close-wl-modal-btn"),
  confirmWlModalBtn: document.getElementById("confirm-wl-modal-btn"),

  // Tab: Maintenance
  powertrainBtns: document.querySelectorAll(".powertrain-btn"),
  maintMileageRange: document.getElementById("maint-mileage-range"),
  maintMileageVal: document.getElementById("maint-mileage-val"),
  maintenanceGrid: document.getElementById("maintenance-items-grid"),

  // Tab: Cost Guide
  consumerShieldGrid: document.getElementById("consumer-shield-grid"),
  repairCostTablesContainer: document.getElementById("repair-cost-tables-container"),

  // Tab: AI Chat
  chatMessagesContainer: document.getElementById("chat-messages-container"),
  chatPromptChips: document.querySelectorAll(".chat-chip"),
  chatInputForm: document.getElementById("chat-input-form"),
  chatInput: document.getElementById("chat-input"),
  clearChatBtn: document.getElementById("clear-chat-btn"),

  // Tab: Garage
  garageCarInfoGrid: document.getElementById("garage-car-info-grid"),
  garageEditCarBtn: document.getElementById("garage-edit-car-btn"),
  diagnosisHistoryList: document.getElementById("diagnosis-history-list"),
  exportDataBtn: document.getElementById("export-data-btn"),

  // Car Edit Modal
  carEditModal: document.getElementById("car-edit-modal"),
  carEditForm: document.getElementById("car-edit-form"),
  closeCarModalBtn: document.getElementById("close-car-modal-btn"),
  cancelCarModalBtn: document.getElementById("cancel-car-modal-btn"),
  modalCarModel: document.getElementById("modal-car-model"),
  modalCarYear: document.getElementById("modal-car-year"),
  modalCarPowertrain: document.getElementById("modal-car-powertrain"),
  modalCarMileage: document.getElementById("modal-car-mileage"),

  // Print
  printArea: document.getElementById("print-area")
};

// ================= INITIALIZATION =================
function initApp() {
  applyTheme(StorageManager.getTheme());
  updateVehicleDisplay();
  renderTriageSelectors();
  renderWarningLights();
  renderMaintenanceCalculator();
  renderCostGuide();
  renderGarage();
  setupEventListeners();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ================= THEME TOGGLE =================
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }
  StorageManager.setTheme(theme);
}

// ================= VEHICLE PROFILE =================
function updateVehicleDisplay() {
  const p = state.carProfile;
  elements.headerCarName.textContent = `${p.model} (${p.mileage.toLocaleString()}km)`;
  state.selectedPowertrain = p.powertrain || "gasoline";
  state.currentMileage = p.mileage || 45000;
  
  if (elements.maintMileageRange) {
    elements.maintMileageRange.value = state.currentMileage;
    elements.maintMileageVal.textContent = `${state.currentMileage.toLocaleString()} km`;
  }
}

// ================= TAB NAVIGATION =================
function switchTab(tabId) {
  state.currentTab = tabId;
  elements.navTabs.forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add("tab-active");
    } else {
      btn.classList.remove("tab-active");
    }
  });

  elements.tabContents.forEach(content => {
    if (content.id === `tab-${tabId}`) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  // Re-run icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Stop any playing sound when switching away
  if (carAudio.isPlaying) {
    carAudio.stop();
    resetSoundButtons();
  }
}

// ================= TAB 1: DIAGNOSIS LOGIC =================
function renderTriageSelectors() {
  // Categories
  elements.categoryGrid.innerHTML = SYMPTOM_CATEGORIES.map(cat => `
    <button type="button" class="category-btn p-3 rounded-xl border border-slate-700 bg-carbon-800/80 hover:bg-slate-700/80 text-left transition flex items-center gap-3" data-cat-id="${cat.id}">
      <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
        <i data-lucide="${cat.icon.toLowerCase()}" class="w-4 h-4"></i>
      </div>
      <div>
        <div class="text-xs font-bold text-slate-200">${cat.name}</div>
        <div class="text-[10px] text-slate-400 truncate max-w-[120px]">${cat.desc}</div>
      </div>
    </button>
  `).join("");

  // Driving Conditions
  elements.conditionChips.innerHTML = DRIVING_CONDITIONS.map(cond => `
    <button type="button" class="condition-chip px-3 py-1.5 rounded-lg border border-slate-700 bg-carbon-800 text-xs font-medium text-slate-300 hover:bg-slate-700 transition" data-cond-id="${cond.id}">
      ${cond.name}
    </button>
  `).join("");
}

function handleCategoryToggle(btn, catId) {
  if (state.selectedCategories.has(catId)) {
    state.selectedCategories.delete(catId);
    btn.classList.remove("ring-2", "ring-cyan-500", "bg-cyan-950/40");
  } else {
    state.selectedCategories.add(catId);
    btn.classList.add("ring-2", "ring-cyan-500", "bg-cyan-950/40");
  }
}

function handleConditionToggle(btn, condId) {
  if (state.selectedConditions.has(condId)) {
    state.selectedConditions.delete(condId);
    btn.classList.remove("bg-cyan-600", "text-white", "border-cyan-500");
    btn.classList.add("bg-carbon-800", "text-slate-300");
  } else {
    state.selectedConditions.add(condId);
    btn.classList.add("bg-cyan-600", "text-white", "border-cyan-500");
    btn.classList.remove("bg-carbon-800", "text-slate-300");
  }
}

function runDiagnosis() {
  const query = elements.symptomInput.value.trim().toLowerCase();
  const selectedCats = Array.from(state.selectedCategories);
  const selectedConds = Array.from(state.selectedConditions);

  if (selectedCats.length === 0 && selectedConds.length === 0 && query.length < 2) {
    alert("이상 징후 카테고리를 선택하거나 증상을 한 문장 이상 입력해 주세요.");
    return;
  }

  // 룰 엔진 평가 & 점수 계산
  const scoredRules = DIAGNOSIS_RULES.map(rule => {
    let score = 0;

    // 카테고리 매칭
    if (selectedCats.includes(rule.category)) {
      score += 40;
    }

    // 조건 매칭
    const condMatch = rule.conditions.filter(c => selectedConds.includes(c));
    score += condMatch.length * 25;

    // 키워드 매칭
    if (query) {
      rule.keywords.forEach(kw => {
        if (query.includes(kw.toLowerCase())) {
          score += 35;
        }
      });
      if (rule.title.toLowerCase().includes(query)) {
        score += 50;
      }
    }

    return { rule, score };
  });

  // 점수 높은 순 정렬
  scoredRules.sort((a, b) => b.score - a.score);

  const matched = scoredRules.filter(item => item.score > 20);
  const topResult = matched.length > 0 ? matched[0].rule : DIAGNOSIS_RULES[0];
  const secondResult = matched.length > 1 ? matched[1].rule : null;

  renderDiagnosisResult(topResult, secondResult, query);

  // 저장
  const record = {
    title: topResult.title,
    carModel: state.carProfile.model,
    dangerLevel: topResult.dangerLevel,
    primaryPart: topResult.primarySuspect.part,
    estimatedCost: topResult.costs.domestic,
    querySummary: query || `${Array.from(state.selectedCategories).join(", ")} 증상`
  };
  StorageManager.saveDiagnosisRecord(record);
  renderGarage();
}

function renderDiagnosisResult(primaryRule, secondaryRule, query) {
  const car = state.carProfile;
  const isDanger = primaryRule.dangerLevel === "danger";
  const badgeColor = isDanger 
    ? "bg-red-500/20 text-red-400 border-red-500/50 glow-danger" 
    : "bg-amber-500/20 text-amber-400 border-amber-500/50";

  const briefingText = primaryRule.briefingCard
    .replace("[차종]", car.model)
    .replace("[주행거리]", car.mileage.toLocaleString());

  elements.diagnosisResults.classList.remove("hidden");
  elements.diagnosisResults.innerHTML = `
    <!-- MAIN DIAGNOSIS CARD -->
    <div class="glass-panel rounded-2xl p-6 border ${isDanger ? 'border-red-900/60' : 'border-amber-900/60'} space-y-6">
      
      <!-- Header: Title & Danger Level -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${badgeColor}">
            <i data-lucide="${isDanger ? 'alert-octagon' : 'alert-triangle'}" class="w-3.5 h-3.5"></i>
            ${primaryRule.dangerLabel}
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white">
            ${primaryRule.title}
          </h3>
          <p class="text-xs text-slate-400 mt-1">
            진단 대상: <span class="text-cyan-400 font-semibold">${car.model}</span> · 현재 주행거리 <span class="text-slate-200">${car.mileage.toLocaleString()} km</span>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button id="copy-briefing-btn" class="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            정비사 전달용 복사
          </button>
          <button id="print-report-btn" class="px-3.5 py-2 rounded-xl bg-carbon-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            리포트 인쇄
          </button>
        </div>
      </div>

      <!-- Suspect Parts Analysis -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- 1순위 의심 부품 -->
        <div class="p-4 rounded-xl bg-carbon-900/90 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <i data-lucide="crosshair" class="w-4 h-4"></i>
              유력 원인 1순위 (확률 ${primaryRule.primarySuspect.probability}%)
            </span>
            <span class="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">주원인</span>
          </div>
          <h4 class="text-base font-bold text-white">${primaryRule.primarySuspect.part}</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${primaryRule.primarySuspect.mechanism}</p>
        </div>

        <!-- 2순위 의심 부품 -->
        <div class="p-4 rounded-xl bg-carbon-900/90 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <i data-lucide="git-branch" class="w-4 h-4"></i>
              연관 원인 2순위 (확률 ${primaryRule.secondarySuspect.probability}%)
            </span>
            <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">참고</span>
          </div>
          <h4 class="text-base font-bold text-slate-200">${primaryRule.secondarySuspect.part}</h4>
          <p class="text-xs text-slate-400 leading-relaxed">${primaryRule.secondarySuspect.mechanism}</p>
        </div>

      </div>

      <!-- Action Plan: DO & DON'T -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
          <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="check-circle-2" class="w-4 h-4"></i>
            자가 응급 조치 (권장 행동)
          </div>
          <ul class="text-xs text-slate-200 space-y-1.5 list-disc list-inside">
            ${primaryRule.emergencyAction.do.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2">
          <div class="text-xs font-bold text-red-400 flex items-center gap-1.5">
            <i data-lucide="x-circle" class="w-4 h-4"></i>
            절대 하지 말아야 할 행동 (위험 요인)
          </div>
          <ul class="text-xs text-slate-200 space-y-1.5 list-disc list-inside">
            ${primaryRule.emergencyAction.dont.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>

      <!-- Repair Cost Estimate -->
      <div class="p-4 rounded-xl bg-carbon-900/90 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-purple-400 flex items-center gap-1.5">
            <i data-lucide="wallet" class="w-4 h-4"></i>
            예상 정비 견적 범위 (부품대 + 표준 공임 기준)
          </span>
          <span class="text-[11px] text-slate-400">부가세 포함</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-lg bg-carbon-800 border border-slate-700">
            <span class="text-slate-400 block mb-1">국산차 기준 예상 견적</span>
            <span class="text-sm font-extrabold text-white">${primaryRule.costs.domestic}</span>
          </div>
          <div class="p-3 rounded-lg bg-carbon-800 border border-slate-700">
            <span class="text-slate-400 block mb-1">수입차 기준 예상 견적</span>
            <span class="text-sm font-extrabold text-slate-300">${primaryRule.costs.imported}</span>
          </div>
          <div class="p-3 rounded-lg bg-carbon-800 border border-slate-700">
            <span class="text-slate-400 block mb-1">표준 공임 가이드</span>
            <span class="text-sm font-extrabold text-cyan-400">${primaryRule.costs.labor}</span>
          </div>
        </div>
      </div>

      <!-- Briefing Card for Mechanic -->
      <div class="p-4 rounded-xl bg-carbon-950 border border-cyan-900/50 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <i data-lucide="message-square-quote" class="w-4 h-4"></i>
            정비소 전달용 10초 브리핑 카드 (호갱 방지 모드)
          </span>
          <span class="text-[10px] text-slate-500">정비사에게 그대로 보여주세요</span>
        </div>
        <pre class="p-3 rounded-lg bg-carbon-900 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed select-all" id="briefing-card-text">${briefingText}</pre>
      </div>

    </div>
  `;

  // Attach button events
  document.getElementById("copy-briefing-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(briefingText).then(() => {
      alert("정비사 전달용 브리핑 내용이 클립보드에 복사되었습니다! 정비소 사장님께 카톡으로 보내거나 보여주세요.");
    });
  });

  document.getElementById("print-report-btn").addEventListener("click", () => {
    printDiagnosticReport(primaryRule, briefingText);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Smooth scroll to result
  elements.diagnosisResults.scrollIntoView({ behavior: "smooth", block: "start" });
}

function printDiagnosticReport(rule, briefingText) {
  elements.printArea.innerHTML = `
    <div style="font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto;">
      <h1 style="border-bottom: 2px solid #000; padding-bottom: 8px;">AutoMechanic AI 차량 정밀 진단 리포트</h1>
      <p><strong>발행일자:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      <p><strong>진단 차량:</strong> ${state.carProfile.model} (누적: ${state.carProfile.mileage.toLocaleString()}km)</p>
      
      <div style="margin: 20px 0; padding: 15px; border: 2px solid #333; border-radius: 8px;">
        <h2>진단명: ${rule.title}</h2>
        <p><strong>위험 등급:</strong> ${rule.dangerLabel}</p>
        <p><strong>주요 의심 부품:</strong> ${rule.primarySuspect.part} (신뢰도: ${rule.primarySuspect.probability}%)</p>
        <p><strong>메커니즘 설명:</strong> ${rule.primarySuspect.mechanism}</p>
      </div>

      <div style="margin: 20px 0;">
        <h3>예상 정비 비용 가이드</h3>
        <p>국산차 기준: ${rule.costs.domestic}</p>
        <p>수입차 기준: ${rule.costs.imported}</p>
      </div>

      <div style="margin: 20px 0; background: #f4f4f4; padding: 12px; border-radius: 6px;">
        <h3>정비사 전달용 점검 요청 사항</h3>
        <pre style="white-space: pre-wrap; font-family: monospace;">${briefingText}</pre>
      </div>

      <hr style="margin-top: 30px;">
      <p style="font-size: 11px; color: #666; text-align: center;">본 리포트는 인공지능 기반 분석 데이터로, 정비 전 반드시 1급/2급 자동차 종합 정비업체의 정밀 점검을 거치시기 바랍니다.</p>
    </div>
  `;
  window.print();
}

// ================= TAB 2: WARNING LIGHTS =================
function renderWarningLights() {
  const query = state.warningSearchQuery.toLowerCase();
  const colorFilter = state.warningFilterColor;

  const filtered = WARNING_LIGHTS.filter(wl => {
    const matchColor = colorFilter === "all" || wl.color === colorFilter;
    const matchQuery = !query || 
      wl.name.toLowerCase().includes(query) || 
      wl.summary.toLowerCase().includes(query) ||
      wl.causes.some(c => c.toLowerCase().includes(query));
    return matchColor && matchQuery;
  });

  elements.warningLightsGrid.innerHTML = filtered.map(wl => {
    let borderColor = "border-slate-800";
    let iconColor = "text-slate-300";
    let badgeBg = "bg-slate-800 text-slate-300";

    if (wl.color === "red") {
      borderColor = "border-red-900/60 hover:border-red-500";
      iconColor = "text-red-400";
      badgeBg = "bg-red-950 text-red-300 border border-red-800";
    } else if (wl.color === "amber") {
      borderColor = "border-amber-900/60 hover:border-amber-500";
      iconColor = "text-amber-400";
      badgeBg = "bg-amber-950 text-amber-300 border border-amber-800";
    } else if (wl.color === "green") {
      borderColor = "border-emerald-900/60 hover:border-emerald-500";
      iconColor = "text-emerald-400";
      badgeBg = "bg-emerald-950 text-emerald-300 border border-emerald-800";
    } else if (wl.color === "blue") {
      borderColor = "border-blue-900/60 hover:border-blue-500";
      iconColor = "text-blue-400";
      badgeBg = "bg-blue-950 text-blue-300 border border-blue-800";
    }

    return `
      <div class="glass-panel p-4 rounded-xl border ${borderColor} cursor-pointer transition hover:-translate-y-1 hover:shadow-lg warning-light-card" data-wl-id="${wl.id}">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-lg bg-carbon-900 flex items-center justify-center ${iconColor}">
            ${wl.icon}
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded font-bold ${badgeBg}">
            ${wl.severityText.split('(')[0]}
          </span>
        </div>
        <h4 class="text-sm font-bold text-white truncate mb-1">${wl.name}</h4>
        <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${wl.summary}</p>
        <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span class="text-slate-500">운행 가능: ${wl.canDrive ? '🟢 가능' : '🔴 불가'}</span>
          <span class="text-cyan-400 font-semibold flex items-center gap-0.5">상세보기 <i data-lucide="chevron-right" class="w-3 h-3"></i></span>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Attach card click handlers
  document.querySelectorAll(".warning-light-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.wlId;
      const wl = WARNING_LIGHTS.find(item => item.id === id);
      if (wl) showWarningLightModal(wl);
    });
  });
}

function showWarningLightModal(wl) {
  document.getElementById("modal-wl-icon").innerHTML = wl.icon;
  document.getElementById("modal-wl-name").textContent = wl.name;
  
  const badge = document.getElementById("modal-wl-badge");
  badge.textContent = wl.severityText;
  if (wl.color === "red") {
    badge.className = "text-xs px-2 py-0.5 rounded font-bold bg-red-950 text-red-300 border border-red-800";
  } else if (wl.color === "amber") {
    badge.className = "text-xs px-2 py-0.5 rounded font-bold bg-amber-950 text-amber-300 border border-amber-800";
  } else {
    badge.className = "text-xs px-2 py-0.5 rounded font-bold bg-emerald-950 text-emerald-300 border border-emerald-800";
  }

  document.getElementById("modal-wl-summary").textContent = wl.summary;
  document.getElementById("modal-wl-causes").innerHTML = wl.causes.map(c => `<li>${c}</li>`).join("");
  document.getElementById("modal-wl-action").textContent = wl.immediateAction;
  document.getElementById("modal-wl-cost").textContent = wl.repairCost;

  elements.wlModal.classList.remove("hidden");
}

// ================= TAB 3: MAINTENANCE CALCULATOR =================
function renderMaintenanceCalculator() {
  const pt = state.selectedPowertrain;
  const mileage = state.currentMileage;

  // Filter items matching the powertrain
  const items = MAINTENANCE_ITEMS.filter(it => it.powertrains.includes(pt));

  elements.maintenanceGrid.innerHTML = items.map(item => {
    const interval = item.intervalKm[pt] || item.intervalKm.gasoline;
    const cycleCount = Math.floor(mileage / interval);
    const lastReplacedKm = cycleCount * interval;
    const nextDueKm = lastReplacedKm + interval;
    const remainingKm = nextDueKm - mileage;
    const healthPercent = Math.max(0, Math.min(100, Math.round((remainingKm / interval) * 100)));

    let statusText = "정상 주행 가능";
    let statusClass = "text-emerald-400 bg-emerald-950/60 border-emerald-800";
    let barColor = "bg-emerald-500";

    if (remainingKm <= 0) {
      statusText = `교체 주기 초과 (${Math.abs(remainingKm).toLocaleString()}km 지남)`;
      statusClass = "text-red-400 bg-red-950/80 border-red-800 animate-pulse";
      barColor = "bg-red-500";
    } else if (healthPercent <= 25) {
      statusText = `교체 임박 (${remainingKm.toLocaleString()}km 남음)`;
      statusClass = "text-amber-400 bg-amber-950/60 border-amber-800";
      barColor = "bg-amber-500";
    } else {
      statusText = `${remainingKm.toLocaleString()}km 남음`;
    }

    return `
      <div class="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-white">${item.name}</h4>
              <span class="text-[10px] px-1.5 py-0.5 rounded border ${statusClass} font-semibold">${statusText}</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${item.description}</p>
          </div>
          <span class="text-xs font-mono font-bold text-cyan-400 shrink-0">${interval.toLocaleString()}km 주기</span>
        </div>

        <!-- Health Progress Bar -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>잔여 수명</span>
            <span class="font-bold text-slate-200">${healthPercent}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-carbon-900 overflow-hidden">
            <div class="h-full ${barColor} rounded-full transition-all duration-500" style="width: ${healthPercent}%"></div>
          </div>
        </div>

        <div class="p-2.5 rounded-lg bg-carbon-900/80 text-[11px] text-slate-300 border border-slate-800/80 flex items-start gap-1.5">
          <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"></i>
          <span>${item.tips}</span>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ================= TAB 4: COST GUIDE =================
function renderCostGuide() {
  // Consumer Shield Tips
  elements.consumerShieldGrid.innerHTML = CONSUMER_SHIELD_TIPS.map(tip => `
    <div class="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
      <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
        ${tip.badge}
      </span>
      <h4 class="text-sm font-bold text-white">${tip.title}</h4>
      <p class="text-xs text-slate-300 leading-relaxed">${tip.desc}</p>
    </div>
  `).join("");

  // Tables
  elements.repairCostTablesContainer.innerHTML = REPAIR_PRICE_GUIDES.map(cat => `
    <div class="space-y-3">
      <h4 class="text-sm font-extrabold text-cyan-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
        <i data-lucide="check" class="w-4 h-4"></i>
        ${cat.category}
      </h4>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-800 text-slate-400 bg-carbon-900/50">
              <th class="py-2.5 px-3 font-semibold">정비 항목</th>
              <th class="py-2.5 px-3 font-semibold">국산차 예상 총액</th>
              <th class="py-2.5 px-3 font-semibold">수입차 예상 총액</th>
              <th class="py-2.5 px-3 font-semibold">표준 공임</th>
              <th class="py-2.5 px-3 font-semibold">정비 팁</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            ${cat.items.map(it => `
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-2.5 px-3 font-bold text-white whitespace-nowrap">${it.name}</td>
                <td class="py-2.5 px-3 text-cyan-400 font-extrabold whitespace-nowrap">${it.totalDomestic}</td>
                <td class="py-2.5 px-3 text-slate-300 font-medium whitespace-nowrap">${it.totalImported}</td>
                <td class="py-2.5 px-3 text-purple-400 whitespace-nowrap">${it.standardLabor}</td>
                <td class="py-2.5 px-3 text-slate-400 max-w-xs">${it.tip}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ================= TAB 5: AI MECHANIC CHAT =================
function handleChatMessage(userText) {
  if (!userText.trim()) return;

  // Add User Message
  appendChatMessage("user", userText);
  elements.chatInput.value = "";

  // Generate AI Response based on comprehensive automotive knowledge engine
  setTimeout(() => {
    const reply = generateAiChatResponse(userText);
    appendChatMessage("ai", reply);
  }, 400);
}

function appendChatMessage(sender, text) {
  const isUser = sender === "user";
  const msgEl = document.createElement("div");
  msgEl.className = `flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`;

  const icon = isUser ? `
    <div class="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center shrink-0">
      <i data-lucide="user" class="w-4 h-4"></i>
    </div>
  ` : `
    <div class="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
      <i data-lucide="bot" class="w-4 h-4"></i>
    </div>
  `;

  const bubbleClass = isUser 
    ? "bg-cyan-600 text-white rounded-2xl rounded-tr-none p-3.5 max-w-lg text-sm leading-relaxed" 
    : "bg-carbon-800 border border-slate-700/80 text-slate-200 rounded-2xl rounded-tl-none p-3.5 max-w-lg text-sm leading-relaxed";

  msgEl.innerHTML = `
    ${icon}
    <div class="${bubbleClass}">
      ${text.replace(/\n/g, '<br>')}
    </div>
  `;

  elements.chatMessagesContainer.appendChild(msgEl);
  elements.chatMessagesContainer.scrollTop = elements.chatMessagesContainer.scrollHeight;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function generateAiChatResponse(prompt) {
  const q = prompt.toLowerCase();
  const car = state.carProfile;

  if (q.includes("와이퍼") && (q.includes("소리") || q.includes("드르륵") || q.includes("소음"))) {
    return `와이퍼 작동 시 '드르륵' 소음이나 떨림은 3가지가 원인입니다:\n\n1. 유막 형성 (가장 흔함): 앞유리에 도로 아스팔트 기름때(유막)가 끼어 마찰력이 불균일해져 튑니다. 유막제거제와 산화세륨으로 유막을 깨끗이 밀어내면 80% 해결됩니다.\n2. 와이퍼 고무 블레이드 노후/경화: 6개월 이상 교체하지 않았다면 고무 날이 굳은 상태입니다. 실리콘 와이퍼로 교체해 보세요.\n3. 와이퍼 암 각도 틀어짐: 와이퍼 블레이드가 유리 표면과 90도 수직을 유지하지 못하면 뜁니다. 몽키스패너로 암을 살짝 비틀어 수직 각도를 맞추면 조용해집니다.`;
  }

  if (q.includes("시동") && (q.includes("지연") || q.includes("늦게") || q.includes("힘겹게") || q.includes("안 걸려"))) {
    return `겨울철 또는 아침 첫 시동 시 힘겹게 걸리는 현상은 다음과 같은 원인입니다:\n\n1. 12V 시동 배터리 전압 강하 (가장 유력): 기온이 영하로 떨어지면 배터리 화학 반응 속도가 30~50% 감소합니다. 배터리 CCA(냉간시동전류) 값이 낮아져 모터가 느리게 돕니다.\n2. 디젤차 예열 플러그(가열 플러그) 노후: 디젤 차량이라면 실린더를 데워주는 예열 플러그에 단선이 생겼을 때 시동 지연이 발생합니다.\n3. 스타터 모터(세루모터) 브러시 마모.\n\n▶ 점검 팁: 시동 전 블랙박스 전원을 뽑고, 정비소나 긴급출동 기사님께 '배터리 건강도(SOH)' 측정을 요청하세요. 60% 미만이면 교체 시기입니다.`;
  }

  if (q.includes("디스크") && (q.includes("연마") || q.includes("교체"))) {
    return `정비소에서 디스크 교체를 권유했을 때 '연마'가 가능한지 판단하는 기준을 알려드립니다:\n\n1. 두께 잔여량(MIN THICKNESS): 브레이크 디스크 측면에는 최소 허용 두께(예: Min Th 26.4mm)가 각인되어 있습니다. 버니어캘리퍼스로 쟀을 때 규격보다 1.5mm 이상 여유가 있다면 1~2회 디스크 연마로 완벽히 복원 가능합니다.\n2. 비용 비교: 신품 교체는 한 세트에 16~25만 원이지만, 연마는 좌우 6~10만 원으로 약 60% 절약할 수 있습니다.\n3. 수입차 예외: 벤츠, BMW, 아우디 등 수입차는 디스크 금속 재질이 부드러워 연마 시 규격 미달이 되므로 제조사에서 연마를 금지하고 신품 교체를 원칙으로 합니다.`;
  }

  if (q.includes("핸들") && (q.includes("떨림") || q.includes("털림") || q.includes("진동"))) {
    return `핸들 떨림은 '언제 떨리는가'에 따라 원인이 완전히 다릅니다!\n\n1. 80~110km/h 특정 고속 주행 시에만 핸들이 털린다: 휠 밸런스(Wheel Balance) 문제입니다. 타이어 휠에 붙어있던 밸런스 납이 떨어졌거나 편마모 때문입니다. (비용: 2~3만 원)\n2. 고속 주행 중 브레이크 페달을 밟을 때 핸들이 덜덜덜 떨린다: 브레이크 디스크 로터 열변형입니다. 디스크 표면이 물결치듯 휘어 패드가 튕기는 현상입니다. (디스크 연마 또는 교체 필요)\n3. 정차 중(아이들링) 기어 D단에서 핸들이 심하게 떨린다: 엔진 마운트(미미) 고무가 주저앉아 엔진 진동이 차체로 직통 유입되는 것입니다.`;
  }

  // General fallback
  return `고객님의 ${car.model} (${car.mileage.toLocaleString()}km) 관련 질문에 대해 답변드립니다.\n\n해당 증상은 차량의 운행 조건, 외기 온도 및 최근 소모품 교체 이력과 밀접한 연관이 있습니다. 'AI 스마트 진단' 탭에서 감각 카테고리와 발생 조건을 체크해 주시면, 부품별 고장 확률과 정비소용 브리핑 카드를 3초 안에 받아보실 수 있습니다. 추가로 더 궁금한 점이 있으시면 구체적인 소리나 상황을 말씀해 주세요!`;
}

// ================= TAB 6: GARAGE =================
function renderGarage() {
  const p = state.carProfile;

  // Car Profile Card Grid
  elements.garageCarInfoGrid.innerHTML = `
    <div class="p-3.5 rounded-xl bg-carbon-800 border border-slate-700">
      <span class="text-xs text-slate-400 block mb-1">차종 및 모델</span>
      <span class="text-sm font-extrabold text-white">${p.model}</span>
    </div>
    <div class="p-3.5 rounded-xl bg-carbon-800 border border-slate-700">
      <span class="text-xs text-slate-400 block mb-1">제작 연식</span>
      <span class="text-sm font-extrabold text-cyan-400">${p.year}년형</span>
    </div>
    <div class="p-3.5 rounded-xl bg-carbon-800 border border-slate-700">
      <span class="text-xs text-slate-400 block mb-1">유종 / 구동계</span>
      <span class="text-sm font-extrabold text-slate-200">${p.powertrain.toUpperCase()}</span>
    </div>
    <div class="p-3.5 rounded-xl bg-carbon-800 border border-slate-700">
      <span class="text-xs text-slate-400 block mb-1">현재 누적 주행거리</span>
      <span class="text-sm font-extrabold text-emerald-400">${p.mileage.toLocaleString()} km</span>
    </div>
  `;

  // Diagnosis History
  const history = StorageManager.getDiagnosisHistory();
  if (history.length === 0) {
    elements.diagnosisHistoryList.innerHTML = `
      <div class="text-center py-8 text-slate-500 text-xs">
        아직 저장된 진단 기록이 없습니다. 'AI 스마트 진단'을 실행하면 자동으로 저장됩니다.
      </div>
    `;
  } else {
    elements.diagnosisHistoryList.innerHTML = history.map(item => `
      <div class="p-3.5 rounded-xl bg-carbon-800/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <h5 class="text-xs font-bold text-white">${item.title}</h5>
            <span class="text-[10px] px-1.5 py-0.5 rounded ${item.dangerLevel === 'danger' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'} font-semibold">
              ${item.dangerLevel === 'danger' ? '위험' : '주의'}
            </span>
          </div>
          <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
            <span>의심 부품: <strong class="text-slate-200">${item.primaryPart}</strong></span>
            <span>·</span>
            <span>예상 견적: <strong class="text-purple-400">${item.estimatedCost}</strong></span>
            <span>·</span>
            <span class="text-slate-500">${new Date(item.date).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
        <button class="delete-history-btn px-2.5 py-1 rounded bg-carbon-900 hover:bg-red-950 text-slate-400 hover:text-red-300 text-xs border border-slate-700 transition" data-hist-id="${item.id}">
          삭제
        </button>
      </div>
    `).join("");

    document.querySelectorAll(".delete-history-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.histId;
        StorageManager.deleteDiagnosisRecord(id);
        renderGarage();
      });
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ================= EVENT LISTENERS SETUP =================
function setupEventListeners() {
  // Navigation Tabs
  elements.navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab);
    });
  });

  // Brand Logo Click -> Go to Diagnose Tab
  elements.brandLogoBtn.addEventListener("click", () => {
    switchTab("diagnose");
  });

  // Theme Toggle
  elements.themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  });

  // Quick Car Btn & Garage Edit Car Btn
  const openCarModal = () => {
    const p = state.carProfile;
    elements.modalCarModel.value = p.model;
    elements.modalCarYear.value = p.year;
    elements.modalCarPowertrain.value = p.powertrain || "gasoline";
    elements.modalCarMileage.value = p.mileage;
    elements.carEditModal.classList.remove("hidden");
  };

  elements.quickCarBtn.addEventListener("click", openCarModal);
  elements.garageEditCarBtn.addEventListener("click", openCarModal);

  // Close Car Modal
  elements.closeCarModalBtn.addEventListener("click", () => elements.carEditModal.classList.add("hidden"));
  elements.cancelCarModalBtn.addEventListener("click", () => elements.carEditModal.classList.add("hidden"));

  // Submit Car Edit
  elements.carEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = {
      model: elements.modalCarModel.value.trim(),
      year: parseInt(elements.modalCarYear.value, 10),
      powertrain: elements.modalCarPowertrain.value,
      mileage: parseInt(elements.modalCarMileage.value, 10)
    };
    StorageManager.saveCarProfile(updated);
    state.carProfile = updated;
    updateVehicleDisplay();
    renderMaintenanceCalculator();
    renderGarage();
    elements.carEditModal.classList.add("hidden");
  });

  // Triage Category Click
  elements.categoryGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;
    const catId = btn.dataset.catId;
    handleCategoryToggle(btn, catId);
  });

  // Triage Condition Click
  elements.conditionChips.addEventListener("click", (e) => {
    const btn = e.target.closest(".condition-chip");
    if (!btn) return;
    const condId = btn.dataset.condId;
    handleConditionToggle(btn, condId);
  });

  // Run Diagnosis Button
  elements.runDiagnosisBtn.addEventListener("click", runDiagnosis);
  elements.symptomInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runDiagnosis();
  });

  // Sound Buttons
  elements.soundButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const soundType = btn.dataset.sound;
      if (carAudio.isPlaying && state.activeSound === soundType) {
        carAudio.stop();
        resetSoundButtons();
      } else {
        resetSoundButtons();
        carAudio.play(soundType);
        state.activeSound = soundType;
        btn.classList.add("ring-2", "ring-cyan-400", "bg-cyan-950/60");
        const icon = btn.querySelector("i");
        if (icon) icon.setAttribute("data-lucide", "volume-2");
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });

  elements.soundStopBtn.addEventListener("click", () => {
    carAudio.stop();
    resetSoundButtons();
  });

  // Warning Lights Search & Filters
  elements.warningSearchInput.addEventListener("input", (e) => {
    state.warningSearchQuery = e.target.value;
    renderWarningLights();
  });

  elements.wlFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.wlFilterBtns.forEach(b => {
        b.classList.remove("bg-cyan-600", "text-white");
        b.classList.add("bg-carbon-800");
      });
      btn.classList.add("bg-cyan-600", "text-white");
      btn.classList.remove("bg-carbon-800");
      state.warningFilterColor = btn.dataset.color;
      renderWarningLights();
    });
  });

  elements.closeWlModalBtn.addEventListener("click", () => elements.wlModal.classList.add("hidden"));
  elements.confirmWlModalBtn.addEventListener("click", () => elements.wlModal.classList.add("hidden"));

  // Maintenance Powertrain Toggles
  elements.powertrainBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.powertrainBtns.forEach(b => {
        b.classList.remove("bg-cyan-600", "text-white");
        b.classList.add("bg-carbon-800", "text-slate-300");
      });
      btn.classList.add("bg-cyan-600", "text-white");
      btn.classList.remove("bg-carbon-800", "text-slate-300");
      state.selectedPowertrain = btn.dataset.pt;
      renderMaintenanceCalculator();
    });
  });

  // Maintenance Mileage Slider
  elements.maintMileageRange.addEventListener("input", (e) => {
    state.currentMileage = parseInt(e.target.value, 10);
    elements.maintMileageVal.textContent = `${state.currentMileage.toLocaleString()} km`;
    renderMaintenanceCalculator();
  });

  // AI Chat Form
  elements.chatInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleChatMessage(elements.chatInput.value);
  });

  // Chat Prompt Chips
  elements.chatPromptChips.forEach(chip => {
    chip.addEventListener("click", () => {
      handleChatMessage(chip.textContent.trim());
    });
  });

  elements.clearChatBtn.addEventListener("click", () => {
    elements.chatMessagesContainer.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="bg-carbon-800 border border-slate-700/80 rounded-2xl rounded-tl-none p-3.5 max-w-lg text-sm text-slate-200 leading-relaxed">
          대화가 초기화되었습니다. 궁금한 점을 언제든 편하게 물어보세요!
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  });

  // Export Data
  elements.exportDataBtn.addEventListener("click", () => {
    const json = StorageManager.exportAllData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `automechanic_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

function resetSoundButtons() {
  state.activeSound = null;
  elements.soundButtons.forEach(btn => {
    btn.classList.remove("ring-2", "ring-cyan-400", "bg-cyan-950/60");
    const icon = btn.querySelector("i");
    if (icon) icon.setAttribute("data-lucide", "play");
  });
  if (window.lucide) window.lucide.createIcons();
}

// Start app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initApp);
