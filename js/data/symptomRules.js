// js/data/symptomRules.js
// 자동차 이상 증상 AI 진단 룰 엔진 및 종합 데이터베이스

export const SYMPTOM_CATEGORIES = [
  { id: "noise", name: "이상 소음", icon: "Volume2", desc: "쇠 긁는 소리, 끼익, 웅웅, 덜컹거림" },
  { id: "vibration", name: "진동 및 떨림", icon: "Activity", desc: "핸들 떨림, 차체 떨림, 제동 시 페달 진동" },
  { id: "engine", name: "시동 및 출력 이상", icon: "Zap", desc: "시동 지연, 울컥거림, 가속 불량, 시동 꺼짐" },
  { id: "brake", name: "제동 및 페달 감각", icon: "OctagonAlert", desc: "브레이크 밀림, 페달 푹 꺼짐, 딱딱함" },
  { id: "smoke", name: "배기가스 및 연기", icon: "Cloud", desc: "흰 연기, 검은 매연, 파란 연기" },
  { id: "smell", name: "이상 냄새", icon: "Wind", desc: "달콤한 냄새, 타는 냄새, 식초/가스 냄새" },
  { id: "leak", name: "누유 및 바닥 누수", icon: "Droplets", desc: "엔진오일 누유, 부동액 바닥 고임" }
];

export const DRIVING_CONDITIONS = [
  { id: "braking", name: "브레이크 밟을 때" },
  { id: "accelerating", name: "가속 페달 밟을 때 (급가속/오르막)" },
  { id: "high_speed", name: "80~100km/h 이상 고속 주행 시" },
  { id: "bumpy", name: "과속방지턱이나 요철 지날 때" },
  { id: "turning", name: "핸들을 좌/우로 끝까지 돌릴 때" },
  { id: "idling", name: "정차 중 / 신호 대기 (공회전)" },
  { id: "cold_start", name: "아침 첫 시동(냉간) 직후" },
  { id: "ac_on", name: "에어컨이나 히터 켰을 때" }
];

export const DIAGNOSIS_RULES = [
  // 1. 브레이크 제동 시 쇳소리
  {
    id: "brake_pad_wear",
    category: "noise",
    conditions: ["braking"],
    keywords: ["쇳소리", "끼익", "쇠 긁는", "사각사각", "브레이크 소리"],
    soundType: "brake_squeal",
    title: "브레이크 패드 마모 인디케이터 접촉 (한계 도달)",
    dangerLevel: "danger",
    dangerLabel: "즉시 정비 (디스크 손상 및 제동력 저하 위험)",
    primarySuspect: {
      part: "브레이크 패드 및 마모 인디케이터(웨서 핀)",
      probability: 92,
      mechanism: "브레이크 패드가 2~3mm 이하로 닳으면, 교체 시기를 알리기 위해 패드에 장착된 철제 핀(인디케이터)이 회전하는 브레이크 디스크에 직접 닿아 고주파 쇳소리를 냅니다."
    },
    secondarySuspect: {
      part: "브레이크 디스크 로터 표면 턱 및 이상 마모",
      probability: 70,
      mechanism: "패드를 제때 갈지 않아 디스크 표면에 깊은 골(단차)이 생겼거나 녹(부식)이 발생했을 때 나타납니다."
    },
    emergencyAction: {
      do: ["급제동을 피하고 안전거리를 평소보다 2배 확보하세요.", "가능한 한 100km 이내로 정비소에 방문하여 패드를 교체하세요."],
      dont: ["'소리 좀 나다 말겠지' 하고 방치하지 마세요. 디스크 표면이 파여 디스크까지 통째로 교체해야 하므로 수리비가 3배로 뜁니다."]
    },
    costs: {
      domestic: "앞 패드 1세트: 6~10만 원 / 디스크 포함 시: 18~28만 원",
      imported: "앞 패드 1세트: 15~25만 원 / 디스크 포함 시: 40~75만 원",
      labor: "공임나라 기준 3~4만 원 선"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 브레이크 밟을 때 전륜/후륜에서 날카로운 쇳소리(끼익) 발생.\n요청 사항: 브레이크 패드 마모 잔량(mm) 확인 및 디스크 로터 표면 단차/열변형 점검 후 패드 교환 견적 요청."
  },

  // 2. 고속 주행 시 웅웅거리는 헬리콥터 비행기 소리
  {
    id: "wheel_bearing_fault",
    category: "noise",
    conditions: ["high_speed", "accelerating"],
    keywords: ["웅웅", "헬리콥터", "비행기 소리", "우웅", "속도 올라갈수록"],
    soundType: "wheel_bearing",
    title: "허브 베어링 (Wheel Hub Bearing) 피로 파손",
    dangerLevel: "danger",
    dangerLabel: "빠른 정비 권장 (주행 중 바퀴 이탈/과열 위험)",
    primarySuspect: {
      part: "바퀴 허브 베어링 (전륜 또는 후륜)",
      probability: 88,
      mechanism: "바퀴를 원활하게 회전시키는 베어링 내부 볼이나 레이스에 미세 크랙이 생겨, 고속 회전 시 '우우웅-'하는 공명음이 차체 바닥으로 울려 퍼집니다. 속도가 빨라질수록 소음 데시벨이 증가합니다."
    },
    secondarySuspect: {
      part: "타이어 단차 마모 (힐앤토 현상)",
      probability: 45,
      mechanism: "타이어 트레드 블록이 톱니 모양으로 울퉁불퉁하게 닳았을 때 바닥 노면 소음이 헬리콥터 소리처럼 들릴 수 있습니다."
    },
    emergencyAction: {
      do: ["고속도로 과속을 자제하고 시속 80km 이하로 서행하세요.", "주행 후 휠 중앙 캡 부위에 손을 댔을 때 뜨거운 열감이 느껴지는지 확인하세요."],
      dont: ["장거리 여행을 강행하지 마세요. 심하면 주행 중 베어링이 고착되어 바퀴가 잠길 수 있습니다."]
    },
    costs: {
      domestic: "개당 12~22만 원 (공임 포함)",
      imported: "개당 30~55만 원 (공임 포함)",
      labor: "약 5~8만 원"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 60km/h 이상 주행 시 바닥에서 웅웅거리는 헬리콥터 프로펠러 같은 공명음 발생, 속도 비례 증가.\n요청 사항: 리프트 띄운 후 4륜 허브 유격 점검 및 타이어 편마모/단차 점검 요망."
  },

  // 3. 시동 시 또는 비 올 때 끼이익 벨트 소음
  {
    id: "fan_belt_squeal",
    category: "noise",
    conditions: ["cold_start", "ac_on", "accelerating"],
    keywords: ["끼이익", "삑삑", "벨트소리", "끼약", "새소리", "출발할 때"],
    soundType: "belt_screech",
    title: "겉벨트 (구동벨트 / 팬벨트) 장력 저하 및 노후 슬립",
    dangerLevel: "warning",
    dangerLabel: "주의 및 조기 점검 (발전기 충전 불량 / 워터펌프 정지 위험)",
    primarySuspect: {
      part: "겉벨트 및 오토 텐셔너 (V-Ribbed Belt & Tensioner)",
      probability: 95,
      mechanism: "알터네이터(발전기), 에어컨 콤프레셔, 워터펌프를 돌려주는 고무 벨트가 노후되어 경화(딱딱해짐)되거나 늘어나, 풀리와 접촉 시 미끄러지며(슬립) 극심한 마찰 고주파음을 유발합니다."
    },
    secondarySuspect: {
      part: "아이들 베어링 / 텐셔너 풀리 베어링 유격",
      probability: 60,
      mechanism: "벨트를 눌러주는 풀리 내부 베어링에 그리스가 말라붙어 회전 저항이 생겼을 때 발생합니다."
    },
    emergencyAction: {
      do: ["에어컨을 끄고 엔진 부하를 줄여주세요.", "본닛을 열고 벨트 안쪽 고무에 갈라짐(크랙)이 있는지 육안 확인하세요."],
      dont: ["소음을 없애겠다고 벨트에 물이나 윤활 방청제(WD-40 등)를 뿌리지 마세요. 일시적으로 소리는 안 나지만 슬립이 심해져 벨트가 이탈하거나 끊어집니다."]
    },
    costs: {
      domestic: "겉벨트 세트(벨트+텐셔너+아이들러): 12~22만 원 (워터펌프 포함 시 25~35만 원)",
      imported: "겉벨트 세트: 30~55만 원",
      labor: "약 4~7만 원"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 냉간 첫 시동 및 에어컨 가동/가속 시 엔진룸에서 날카로운 겉벨트 슬립음(끼이익) 발생.\n요청 사항: 겉벨트 장력 및 균열 상태, 오토텐셔너 댐핑 기능 점검 후 벨트 세트 교환 견적 요청."
  },

  // 4. 핸들 끝까지 돌릴 때 딱-딱-딱 소음
  {
    id: "cv_joint_damage",
    category: "noise",
    conditions: ["turning", "accelerating"],
    keywords: ["딱딱", "뚝뚝", "핸들 꺾을 때", "유턴할 때", "따다닥"],
    soundType: "cv_joint",
    title: "등속조인트 (드라이브 샤프트 / CV Joint) 손상",
    dangerLevel: "danger",
    dangerLabel: "정비 필요 (동력 전달 끊김 위험)",
    primarySuspect: {
      part: "전륜 등속조인트 아우터 부트 파손 및 볼 베어링 마모",
      probability: 90,
      mechanism: "변속기의 동력을 앞바퀴로 전달하는 등속조인트의 고무 부트가 찢어져 내부 그리스가 밖으로 튀어나가고, 모래와 흙탕물이 유입되어 내부 강철 베어링 볼이 깎여나가 유턴/선회 시 딱딱거리는 타격음이 납니다."
    },
    secondarySuspect: {
      part: "스티어링 랙 앤 피니언 (오무기어) 타이로드 엔드 유격",
      probability: 40,
      mechanism: "조향 장치 관절 부위 볼조인트가 헐거워져 조향 시 충격음이 전달됩니다."
    },
    emergencyAction: {
      do: ["유턴이나 코너링 시 핸들을 끝까지 치지 말고 한 템포 여유를 두세요.", "앞바퀴 휠 안쪽 서스펜션 부위에 검은 그리스 기름이 잔뜩 튀어있는지 확인하세요."],
      dont: ["과격한 급출발 및 급선회를 피하세요. 조인트가 완전히 부러지면 액셀을 밟아도 차가 앞으로 나가지 않습니다."]
    },
    costs: {
      domestic: "등속조인트 신품: 18~28만 원 / 리빌드(재생품): 9~15만 원 (한 쪽 기준)",
      imported: "등속조인트: 45~90만 원",
      labor: "약 5~8만 원"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 유턴이나 코너링 시 핸들을 돌리고 가속하면 하체에서 규칙적인 딱-딱-딱-딱 타격음 발생.\n요청 사항: 좌/우 등속조인트 고무 부트 찢어짐 및 그리스 누유 여부, 조인트 유격 점검 요망."
  },

  // 5. 방지턱 넘을 때 덜컹거림 및 찌걱거림
  {
    id: "suspension_lower_arm",
    category: "noise",
    conditions: ["bumpy"],
    keywords: ["덜컹", "찌걱", "방지턱", "하체 소음", "달그락", "요철"],
    soundType: "cv_joint",
    title: "하체 서스펜션 부싱 노후 (로어암 / 활대링크 / 스테빌라이저)",
    dangerLevel: "warning",
    dangerLabel: "점검 권장 (승차감 저하 및 타이어 편마모)",
    primarySuspect: {
      part: "스테빌라이저 링크(활대링크) 및 부싱, 로어암 볼조인트",
      probability: 85,
      mechanism: "노면 충격을 흡수해 주는 고무 부싱(Rubber Bushing)이 시간이 지나면서 굳어 찢어지거나 유격이 발생하여, 턱을 넘을 때 금속 부품끼리 부딪쳐 '덜그럭'거리거나 겨울철 '찌걱' 소음이 납니다."
    },
    secondarySuspect: {
      part: "쇼크업소버(쇼바) 마운트 및 마운트 베어링",
      probability: 65,
      mechanism: "쇼바 상단 지지 마운트 고무가 눌러앉아 댐핑 기능을 상실했을 때 쿵 하는 충격음이 실내로 유입됩니다."
    },
    emergencyAction: {
      do: ["방지턱을 통과할 때는 시속 20km 이하로 감속하여 부하를 최소화하세요."],
      dont: ["한쪽 바퀴만 방지턱에 걸치는 운전 습관은 하체 링크에 편중 비틀림 하중을 주므로 지양하세요."]
    },
    costs: {
      domestic: "활대링크 1세트: 5~8만 원 / 로어암 좌우: 18~28만 원 / 쇼바: 25~45만 원",
      imported: "활대링크: 12~20만 원 / 로어암 세트: 50~100만 원",
      labor: "약 4~10만 원"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 과속방지턱 통과 시 전륜/후륜 하부에서 덜컹 및 찌걱거리는 이음 발생.\n요청 사항: 리프트 올려 활대링크 유격, 스테빌라이저 부싱, 로어암 대부싱 균열 상태 점검 요청."
  },

  // 6. 브레이크 밟을 때 핸들 또는 페달 덜덜덜 떨림
  {
    id: "brake_disc_warping",
    category: "vibration",
    conditions: ["braking", "high_speed"],
    keywords: ["핸들 떨림", "페달 떨림", "브레이크 떨림", "덜덜덜", "울컥울컥"],
    soundType: "brake_squeal",
    title: "브레이크 디스크 로터 열변형 (Disc Rotor Runout)",
    dangerLevel: "warning",
    dangerLabel: "정비 요망 (고속 제동 안정성 저하)",
    primarySuspect: {
      part: "전륜 브레이크 디스크 로터 (Brake Rotor)",
      probability: 94,
      mechanism: "고속 주행 중 브레이크를 자주 밟아 디스크가 수백도 고열로 달아오른 상태에서, 찬물 세차를 하거나 웅덩이를 지나 급랭되면서 디스크 금속 판이 미세하게 뒤틀렸습니다(열변형). 패드가 회전하는 굴곡진 디스크를 누를 때 반발력이 페달과 핸들로 진동으로 전달됩니다."
    },
    secondarySuspect: {
      part: "허브 베어링 런아웃 오차 또는 캘리퍼 슬라이드 핀 고착",
      probability: 50,
      mechanism: "캘리퍼 핀이 원활히 움직이지 않아 패드가 한쪽만 불균일하게 디스크를 압박할 때도 발생합니다."
    },
    emergencyAction: {
      do: ["고속 내리막길에서 풋브레이크만 계속 밟지 말고 엔진 브레이크를 함께 사용하세요.", "주행 직후 휠/디스크가 뜨거울 때 절대 셀프 세차장 고압수를 디스크에 직접 쏘지 마세요."],
      dont: ["고속 주행 시 급제동은 조향 불안정을 초래하므로 차간거리를 길게 유지하세요."]
    },
    costs: {
      domestic: "디스크 로터 연마(좌우): 8~12만 원 / 신품 디스크 교환: 16~26만 원",
      imported: "신품 디스크 교환(좌우): 35~60만 원 (수입차는 연마 비권장)",
      labor: "약 5~8만 원"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 80km/h 이상 고속 주행 중 브레이크 페달 밟을 때 스티어링 휠과 페달에 심한 떨림 발생.\n요청 사항: 브레이크 디스크 다이얼게이지 런아웃(변형) 측정 후 디스크 연마 또는 신품 교환 견적 요청."
  },

  // 7. 80~100km/h 특정 속도에서만 핸들 털림 (브레이크 미체결 시)
  {
    id: "wheel_balance_imbalance",
    category: "vibration",
    conditions: ["high_speed"],
    keywords: ["80키로", "100키로", "핸들 털림", "바퀴 떨림", "특정 속도"],
    soundType: "wheel_bearing",
    title: "앞바퀴 휠 밸런스 (Wheel Dynamic Balance) 불일치",
    dangerLevel: "caution",
    dangerLabel: "점검 권장 (타이어 편마모 방지)",
    primarySuspect: {
      part: "전륜 휠 납 밸런스 웨이트 탈락 또는 타이어 무게 불균형",
      probability: 95,
      mechanism: "타이어와 휠은 회전축을 중심으로 무게가 1g 단위까지 완벽하게 분배되어야 합니다. 휠에 붙어있던 밸런스 납이 떨어져 나가면, 고속 원심력으로 인해 특정 속도(주로 80~110km/h) 구간에서 고유 진동수가 일치하며 핸들이 좌우로 덜덜 털리게 됩니다."
    },
    secondarySuspect: {
      part: "휠 굴절 (포트홀 충격으로 인한 휠 림 미세 찌그러짐)",
      probability: 55,
      mechanism: "도로 위 포트홀을 밟아 알루미늄 휠 림이 휘었을 때 밸런스가 잡히지 않습니다."
    },
    emergencyAction: {
      do: ["가까운 타이어 전문점이나 정비소에 방문해 고속 휠 밸런스를 측정하세요."],
      dont: ["떨림을 참지 마세요. 장기 방치 시 조향 기어박스와 쇼바 마운트에 충격이 누적되어 큰 수리비가 발생합니다."]
    },
    costs: {
      domestic: "전륜 휠 밸런스(2본): 2~3만 원 / 고속 진동 밸런스: 4~6만 원",
      imported: "휠 밸런스: 3~5만 원",
      labor: "작업비 포함가"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 80~100km/h 정속 주행 시 핸들 좌우 떨림(브레이크 밟지 않아도 발생).\n요청 사항: 전륜 휠 굴절 여부 육안 확인 및 휠 밸런스(영점 조정) 재교정 요망."
  },

  // 8. 에어컨 켰을 때 달콤한 냄새 or 한약 냄새
  {
    id: "coolant_heater_core_leak",
    category: "smell",
    conditions: ["ac_on", "idling"],
    keywords: ["달콤한 냄새", "시럽 냄새", "한약 냄새", "히터 켤 때", "부동액 냄새"],
    soundType: null,
    title: "냉각수 (부동액) 미세 누수 / 히터 코어 누설",
    dangerLevel: "danger",
    dangerLabel: "즉시 정비 (엔진 과열 및 유독가스 실내 유입 위험)",
    primarySuspect: {
      part: "히터 코어(Heater Core) 또는 엔진룸 냉각수 호스 연결부",
      probability: 91,
      mechanism: "부동액의 주성분인 에틸렌글리콜(Ethylene Glycol)은 가열되어 기화할 때 특유의 달콤한 냄새(단내/한약 냄새)를 풍깁니다. 대시보드 안쪽 히터 코어나 라디에이터 호스에 미세 크랙이 생겨 누수가 발생한 명확한 증거입니다."
    },
    secondarySuspect: {
      part: "엔진 워터펌프 가스켓 실링 손상",
      probability: 60,
      mechanism: "엔진 블록과 펌프 사이에서 부동액이 흘러나와 뜨거운 배기 매니폴드에 닿아 증발할 때 실내 흡기로 유입됩니다."
    },
    emergencyAction: {
      do: ["보조 냉각수 탱크 수위를 점검하여 MIN 이하로 떨어졌는지 확인하세요.", "히터 바람을 쐬지 않도록 외기 순환 모드를 끄고 창문을 약간 여세요 (에틸렌글리콜 증기는 인체에 유해)."],
      dont: ["냉각수 부족 상태로 장시간 운행하지 마세요. 엔진 블록이 열변형으로 깨질 수 있습니다."]
    },
    costs: {
      domestic: "호스류 교체: 6~12만 원 / 히터 코어 교체: 30~55만 원 (대시보드 탈거 공임 높음)",
      imported: "냉각 라인 정비: 40~110만 원",
      labor: "작업 부위에 따라 상이"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 실내 송풍구에서 특유의 달콤한 부동액 냄새 발생 및 앞유리에 기름진 습기 서림.\n요청 사항: 냉각 라인 가압 테스트를 통한 누설 부위 탐지 및 히터 코어 누수 점검 요청."
  },

  // 9. 머플러에서 뿜어져 나오는 흰 연기 (수증기 제외)
  {
    id: "head_gasket_white_smoke",
    category: "smoke",
    conditions: ["idling", "accelerating"],
    keywords: ["흰 연기", "백연", "배기 가스 연기", "머플러 연기", "달콤한 냄새"],
    soundType: null,
    title: "실린더 헤드 가스켓 파손 (엔진 내부 냉각수 유입)",
    dangerLevel: "danger",
    dangerLabel: "즉시 주행 중지 (엔진 파손 치명적 결함)",
    primarySuspect: {
      part: "실린더 헤드 가스켓 (Cylinder Head Gasket) 또는 헤드 균열",
      probability: 89,
      mechanism: "겨울철 단순 수증기는 시동 직후 잠시 나오다 사라지지만, 주행 중에도 머플러에서 달콤한 냄새를 동반한 자욱한 흰 연기가 계속 뿜어진다면 헤드 가스켓이 터져 냉각수가 연소실 내부로 들어가 기름과 함께 불타는 현상입니다."
    },
    secondarySuspect: {
      part: "터보차저(과급기) 오일 실링 파손 (터보 차량의 경우)",
      probability: 50,
      mechanism: "터빈 베어링을 윤활하는 오일이 배기 하우징으로 누출되어 흰색에 가까운 연기를 발생시킵니다."
    },
    emergencyAction: {
      do: ["즉시 안전한 곳에 주차하고 시동을 끄세요.", "엔진오일 캡을 열었을 때 뚜껑에 '밀크티/마요네즈 색'의 누런 거품이 묻어있는지 확인하세요(냉각수와 오일 혼합 증거)."],
      dont: ["절대 더 이상 주행하지 마세요. 실린더 내부에 물이 차면(수격현상) 피스톤 로드가 부러져 엔진을 폐차해야 합니다."]
    },
    costs: {
      domestic: "헤드 가스켓 교환 및 헤드 면연마: 60~120만 원",
      imported: "헤드 수리: 180~350만 원",
      labor: "엔진 탈부착 포함 대공사"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 엔진 워밍업 후에도 배기구에서 짙은 흰색 연기 지속 배출, 냉각수 레벨 급격히 감소.\n요청 사항: 실린더 헤드 가스켓 파손(블로우) 여부 연소실 압축압력 테스트 및 CO2 누출 검사 요망."
  },

  // 10. 가속 페달 밟을 때 엔진에서 까르륵/딱딱 노킹음
  {
    id: "engine_knocking_sound",
    category: "noise",
    conditions: ["accelerating"],
    keywords: ["까르륵", "딱딱", "노킹", "엔진 소음", "언덕 오를 때", "자갈 굴러가는"],
    soundType: "engine_knock",
    title: "엔진 노킹 (Engine Knocking) 및 비정상 조기 점화",
    dangerLevel: "danger",
    dangerLabel: "주의 및 신속 조치 (피스톤 크라운 파손 위험)",
    primarySuspect: {
      part: "점화 플러그 열가 불일치 / 연소실 카본 슬러지 과다 퇴적",
      probability: 87,
      mechanism: "피스톤이 정상 상사점에 도달하기 전에 연소실 내부의 고열 카본 찌꺼기나 낮은 옥탄가 연료로 인해 혼합기가 조기 폭발(Detonation)하여, 피스톤이 실린더 벽을 치며 '까르륵/자갈 구르는 소리'를 냅니다."
    },
    secondarySuspect: {
      part: "노크 센서(Knock Sensor) 불량 또는 연료 품질 저하",
      probability: 60,
      mechanism: "점화 타이밍을 지각(늦춤)시켜 노킹을 억제해야 할 노크 센서가 제어 신호를 보내지 못하고 있습니다."
    },
    emergencyAction: {
      do: ["고단 기어로 낮은 RPM에서 무리하게 엑셀을 깊게 밟지 마세요.", "직분사(GDI) 가솔린 또는 터보 차량이라면 고급유를 한 번 주유해 보거나 인젝터/연소실 클리너를 처방하세요."],
      dont: ["소음을 방치하면 피스톤 헤드가 녹아 구멍이 뚫리는 참사가 일어납니다."]
    },
    costs: {
      domestic: "점화플러그/코일 세트: 12~22만 원 / 연소실 호두가루 클리닝: 20~35만 원",
      imported: "플러그/코일 세트: 28~50만 원",
      labor: "약 4~8만 원"
    },
    briefingCard: "차종: [차종] / 주행거리: [주행거리]km\n증상: 오르막 가속 또는 급가속 시 엔진룸에서 금속 자갈 굴러가는 듯한 까르륵 노킹 소음 발생.\n요청 사항: 스캐너 데이터상 점화각 진각치 및 실화(Misfire) 카운트 점검, 점화플러그 전극 마모 점검 요망."
  }
];
