// js/data/maintenanceData.js
// 유종별 소모품 교체 주기 및 정비 스케줄 데이터베이스

export const POWERTRAINS = [
  { id: "gasoline", name: "가솔린 (휘발유)", desc: "정숙성과 고회전 특성, 엔진오일/점화플러그 주기적 관리 중요" },
  { id: "diesel", name: "디젤 (경유)", desc: "고토크와 연비, DPF/연료필터/흡기 카본 관리 필수" },
  { id: "hybrid", name: "하이브리드 (HEV)", desc: "엔진과 전기모터 복합, 엔진오일 저점도 규격 및 고전압 냉각수 점검" },
  { id: "ev", name: "전기차 (EV)", desc: "엔진오일 없음! 감속기오일/절연냉각수/브레이크액 중심의 미니멀 관리" }
];

export const MAINTENANCE_ITEMS = [
  {
    id: "engine_oil",
    name: "엔진오일 & 오일필터",
    category: "powertrain",
    powertrains: ["gasoline", "diesel", "hybrid"],
    intervalKm: {
      gasoline: 8000,
      diesel: 10000,
      hybrid: 10000
    },
    intervalMonths: 12,
    importance: "critical",
    unit: "km",
    description: "엔진 내부 마찰을 줄이고 열을 식히는 생명수입니다.",
    overdueWarning: "오일이 산화/슬러지화되어 엔진 출력 저하, 소음 증가 및 극심한 마모 유발",
    tips: "주행 거리가 적더라도 1년이 지나면 오일 산화가 진행되므로 1년에 최소 1회는 교체해야 합니다. 터보 차량은 7,000km 이내 교체 권장."
  },
  {
    id: "cabin_filter",
    name: "에어컨 / 히터 캐빈 필터",
    category: "cabin",
    powertrains: ["gasoline", "diesel", "hybrid", "ev"],
    intervalKm: {
      gasoline: 10000,
      diesel: 10000,
      hybrid: 10000,
      ev: 10000
    },
    intervalMonths: 6,
    importance: "recommended",
    unit: "km",
    description: "차량 실내로 유입되는 초미세먼지, 꽃가루, 배기가스 악취를 정화합니다.",
    overdueWarning: "송풍량 감소, 곰팡이 냄새 유발, 호흡기 질환 유발",
    tips: "글로브 박스를 열어 공구 없이 누구나 3분 만에 직접 DIY 교체 가능한 가장 쉬운 소모품입니다."
  },
  {
    id: "brake_pads",
    name: "브레이크 패드 (전륜 기준)",
    category: "chassis",
    powertrains: ["gasoline", "diesel", "hybrid", "ev"],
    intervalKm: {
      gasoline: 35000,
      diesel: 35000,
      hybrid: 65000, // 회생제동으로 수명 줆
      ev: 80000      // 원페달/회생제동으로 패드 수명 극대화
    },
    intervalMonths: 36,
    importance: "critical",
    unit: "km",
    description: "바퀴를 물리적으로 압착해 차량을 세우는 핵심 안전 부품입니다.",
    overdueWarning: "제동 거리 급증, 디스크 손상, 브레이크 밀림 사고 위험",
    tips: "하이브리드와 전기차는 회생제동 덕분에 패드가 잘 닳지 않지만, 반대로 녹이 슬거나 고착될 수 있어 1년마다 캘리퍼 윤활 점검이 필요합니다."
  },
  {
    id: "brake_fluid",
    name: "브레이크 액 (DOT4)",
    category: "chassis",
    powertrains: ["gasoline", "diesel", "hybrid", "ev"],
    intervalKm: {
      gasoline: 40000,
      diesel: 40000,
      hybrid: 40000,
      ev: 40000
    },
    intervalMonths: 24,
    importance: "critical",
    unit: "km",
    description: "페달의 제동 압력을 바퀴로 전달하는 수분 흡수성 비압축 유체입니다.",
    overdueWarning: "수분 함량 3% 초과 시 베이퍼 록(페달 스폰지 현상)으로 제동 불능 발생",
    tips: "테스터기로 수분도를 측정하여 수분 함량이 3% 이상이면 즉시 순환식으로 전량 교환해야 안전합니다."
  },
  {
    id: "transmission_fluid",
    name: "미션 오일 (변속기 유체 / DCT·오토·CVT)",
    category: "powertrain",
    powertrains: ["gasoline", "diesel", "hybrid"],
    intervalKm: {
      gasoline: 60000,
      diesel: 60000,
      hybrid: 70000
    },
    intervalMonths: 48,
    importance: "important",
    unit: "km",
    description: "기어 변속 시 마찰열을 식히고 유압을 제어하는 오일입니다.",
    overdueWarning: "변속 튕김(충격), 슬립(RPM만 오르고 속도 안 남), 연비 급감",
    tips: "제조사 매뉴얼에 '무교환'으로 적혀있더라도 가혹 조건(도심 정체, 단거리 반복)이 많은 한국 도로에서는 6~8만km마다 교체해야 변속기 고장을 예방합니다."
  },
  {
    id: "battery_12v",
    name: "12V 시동 배터리 (AGM / 일반 납산)",
    category: "electrical",
    powertrains: ["gasoline", "diesel", "hybrid", "ev"],
    intervalKm: {
      gasoline: 50000,
      diesel: 50000,
      hybrid: 60000,
      ev: 60000
    },
    intervalMonths: 36,
    importance: "important",
    unit: "km",
    description: "시동 모터와 전장 장비의 기준 전압을 제공하는 12볼트 배터리입니다.",
    overdueWarning: "겨울철 시동 불발, 계기판 경고등 오작동, ISG(스탑앤고) 미작동",
    tips: "블랙박스 상시 녹화가 켜져 있다면 수명이 2년대로 단축됩니다. ISG(스탑앤고) 장착 차량은 반드시 전용 AGM 배터리를 장착해야 합니다."
  },
  {
    id: "spark_plugs",
    name: "점화 플러그 & 이그니션 코일",
    category: "powertrain",
    powertrains: ["gasoline", "hybrid"],
    intervalKm: {
      gasoline: 80000, // 이리듐 플러그 기준
      hybrid: 90000
    },
    intervalMonths: 60,
    importance: "important",
    unit: "km",
    description: "실린더 내부의 혼합기에 불꽃을 튀겨 폭발을 일으키는 라이터 역할을 합니다.",
    overdueWarning: "엔진 찐빠(실화), 신호 대기 시 차체 덜덜 떨림, 가속 시 울컥거림",
    tips: "점화플러그 교체 시 코일도 함께 세트로 교환하면 공임을 크게 절약할 수 있습니다."
  },
  {
    id: "fuel_filter",
    name: "디젤 연료 필터 (카트리지/어셈블리)",
    category: "powertrain",
    powertrains: ["diesel"],
    intervalKm: {
      diesel: 40000
    },
    intervalMonths: 24,
    importance: "critical",
    unit: "km",
    description: "경유 속의 미세 수분과 이물질을 걸러 고압펌프와 인젝터를 보호합니다.",
    overdueWarning: "겨울철 연료 결빙으로 시동 꺼짐, 초고압 인젝터 쇳가루 발생 시 수백만 원 수리비",
    tips: "특히 추운 겨울이 오기 전 10~11월에 교환해 두는 것이 동파 및 시동 불발을 막는 최고의 비결입니다."
  },
  {
    id: "coolant",
    name: "엔진 냉각수 (장수명 부동액)",
    category: "powertrain",
    powertrains: ["gasoline", "diesel", "hybrid", "ev"],
    intervalKm: {
      gasoline: 80000,
      diesel: 80000,
      hybrid: 80000,
      ev: 60000 // 저전도 절연 냉각수
    },
    intervalMonths: 60,
    importance: "important",
    unit: "km",
    description: "엔진 및 고전압 배터리의 열을 식히고 겨울철 동파를 방지합니다.",
    overdueWarning: "엔진 오버히트, 라디에이터 내부 부식 및 막힘, 히터 불량",
    tips: "전기차는 일반 부동액을 넣으면 누수 시 누전 화재 위험이 있으므로 반드시 규격에 맞는 '저전도 절연 냉각수'를 주입해야 합니다."
  },
  {
    id: "tire_rotation",
    name: "타이어 위치 교환 (X자 / 전후 교체)",
    category: "chassis",
    powertrains: ["gasoline", "diesel", "hybrid", "ev"],
    intervalKm: {
      gasoline: 15000,
      diesel: 15000,
      hybrid: 15000,
      ev: 12000 // EV는 무거운 공차중량으로 마모 빠름
    },
    intervalMonths: 12,
    importance: "recommended",
    unit: "km",
    description: "앞뒤 타이어의 마모 속도 차이를 보정하여 4바퀴를 균일하게 오래 쓰게 합니다.",
    overdueWarning: "앞바퀴만 조기 마모, 타이어 단차 마모로 인한 주행 소음 발생",
    tips: "엔진오일 2번 교환할 때마다 한 번씩 타이어 위치 교환을 함께 요청하면 타이어 수명이 약 15,000km 이상 늘어납니다."
  },
  {
    id: "drive_belt",
    name: "겉벨트 세트 (구동벨트 + 텐셔너 + 베어링)",
    category: "powertrain",
    powertrains: ["gasoline", "diesel", "hybrid"],
    intervalKm: {
      gasoline: 90000,
      diesel: 80000,
      hybrid: 100000
    },
    intervalMonths: 72,
    importance: "important",
    unit: "km",
    description: "크랭크축 회전력으로 발전기, 에어컨 컴프레셔, 워터펌프를 구동합니다.",
    overdueWarning: "벨트 파손 시 충전 불가 및 즉각적인 냉각수 순환 정지로 엔진 과열",
    tips: "벨트만 갈지 말고 벨트를 일정한 장력으로 눌러주는 오토 텐셔너와 아이들 베어링까지 세트로 교환해야 잡소리를 원천 차단합니다."
  },
  {
    id: "ev_gearbox_oil",
    name: "EV 구동모터 감속기 오일",
    category: "ev",
    powertrains: ["ev"],
    intervalKm: {
      ev: 60000
    },
    intervalMonths: 48,
    importance: "important",
    unit: "km",
    description: "전기 모터의 초고속 회전(최대 16,000 RPM)을 감속하여 바퀴로 전달하는 기어를 윤활합니다.",
    overdueWarning: "모터 감속기 기어 마모 쇠가루 발생 및 고속 주행 시 고주파 이음",
    tips: "전기차는 일반 변속기가 없지만 감속기 내부 오일은 초반에 쇳가루가 많이 나오므로 첫 5~6만km에 한 번 교환해 주면 좋습니다."
  }
];
