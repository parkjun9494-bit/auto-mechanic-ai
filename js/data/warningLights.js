// js/data/warningLights.js
// 60+ 자동차 계기판 경고등 데이터베이스

export const WARNING_LIGHTS = [
  // --- RED WARNING LIGHTS (위험 - 즉시 조치 필요) ---
  {
    id: "engine_oil_pressure",
    name: "엔진오일 압력 경고등",
    color: "red",
    category: "engine",
    severity: "danger",
    severityText: "즉시 정지 (견인 권장)",
    canDrive: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M19 14V8a2 2 0 0 0-2-2h-3l-2-3H8L6 6H4a2 2 0 0 0-2 2v6"/><path d="M2 14c0 3 3 5 8 5h6c4 0 6-2 6-5"/><path d="M22 10l-2 2"/><circle cx="10" cy="11" r="1.5"/></svg>`,
    summary: "엔진 내부의 오일 유압이 기준치 이하로 급격히 떨어졌음을 알립니다.",
    causes: [
      "엔진오일 부족 또는 극심한 누유",
      "오일 펌프 고장 또는 유압 센서 불량",
      "오일 스트레이너(흡입구) 슬러지 막힘",
      "오일 점도 파괴 또는 희석"
    ],
    immediateAction: "즉시 안전한 곳에 정차 후 시동을 끄세요. 오일 게이지를 뽑아 오일량을 점검하고, 부족하다면 보충하기 전까지 절대 주행하지 마세요. 엔진 고착(블로바운드)으로 수백만 원의 엔진 교체 비용이 발생할 수 있습니다.",
    repairCost: "오일 보충: 2~4만 원 / 오일펌프 교체: 30~60만 원 / 엔진 보링: 200만 원 이상"
  },
  {
    id: "coolant_temperature",
    name: "냉각수 고온 경고등",
    color: "red",
    category: "engine",
    severity: "danger",
    severityText: "즉시 정지 (오버히트 위험)",
    canDrive: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M10 2v6.5a3.5 3.5 0 1 0 4 0V2h-4z"/><circle cx="12" cy="15" r="1.5"/><path d="M18 4h3M18 8h3M18 12h2"/></svg>`,
    summary: "냉각수 온도가 120℃ 이상으로 치솟아 엔진 오버히트 위험 상태입니다.",
    causes: [
      "냉각수(부동액) 누수 또는 절대량 부족",
      "라디에이터 냉각팬 모터 고장",
      "워터펌프 파손 또는 구동벨트 끊어짐",
      "서모스탯(수온조절기) 닫힌 채 고착"
    ],
    immediateAction: "즉시 갓길 정차 후 시동을 끄지 말고 히터를 최고 온도로 강풍으로 틀어 엔진 열을 식히거나(냉각팬 구동 확인 시), 냉각팬이 돌지 않으면 즉시 시동을 끄세요. 주의: 엔진이 뜨거울 때 라디에이터 캡을 열면 화상을 입으므로 절대 열지 마세요!",
    repairCost: "냉각수 보충/호스 교체: 5~12만 원 / 서모스탯: 10~18만 원 / 라디에이터: 25~45만 원"
  },
  {
    id: "battery_charging",
    name: "배터리 충전 경고등 (발전기 이상)",
    color: "red",
    category: "electrical",
    severity: "danger",
    severityText: "단거리 이동 후 즉시 정비",
    canDrive: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M6 3v3M18 3v3M8 13h4M10 11v4M15 13h3"/></svg>`,
    summary: "배터리 자체 문제가 아닌 '발전기(알터네이터)'가 전기를 생산하지 못하는 상태입니다.",
    causes: [
      "발전기(알터네이터) 코일 손상 또는 레귤레이터 고장",
      "겉벨트(드라이브 벨트) 슬립 또는 끊어짐",
      "배터리 터미널 단자 접촉 불량 및 단선"
    ],
    immediateAction: "에어컨, 전조등, 오디오 등 모든 전장장치를 즉시 끄세요. 현재 배터리에 남은 전력으로만 주행 중이므로 15~30분 이내에 엔진이 꺼지고 브레이크/핸들이 급격히 무거워집니다. 가장 가까운 정비소로 즉시 이동하거나 안전지대에서 견인을 부르세요.",
    repairCost: "알터네이터(발전기) 교체: 18~40만 원 (재생품: 12~22만 원) / 겉벨트 교체: 8~15만 원"
  },
  {
    id: "brake_system_red",
    name: "브레이크 시스템 경고등",
    color: "red",
    category: "brake",
    severity: "danger",
    severityText: "즉시 정지 (제동 불능 위험)",
    canDrive: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/><path d="M3 8a11 11 0 0 0 0 8M21 8a11 11 0 0 1 0 8"/></svg>`,
    summary: "사이드 브레이크가 풀려있는데도 켜진다면 브레이크 오일 부족 또는 유압 상실입니다.",
    causes: [
      "사이드 브레이크(주차 브레이크) 체결 상태",
      "브레이크액 부족 (누유 또는 패드 극심한 마모)",
      "마스터 실린더 유압 저하",
      "ABS/ESP 유압 모듈레이터 결함"
    ],
    immediateAction: "주차 브레이크 레버/버튼을 먼저 확인하세요. 풀려있음에도 점등된다면 브레이크 페달을 밟았을 때 푹 꺼지는지 확인하세요. 제동력이 상실될 수 있으므로 절대 과속하지 말고 비상등을 켜고 안전지대에 세워 견인하세요.",
    repairCost: "브레이크액 보충/교환: 6~10만 원 / 브레이크 호스/캘리퍼 수리: 15~35만 원"
  },
  {
    id: "airbag_srs",
    name: "에어백 (SRS) 경고등",
    color: "red",
    category: "safety",
    severity: "warning",
    severityText: "정비소 점검 필요 (사고 시 미전개)",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="12" r="3.5"/></svg>`,
    summary: "에어백 및 안전벨트 프리텐셔너 시스템에 오류가 감지되었습니다.",
    causes: [
      "시트 하단 에어백 와이어링 커넥터 접촉 불량",
      "스티어링 휠 내부 클럭스프링(Clock Spring) 단선",
      "충돌 감지 센서 오류 또는 에어백 ECU 결함"
    ],
    immediateAction: "주행은 가능하지만, 충돌 사고 발생 시 에어백이 전개되지 않아 치명적일 수 있습니다. 빠른 시일 내 스캐너(OBD)로 오류 코드를 진단받으세요.",
    repairCost: "커넥터 배선 점검: 3~6만 원 / 클럭스프링 교체: 10~18만 원"
  },
  {
    id: "door_trunk_open",
    name: "도어 / 트렁크 열림 경고등",
    color: "red",
    category: "safety",
    severity: "danger",
    severityText: "문 닫기 전 주행 금지",
    canDrive: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="8" cy="12" r="1.5"/></svg>`,
    summary: "차량의 도어, 보닛 또는 트렁크가 완전히 잠기지 않았습니다.",
    causes: [
      "문이 덜 닫힘",
      "도어 래치 스위치 접점 불량",
      "트렁크/보닛 센서 이물질 끼임"
    ],
    immediateAction: "주행 중 문이 열리면 인명 사고가 발생할 수 있습니다. 즉시 정차 후 모든 문과 트렁크를 확실하게 다시 닫으세요.",
    repairCost: "도어 래치 액추에이터 교체: 8~14만 원"
  },
  {
    id: "seatbelt_warning",
    name: "안전벨트 미착용 경고등",
    color: "red",
    category: "safety",
    severity: "danger",
    severityText: "탑승자 전원 착용 필수",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M12 3v18M7 7l10 10M17 7L7 17"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
    summary: "운전석, 동승석 또는 뒷좌석 승객이 안전벨트를 착용하지 않았습니다.",
    causes: [
      "탑승자 안전벨트 미체결",
      "조수석 좌석 무게 센서 오류 (가방이나 무거운 물건을 올려둔 경우)",
      "버클 내부 센서 스위치 접촉 불량"
    ],
    immediateAction: "탑승자 전원 안전벨트를 착용하세요. 조수석에 짐이 놓여 있다면 발밑이나 트렁크로 옮기세요.",
    repairCost: "버클 센서 교체: 5~10만 원"
  },

  // --- AMBER / YELLOW WARNING LIGHTS (주의 / 빠른 점검 권장) ---
  {
    id: "check_engine_mil",
    name: "엔진 체크 경고등 (MIL)",
    color: "amber",
    category: "engine",
    severity: "warning",
    severityText: "점검 권장 (깜빡이면 즉시 정차)",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M4 10h2v4H4zM20 10h-2v4h2zM6 8h12v8H6zM9 8V5h6v3M9 16v3h6v-3"/></svg>`,
    summary: "엔진 전자제어 시스템, 배출가스 정화장치, 연료 공급계 등에 이상이 감지되었습니다.",
    causes: [
      "산소 센서(O2 Sensor) 또는 에어플로우 센서 불량",
      "점화 플러그 / 이그니션 코일 실화(Misfire)",
      "연료 캡(주유구 뚜껑) 덜 닫힘 (증발가스 누출)",
      "삼원 촉매 변환기(Catalytic Converter) 효율 저하",
      "흡기 밸브 카본 퇴적 또는 가변 밸브(VVT) 이상"
    ],
    immediateAction: "1. 주유 후 얼마 안 되었다면 연료캡이 '딸깍' 소리 날 때까지 완전히 잠겼는지 확인하세요. 2. 경고등이 계속 켜져 있다면 급가속을 자제하고 며칠 내 정비소에서 스캐너(OBD)를 연결해 에러코드를 확인하세요. *주의: 경고등이 깜빡거린다면 실화가 발생하여 촉매가 녹아내릴 위험이 있으므로 즉시 운행을 멈추어야 합니다.",
    repairCost: "연료캡: 1~2만 원 / 산소센서: 12~25만 원 / 점화플러그·코일 세트: 15~28만 원 / 촉매: 50~150만 원"
  },
  {
    id: "tpms_warning",
    name: "타이어 공기압 경고등 (TPMS)",
    color: "amber",
    category: "tire",
    severity: "warning",
    severityText: "공기압 점검 후 주행",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M12 7v5M12 16h.01"/><path d="M4 17C2 12 3 6 12 6s10 6 8 11"/><path d="M4 17h16"/></svg>`,
    summary: "1개 이상의 타이어 공기압이 표준 적정치보다 20~25% 이상 낮아졌습니다.",
    causes: [
      "기온 급강하 (환절기/겨울철 기온 저하로 인한 자연 수축)",
      "타이어 트레드에 못/나사 박힘 (미세 펑크)",
      "타이어 밸브(구찌) 코어 노후 누출",
      "TPMS 휠 내부 무선 센서 배터리 방전"
    ],
    immediateAction: "차에서 내려 4개 타이어의 외관과 주저앉음 여부를 육안 점검하세요. 펑크가 아니라면 가까운 주유소나 정비소에서 적정 공기압(보통 34~38 psi, 운전석 B필러 스티커 참조)을 주입하세요. 주입 후 5~10분 주행하면 자동으로 꺼집니다.",
    repairCost: "공기압 보충: 무료~5천원 / 펑크 지렁이 수리: 1~2만 원 / TPMS 센서 교체: 6~12만 원"
  },
  {
    id: "abs_warning",
    name: "ABS 경고등",
    color: "amber",
    category: "brake",
    severity: "warning",
    severityText: "일반 제동은 가능, 급제동 주의",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="9"/><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="bold" fill="currentColor">ABS</text></svg>`,
    summary: "급제동 시 바퀴가 잠기는 것을 막아주는 'ABS' 시스템에 결함이 발생했습니다.",
    causes: [
      "휠 스피드 센서(톤휠) 오염, 단선 또는 고장",
      "ABS 모듈레이터 펌프 밸브 고착",
      "ABS 퓨즈 단선 또는 전압 불안정"
    ],
    immediateAction: "일반적인 유압 브레이크 기능은 정상 작동하므로 일반적인 서행 주행은 가능합니다. 단, 눈길, 빗길 또는 급제동 시 바퀴가 잠기며 차가 스핀(회전)할 수 있으므로 차간 거리를 평소보다 2배 확보하고 조속히 점검받으세요.",
    repairCost: "휠 스피드 센서 교체: 8~16만 원 / ABS 모듈 수리: 40~90만 원"
  },
  {
    id: "esp_esc_warning",
    name: "차체자세제어장치 (ESC / ESP / VDC)",
    color: "amber",
    category: "brake",
    severity: "info",
    severityText: "깜빡임: 정상 작동 중 / 지속점등: 결함",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M4 17l4-4 4 4 4-4 4 4"/><circle cx="12" cy="7" r="3"/></svg>`,
    summary: "자동차가 빗길·눈길 등에서 미끄러지지 않도록 바퀴별 제동력을 자동 제어하는 장치입니다.",
    causes: [
      "주행 중 깜빡임: 차가 미끄러져 장치가 개입 중인 정상 상황",
      "상시 켜짐: ESC OFF 버튼이 눌렸거나, 조향각 센서/요레이트 센서 결함"
    ],
    immediateAction: "차량의 'ESC OFF' 버튼이 눌러져 있는지 확인하세요. 버튼을 눌러도 꺼지지 않고 상시 켜져 있다면 자세제어 센서 라인을 점검해야 합니다.",
    repairCost: "조향각 센서 영점 재설정: 3~6만 원 / 모듈 교체: 30~70만 원"
  },
  {
    id: "mdps_eps_steering",
    name: "전자식 파워 스티어링 (MDPS / EPS)",
    color: "amber",
    category: "steering",
    severity: "danger",
    severityText: "핸들 잠김/무거움 위험",
    canDrive: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>`,
    summary: "핸들을 가볍게 돌려주는 전동 모터 보조 시스템에 결함이 발생했습니다.",
    causes: [
      "MDPS 모터 과열 또는 토크 센서 불량",
      "플렉시블 커플링 파손 (유격 및 털림 발생)",
      "스티어링 컬럼 ECU 통신 에러"
    ],
    immediateAction: "핸들이 급격하게 무거워져 커브길에서 회전하지 못할 위험이 있습니다. 안전지대에 멈춘 후 시동을 껐다가 3분 후 다시 걸어보세요. 지속 점등되면 절대 무리하게 주행하지 말고 견인 조치하세요.",
    repairCost: "플렉시블 커플링 교체: 12~20만 원 / MDPS 컬럼 어셈블리 교체: 60~120만 원"
  },
  {
    id: "dpf_warning",
    name: "디젤 매연 포집 필터 (DPF) 경고등",
    color: "amber",
    category: "exhaust",
    severity: "warning",
    severityText: "고속 주행으로 재생 필요",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="7" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="17" cy="12" r="1"/><path d="M1 12h2M21 12h2"/></svg>`,
    summary: "디젤차의 배기가스 미세먼지를 모으는 DPF에 그을음(Soot)이 기준치 이상 쌓였습니다.",
    causes: [
      "잦은 도심 저속 단거리 주행 (배기온도 미달로 자동 재생 불가)",
      "차압 센서(Differential Pressure Sensor) 고장",
      "인젝터 불량으로 인한 과도한 매연 발생"
    ],
    immediateAction: "안전이 확보된 고속도로나 자동차 전용도로에서 시속 60km/h 이상, 엔진 회전수 1,500~2,500 RPM으로 약 25~30분간 정속 주행하세요. DPF가 자체 고온 연소로 청소되면서 경고등이 꺼집니다. 방치 시 필터가 완전히 막혀 수백만 원의 교체비가 듭니다.",
    repairCost: "DPF 클리닝(탈거 건식/습식): 25~45만 원 / DPF 신품 교체: 150~300만 원"
  },
  {
    id: "fuel_low",
    name: "연료 부족 경고등",
    color: "amber",
    category: "fuel",
    severity: "warning",
    severityText: "즉시 주유 요망",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect x="3" y="4" width="12" height="16" rx="2"/><path d="M15 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1M6 9h6"/></svg>`,
    summary: "남은 연료로 주행할 수 있는 거리가 약 30~50km 미만으로 줄어들었습니다.",
    causes: [
      "연료 소진",
      "연료 탱크 내 레벨 센서(부자) 오작동"
    ],
    immediateAction: "가장 가까운 주유소에서 주유하세요. 연료가 바닥난 상태로 계속 주행하면 연료탱크 하부의 모터(연료펌프)가 연료로 냉각되지 않아 과열로 소손될 수 있습니다.",
    repairCost: "주유 비용 / 연료펌프 소손 시 교체: 15~35만 원"
  },
  {
    id: "washer_fluid_low",
    name: "워셔액 부족 경고등",
    color: "amber",
    category: "visibility",
    severity: "info",
    severityText: "워셔액 보충 권장",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M4 17a8 8 0 0 1 16 0M12 17V7M8 10l4-3 4 3"/></svg>`,
    summary: "전면 앞유리를 닦는 워셔액 탱크의 잔량이 부족합니다.",
    causes: ["워셔액 소진", "워셔액 통 파손 누수"],
    immediateAction: "시야 확보를 위해 마트/주유소에서 에탄올 워셔액 1~2통을 구매하여 본닛 내부 파란 뚜껑 탱크에 보충하세요.",
    repairCost: "에탄올 워셔액 1병: 2,000~4,000원"
  },
  {
    id: "ev_system_service",
    name: "전기차 (EV) 서비스 / 거북이 모드 경고등",
    color: "amber",
    category: "ev",
    severity: "warning",
    severityText: "출력 제한 모드 (배터리 점검)",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    summary: "전기차 고전압 배터리 잔량이 극도로 낮거나, 구동 모터/인버터 온도 과열로 출력이 제한되었습니다.",
    causes: [
      "고전압 배터리 SOC 잔량 3% 미만",
      "고전압 배터리 셀 밸런싱 불량",
      "구동 모터 및 인버터 냉각 시스템 이상"
    ],
    immediateAction: "차량의 최고 속도와 가속력이 급격히 제한됩니다. 비상등을 켜고 하위 차로로 이동하여 즉시 급속 충전소로 이동하거나 긴급 견인을 요청하세요.",
    repairCost: "전기차 절연 냉각수 교체: 15~30만 원 / 배터리 시스템 진단: 제조사 보증 점검"
  },

  // --- GREEN / BLUE INDICATORS (정상 작동 / 편의 기능) ---
  {
    id: "cruise_control",
    name: "스마트 크루즈 컨트롤 (SCC / CC)",
    color: "green",
    category: "assist",
    severity: "info",
    severityText: "정상 작동 중",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-4M8 12a4 4 0 0 1 8 0"/></svg>`,
    summary: "설정한 속도와 앞차와의 간격을 유지하며 정속 주행하는 기능이 켜져 있습니다.",
    causes: ["스티어링 휠의 크루즈 버튼 활성화"],
    immediateAction: "브레이크 페달을 밟거나 캔슬(O) 버튼을 누르면 즉시 해제됩니다.",
    repairCost: "0원 (정상 기능)"
  },
  {
    id: "high_beam",
    name: "상향등 (하이빔) 표시등",
    color: "blue",
    category: "visibility",
    severity: "info",
    severityText: "맞은편 차량 눈부심 주의",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="7" cy="12" r="4"/><path d="M13 8h8M13 12h8M13 16h8"/></svg>`,
    summary: "전조등 상향등이 켜져 있어 원거리 시야를 비추고 있습니다.",
    causes: ["방향지시등 레버를 앞으로 밀었거나 패스 스위치 작동"],
    immediateAction: "반대편 마주오는 차나 앞서가는 차가 있을 경우 눈부심(스텔스/눈뽕) 사고를 유발하므로 하향등으로 전환하세요.",
    repairCost: "0원 (정상 기능)"
  },
  {
    id: "auto_stop_go",
    name: "오토 스톱 & 고 (ISG 스톱앤고)",
    color: "green",
    category: "engine",
    severity: "info",
    severityText: "엔진 공회전 절감 중",
    canDrive: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="9"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="currentColor">A</text></svg>`,
    summary: "신호 대기 시 공회전을 줄이기 위해 엔진이 임시로 꺼져 있는 상태입니다.",
    causes: ["배터리 충전량, 에어컨 온도 등 ISG 조건 충족"],
    immediateAction: "브레이크에서 발을 떼거나 엑셀을 밟으면 0.4초 내로 부드럽게 재시동됩니다.",
    repairCost: "0원 (노란색으로 점등 시 배터리 상태 점검 필요)"
  }
];
