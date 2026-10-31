// js/data/costGuideData.js
// 주요 자동차 정비 항목별 표준 공임 및 부품 견적 기준표 + 소비자 보호 가이드

export const CONSUMER_SHIELD_TIPS = [
  {
    title: "정비 전 '점검·정비 견적서' 발급 요구 (법적 의무)",
    desc: "자동차관리법 제58조 제4항에 의거, 정비업자는 수리 전 차주에게 견적서를 서면으로 교부해야 합니다. 견적서 없이 임의 수리 후 과다 청구된 비용은 지급을 거부하거나 소비자원에 구제 신청할 수 있습니다.",
    badge: "법적 권리",
    color: "blue"
  },
  {
    title: "정비 후 60일 또는 3,000km 무상 A/S 보증",
    desc: "정비업소에서 수리받은 부품이나 동일 부위에 60일 또는 주행거리 3,000km 이내에 동일한 하자가 재발할 경우, 법적으로 전액 무상 재수리를 받을 권리가 있습니다. 영수증(정비명세서)을 반드시 보관하세요.",
    badge: "무상 보증",
    color: "emerald"
  },
  {
    title: "교체 후 탈거된 '헌 부품(고품)' 직접 확인하기",
    desc: "실제로 부품을 교체했는지, 정말 고장 난 상태였는지 확인하기 위해 '교체 후 나온 기존 부품을 트렁크에 넣어달라'고 미리 요청하세요. 과잉 정비나 허위 청구를 미연에 방지할 수 있습니다.",
    badge: "호갱 방지 꿀팁",
    color: "amber"
  },
  {
    title: "공임나라 / 표준 공임 시스템 활용하기",
    desc: "엔진오일, 브레이크 패드, 배터리 등 소모품은 인터넷에서 순정 부품을 직접 최저가로 구매한 뒤, 공임나라 등 전국 표준 공임 제휴점에서 공임(작업비)만 지불하고 교체하면 정비 비용을 40~60% 절약할 수 있습니다.",
    badge: "비용 절약",
    color: "purple"
  }
];

export const REPAIR_PRICE_GUIDES = [
  {
    category: "엔진 & 파워트레인",
    items: [
      {
        name: "엔진오일 세트 교환 (오일+필터+에어크리너)",
        domesticParts: "35,000 ~ 55,000원",
        importedParts: "80,000 ~ 160,000원",
        standardLabor: "19,000 ~ 29,000원",
        totalDomestic: "5.5 ~ 8.5만 원",
        totalImported: "11 ~ 22만 원",
        tip: "국산차 가솔린 4기통 기준 합성유 가격입니다. 대배기량/디젤은 오일 용량이 많아 2~3만 원 추가됩니다."
      },
      {
        name: "점화플러그 & 이그니션 코일 교환 (4기통 기준)",
        domesticParts: "플러그 3만 / 코일 8만 원",
        importedParts: "플러그 8만 / 코일 22만 원",
        standardLabor: "35,000 ~ 50,000원",
        totalDomestic: "14 ~ 18만 원",
        totalImported: "32 ~ 50만 원",
        tip: "V6 6기통 엔진은 흡기 매니폴드를 뜯어야 하므로 공임이 8~12만 원으로 증가합니다."
      },
      {
        name: "겉벨트 세트 (벨트+텐셔너+아이들러)",
        domesticParts: "70,000 ~ 120,000원",
        importedParts: "180,000 ~ 350,000원",
        standardLabor: "60,000 ~ 90,000원",
        totalDomestic: "15 ~ 22만 원",
        totalImported: "30 ~ 55만 원",
        tip: "워터펌프와 냉각수를 함께 교체할 경우 총 비용은 국산차 기준 28~36만 원 선입니다."
      },
      {
        name: "오토미션 오일 교환 (순환식 16L 기준)",
        domesticParts: "80,000 ~ 120,000원",
        importedParts: "180,000 ~ 320,000원",
        standardLabor: "50,000 ~ 70,000원",
        totalDomestic: "13 ~ 19만 원",
        totalImported: "28 ~ 45만 원",
        tip: "드레인(단순 배출) 방식보다 기계 순환식으로 오일을 전량 세정 교체하는 것을 추천합니다."
      },
      {
        name: "흡기 밸브 카본 클리닝 (GDI/디젤)",
        domesticParts: "가스켓 15,000원",
        importedParts: "가스켓 40,000원",
        standardLabor: "150,000 ~ 250,000원",
        totalDomestic: "18 ~ 28만 원",
        totalImported: "35 ~ 55만 원",
        tip: "직분사 엔진의 흡기 밸브에 쌓인 카본을 호두가루 블라스터로 분사 세척하여 출력과 연비를 되살립니다."
      }
    ]
  },
  {
    category: "제동 및 섀시 (하체)",
    items: [
      {
        name: "전륜 브레이크 패드 교환 (좌우 1세트)",
        domesticParts: "35,000 ~ 55,000원",
        importedParts: "90,000 ~ 180,000원",
        standardLabor: "30,000 ~ 40,000원",
        totalDomestic: "6.5 ~ 9.5만 원",
        totalImported: "13 ~ 24만 원",
        tip: "사제 호환 고성능 패드(하드론, 상신 하이큐 등)를 구매해 가면 성능과 가성비가 뛰어납니다."
      },
      {
        name: "브레이크 디스크 로터 교환 (앞바퀴 2개)",
        domesticParts: "90,000 ~ 150,000원",
        importedParts: "220,000 ~ 450,000원",
        standardLabor: "55,000 ~ 75,000원",
        totalDomestic: "15 ~ 23만 원",
        totalImported: "32 ~ 65만 원",
        tip: "디스크 두께가 규격 한계선 이상 남아있다면 개당 3~5만 원의 '디스크 연마'로도 충분히 해결됩니다."
      },
      {
        name: "브레이크 액 (DOT4 순환식 교환)",
        domesticParts: "15,000 ~ 25,000원",
        importedParts: "30,000 ~ 50,000원",
        standardLabor: "40,000 ~ 55,000원",
        totalDomestic: "6 ~ 8만 원",
        totalImported: "8 ~ 12만 원",
        tip: "4바퀴 캘리퍼 니플에서 모두 기존 잔유를 밀어내며 순환식으로 기포를 완전히 빼야 페달감이 살아납니다."
      },
      {
        name: "스테빌라이저 활대링크 교환 (앞좌우)",
        domesticParts: "25,000 ~ 40,000원",
        importedParts: "60,000 ~ 120,000원",
        standardLabor: "35,000 ~ 50,000원",
        totalDomestic: "6 ~ 9만 원",
        totalImported: "11 ~ 18만 원",
        tip: "방지턱 통과 시 덜그럭 소음의 80%는 이 저렴한 활대링크 교체만으로 잡힙니다."
      },
      {
        name: "전륜 로어암 (좌우 1세트)",
        domesticParts: "110,000 ~ 170,000원",
        importedParts: "250,000 ~ 550,000원",
        standardLabor: "80,000 ~ 120,000원",
        totalDomestic: "20 ~ 29만 원",
        totalImported: "40 ~ 75만 원",
        tip: "로어암 교체 후에는 앞바퀴 정렬이 틀어지므로 '3D 휠 얼라인먼트(5~7만 원)' 작업이 필수입니다."
      }
    ]
  },
  {
    category: "전기 및 편의 장치",
    items: [
      {
        name: "12V 배터리 교환 (일반 납산 80L 기준)",
        domesticParts: "75,000 ~ 95,000원",
        importedParts: "140,000 ~ 220,000원",
        standardLabor: "15,000 ~ 25,000원",
        totalDomestic: "9 ~ 12만 원",
        totalImported: "18 ~ 30만 원",
        tip: "ISG 스톱앤고 장착 차량은 AGM 배터리가 들어가며 부품값이 약 14~18만 원 선입니다."
      },
      {
        name: "발전기 (알터네이터 / 제너레이터) 교체",
        domesticParts: "재생품 12만 / 신품 24만 원",
        importedParts: "재생품 25만 / 신품 60만 원",
        standardLabor: "70,000 ~ 110,000원",
        totalDomestic: "20 ~ 35만 원",
        totalImported: "40 ~ 80만 원",
        tip: "품질 검증된 재제조(재생) 알터네이터를 사용하면 신품 대비 50% 이상 절감 가능합니다."
      },
      {
        name: "에어컨 가스 완충 및 냉매오일 보충",
        domesticParts: "R134a 가스 기준",
        importedParts: "신냉매 1234yf 기준",
        standardLabor: "장비 회수·진공·주입",
        totalDomestic: "5 ~ 7만 원 (신냉매: 18~25만)",
        totalImported: "8 ~ 12만 원 (신냉매: 22~30만)",
        tip: "최신 연식 차량에 적용된 1234yf 친환경 신냉매는 가스 원가가 비싸므로 규격을 먼저 확인하세요."
      }
    ]
  }
];
