// 자동차정비기능사 실기 기록표 항목별 상세 데이터 (PDF 전체 내용 100% 반영)
// 규정값, 단위, 조건, 모범답안, 오답사례, 학생 선택 훈련용 칩(Pill) 데이터

export const RECORD_SHEET_ITEMS = {
  // ===================== [기관 파트] =====================
  injection_nozzle: {
    id: "injection_nozzle",
    category: "기관",
    title: "분사 노즐 압력 및 후적 점검",
    standardVal: "110 ~ 120 kgf/㎠ (또는 120 ~ 130 kgf/㎠)",
    unit: "kgf/㎠",
    hasHujeok: true, // 후적 유무 란 존재
    cases: [
      {
        scenario: "심(Shim) 방식 - 후적 무, 측정값 낮을 때 (예: 105 kgf/㎠)",
        measured: "105 kgf/㎠",
        standard: "110 ~ 120 kgf/㎠",
        hujeok: "무",
        judgment: "불량",
        action: "심 두께를 증가하여 분사 압력을 규정값 내로 조정 후 재점검",
        tip: "압력이 낮을 때는 심 두께를 '증가'시켜 스프링을 더 눌러줘야 압력이 올라갑니다."
      },
      {
        scenario: "심(Shim) 방식 - 후적 무, 측정값 높을 때 (예: 125 kgf/㎠)",
        measured: "125 kgf/㎠",
        standard: "110 ~ 120 kgf/㎠",
        hujeok: "무",
        judgment: "불량",
        action: "심 두께를 감소하여 분사 압력을 규정값 내로 조정 후 재점검",
        tip: "압력이 높을 때는 심 두께를 '감소'시켜 스프링 장력을 줄여줍니다."
      },
      {
        scenario: "압력 정상/불량이나 후적(분사 후 물방울 떨어짐)이 있을 때",
        measured: "115 kgf/㎠",
        standard: "110 ~ 120 kgf/㎠",
        hujeok: "유",
        judgment: "불량",
        action: "분사 노즐 교환 후 재점검",
        tip: "후적이 있으면 무조건 노즐 교환입니다!"
      },
      {
        scenario: "스크류(Screw) 방식 - 후적 무, 압력 불량일 때",
        measured: "105 kgf/㎠",
        standard: "110 ~ 120 kgf/㎠",
        hujeok: "무",
        judgment: "불량",
        action: "조정 스크류로 분사 압력을 규정값 범위 내로 조정 후 재점검",
        tip: "스크류 방식은 심 두께가 아니라 조정 스크류로 압력을 세팅합니다."
      }
    ],
    actionOptions: [
      "심 두께를 증가하여 분사 압력을 규정값 내로 조정 후 재점검",
      "심 두께를 감소하여 분사 압력을 규정값 내로 조정 후 재점검",
      "분사 노즐 교환 후 재점검",
      "조정 스크류로 분사 압력을 규정값 범위 내로 조정 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  valve_spring: {
    id: "valve_spring",
    category: "기관",
    title: "밸브 스프링 장력 및 자유고",
    standardVal: "장력: 23.5 kgf/36mm (또는 25 kgf/38mm), 자유고: 50 mm",
    unit: "kgf/mm, mm",
    cases: [
      {
        scenario: "밸브스프링 장력 불량 (규정값의 15% 이하 초과 감퇴)",
        measured: "19 kgf/36mm",
        standard: "23.5 kgf/36mm",
        judgment: "불량",
        action: "밸브 스프링 교환 후 재점검",
        tip: "판정 기준: 규정값의 15% 이하까지 양호. 23.5 × 0.15 = 3.525kgf이므로 19.975kgf 이상이어야 양호입니다."
      },
      {
        scenario: "밸브스프링 자유고 불량 (규정값의 3% 이하 초과 감퇴)",
        measured: "48 mm",
        standard: "50 mm",
        judgment: "불량",
        action: "밸브 스프링 교환 후 재점검",
        tip: "판정 기준: 규정값의 3% 이하까지 양호. 50mm × 0.03 = 1.5mm이므로 48.5mm 이상이어야 양호입니다."
      }
    ],
    actionOptions: [
      "밸브 스프링 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "심 추가 후 재점검"
    ]
  },

  radiator_cap: {
    id: "radiator_cap",
    category: "기관",
    title: "라디에이터 압력식 캡 개방 압력 점검",
    standardVal: "1.0 kgf/㎠ (10초간 유지될 것)",
    unit: "kgf/㎠",
    cases: [
      {
        scenario: "'10초간 유지될 것' 조건이 있을 때 (압력 미달 또는 압력 저하)",
        measured: "0.8 kgf/㎠ (10초간 유지 못함)",
        standard: "1.0 kgf/㎠ (10초간 유지될 것)",
        judgment: "불량",
        action: "라디에이터 압력식 캡 교환 후 재점검",
        tip: "10초간 유지 조건이 문제에 있으면 규정값과 측정값란 모두 '10초간 유지될 것/유지 못함'을 써야 정답 처리됩니다."
      },
      {
        scenario: "조건 없을 때 측정값 불량",
        measured: "0.8 kgf/㎠",
        standard: "1.0 kgf/㎠",
        judgment: "불량",
        action: "라디에이터 압력식 캡 교환 후 재점검",
        tip: "캡 밸브 스프링 영구 변형 또는 고무 패킹 손상이 원인입니다."
      }
    ],
    actionOptions: [
      "라디에이터 압력식 캡 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "냉각수 보충 후 재점검"
    ]
  },

  cam_height: {
    id: "cam_height",
    category: "기관",
    title: "캠 높이(Cam Height) 측정",
    standardVal: "35.00 ~ 37.00 mm (또는 33.00 ~ 36.00 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "마이크로미터로 측정한 캠 높이가 규정값 미달일 때",
        measured: "34.94 mm",
        standard: "35.00 ~ 37.00 mm",
        judgment: "불량",
        action: "캠축 교환 후 재점검",
        tip: "캠 노즈가 마모되면 밸브 개폐 시기와 양정이 틀어지므로 캠축을 신품 교환해야 합니다."
      }
    ],
    actionOptions: [
      "캠축 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "태핏 간극 조정 후 재점검"
    ]
  },

  crank_runout: {
    id: "crank_runout",
    category: "기관",
    title: "크랭크축 휨(Runout) 측정",
    standardVal: "0.03 mm 이하 (또는 0.04 mm 이하)",
    unit: "mm",
    cases: [
      {
        scenario: "다이얼 게이지 1회전 전체 지침 변위가 규정 초과일 때",
        measured: "0.05 mm",
        standard: "0.04 mm 이하",
        judgment: "불량",
        action: "크랭크축 교환 후 재점검",
        tip: "다이얼 게이지 총 움직임의 1/2이 휨값입니다. 시험장 지침에 따라 총 흔들림 또는 1/2을 기록합니다."
      }
    ],
    actionOptions: [
      "크랭크축 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "저널 연마 후 재점검"
    ]
  },

  crank_journal: {
    id: "crank_journal",
    category: "기관",
    title: "크랭크축 마모량 (저널 외경) 측정",
    standardVal: "57.00 mm (한계값: 0.05 mm) 또는 58.00 mm (0.05 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "마모량이 한계값(0.05mm)을 벗어났으나 언더사이즈 가능한 경우",
        measured: "56.94 mm",
        standard: "57.00 mm (한계값: 0.05 mm)",
        judgment: "불량",
        action: "메인저널 베어링을 언더사이즈로 교환 후 재점검",
        tip: "마모가 기준치(57.00-0.05=56.95)보다 약간 더 마모된 경우 언더사이즈 베어링을 적용합니다."
      },
      {
        scenario: "언더사이즈 한계값조차 완전히 초과 마모된 경우",
        measured: "55.00 mm",
        standard: "57.00 mm (한계값: 0.05 mm)",
        judgment: "불량",
        action: "크랭크축 교환 후 재점검",
        tip: "과도한 마모나 소착 흔적이 있는 경우 크랭크축 어셈블리 교환입니다."
      }
    ],
    actionOptions: [
      "메인저널 베어링을 언더사이즈로 교환 후 재점검",
      "크랭크축 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  head_warpage: {
    id: "head_warpage",
    category: "기관",
    title: "실린더 헤드 변형도 (평면도) 측정",
    standardVal: "0.03 mm 이하 (한계값: 0.1 mm 이하)",
    unit: "mm",
    cases: [
      {
        scenario: "한계값(0.1mm)을 초과하여 심하게 변형된 경우",
        measured: "0.12 mm",
        standard: "0.03 mm 이하 (한계값: 0.1 mm 이하)",
        judgment: "불량",
        action: "실린더 헤드 교환 후 재점검",
        tip: "한계값(0.1mm)을 넘으면 절삭(연마)할 수 없으므로 무조건 헤드 교환입니다."
      },
      {
        scenario: "규정값은 초과했으나 한계값(0.1mm) 이내인 경우",
        measured: "0.06 mm",
        standard: "0.03 mm 이하 (한계값: 0.1 mm 이하)",
        judgment: "불량",
        action: "실린더 헤드 절삭 후 재점검",
        tip: "한계값 이내이면 '절삭(연마) 후 재점검'이 정답입니다."
      },
      {
        scenario: "한계값이 따로 주어지지 않고 규정값(0.03mm 이하)만 주어진 경우",
        measured: "0.05 mm",
        standard: "0.03 mm 이하",
        judgment: "불량",
        action: "실린더 헤드 교환 후 재점검",
        tip: "한계값이 없으면 교환 후 재점검으로 작성합니다."
      }
    ],
    actionOptions: [
      "실린더 헤드 교환 후 재점검",
      "실린더 헤드 절삭 후 재점검",
      "정비 및 조치할 사항 없음",
      "헤드 가스켓만 교환 후 재점검"
    ]
  },

  compression_pressure: {
    id: "compression_pressure",
    category: "기관",
    title: "실린더 압축압력 측정",
    standardVal: "14 ~ 15 kgf/㎠ (또는 13 ~ 15 kgf/㎠)",
    unit: "kgf/㎠",
    cases: [
      {
        scenario: "측정 압력이 규정값보다 비정상적으로 높을 때 (예: 17 kgf/㎠)",
        measured: "17 kgf/㎠",
        standard: "14 ~ 15 kgf/㎠",
        judgment: "불량",
        action: "연소실 카본 제거 후 재점검",
        tip: "연소실 내부에 카본 슬러지가 과도하게 퇴적되면 연소실 체적이 줄어들어 압축압력이 상승합니다."
      },
      {
        scenario: "측정 압력이 규정값보다 낮을 때 (예: 12 kgf/㎠)",
        measured: "12 kgf/㎠",
        standard: "14 ~ 15 kgf/㎠",
        judgment: "불량",
        action: "실린더 내에 엔진오일 1cc 주입 후 재점검 (또는 실린더 헤드 가스켓 교환 후 재점검)",
        tip: "습식 압축압력 테스트(오일 1스푼 주입)를 통해 링 마모인지 밸브 누설인지 감별합니다."
      }
    ],
    actionOptions: [
      "연소실 카본 제거 후 재점검",
      "실린더 내에 엔진오일 1cc 주입 후 재점검",
      "실린더 헤드 가스켓 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  crank_endplay: {
    id: "crank_endplay",
    category: "기관",
    title: "크랭크축 축 방향 유격(엔드플레이) 측정",
    standardVal: "0.05 ~ 0.18 mm (또는 0.04 ~ 0.12 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "다이얼 게이지로 축방향 밀고 당겼을 때 유격 초과",
        measured: "0.22 mm",
        standard: "0.05 ~ 0.18 mm",
        judgment: "불량",
        action: "스러스트 베어링 교환 후 재점검",
        tip: "축 방향 유격을 잡아주는 부품은 '스러스트 베어링(Thrust Bearing)'입니다."
      }
    ],
    actionOptions: [
      "스러스트 베어링 교환 후 재점검",
      "크랭크축 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  main_bearing_clearance: {
    id: "main_bearing_clearance",
    category: "기관",
    title: "크랭크축 메인저널 오일 간극(플라스틱게이지) 측정",
    standardVal: "0.02 ~ 0.06 mm (또는 0.03 ~ 0.07 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "지정된 번호(예: 3번) 메인베어링 오일간극 규정 초과 마모",
        measured: "0.07 mm",
        standard: "0.02 ~ 0.06 mm",
        judgment: "불량",
        action: "3번 메인베어링 교환 후 재점검",
        tip: "기록표에 반드시 지정된 몇 번 메인베어링인지 번호를 적어야 감점이 없습니다!"
      }
    ],
    actionOptions: [
      "3번 메인베어링 교환 후 재점검",
      "크랭크축 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  cam_runout: {
    id: "cam_runout",
    category: "기관",
    title: "캠축 휨(Runout) 측정",
    standardVal: "0.03 mm 이하 (또는 0.04 mm 이하)",
    unit: "mm",
    cases: [
      {
        scenario: "캠축 가운데 저널 휨 측정값 초과",
        measured: "0.04 mm",
        standard: "0.03 mm 이하",
        judgment: "불량",
        action: "캠축 교환 후 재점검",
        tip: "V블록에 양 끝 저널을 올리고 가운데 저널에 다이얼게이지를 대고 측정합니다."
      }
    ],
    actionOptions: [
      "캠축 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  flywheel_runout: {
    id: "flywheel_runout",
    category: "기관",
    title: "플라이휠 런아웃(흔들림) 측정",
    standardVal: "0.03 mm 이하",
    unit: "mm",
    cases: [
      {
        scenario: "플라이휠 마찰면 다이얼게이지 회전 흔들림 규정 초과",
        measured: "0.05 mm",
        standard: "0.03 mm 이하",
        judgment: "불량",
        action: "플라이휠 교환 후 재점검",
        tip: "플라이휠 면 변형은 클러치 채터링 및 진동을 유발하므로 교환합니다."
      }
    ],
    actionOptions: [
      "플라이휠 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "클러치 디스크 교환 후 재점검"
    ]
  },

  glow_plug_resistance: {
    id: "glow_plug_resistance",
    category: "기관",
    title: "예열 플러그 저항 측정",
    standardVal: "2 ~ 3 Ω (또는 4 ~ 5 Ω)",
    unit: "Ω",
    cases: [
      {
        scenario: "단자 간 저항이 규정값을 벗어났을 때 (예: 1 Ω)",
        measured: "1 Ω",
        standard: "2 ~ 3 Ω",
        judgment: "불량",
        action: "예열플러그 교환 후 재점검",
        tip: "저항이 너무 낮으면 과전류가 흐르고, 너무 높으면 발열이 부족합니다."
      },
      {
        scenario: "측정값이 측정되지 않을(무한대 ∞ Ω) 때 - 단선",
        measured: "∞ Ω (무한대)",
        standard: "2 ~ 3 Ω",
        judgment: "불량",
        action: "예열플러그 교환 후 재점검",
        tip: "히터 코일 내부 단선 상태입니다."
      },
      {
        scenario: "측정값이 0 Ω 일 때 - 단락(쇼트)",
        measured: "0 Ω",
        standard: "2 ~ 3 Ω",
        judgment: "불량",
        action: "예열플러그 교환 후 재점검",
        tip: "내부 쇼트(합선) 상태입니다."
      }
    ],
    actionOptions: [
      "예열플러그 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "예열 릴레이 교환 후 재점검"
    ]
  },

  cylinder_clearance: {
    id: "cylinder_clearance",
    category: "기관",
    title: "피스톤과 실린더 간극 측정",
    standardVal: "0.02 ~ 0.05 mm (또는 0.03 ~ 0.06 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "실린더 보어 게이지와 마이크로미터 측정 간극 초과",
        measured: "0.07 mm",
        standard: "0.02 ~ 0.05 mm",
        judgment: "불량",
        action: "실린더 보링, 호닝 후 피스톤 오버사이즈로 교환 후 재점검",
        tip: "간극 과다는 피스톤 슬랩 현상과 오일 소모를 부르므로 실린더 가공(보링/호닝) 및 오버사이즈 피스톤 적용!"
      }
    ],
    actionOptions: [
      "실린더 보링, 호닝 후 피스톤 오버사이즈로 교환 후 재점검",
      "피스톤 링 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  piston_ring_gap: {
    id: "piston_ring_gap",
    category: "기관",
    title: "피스톤 링 이음간극(압축링) 측정",
    standardVal: "0.30 ~ 0.33 mm (또는 0.28 ~ 0.31 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "두께 게이지 측정 간극이 규정보다 클 때",
        measured: "0.35 mm",
        standard: "0.30 ~ 0.33 mm",
        judgment: "불량",
        action: "피스톤 압축링 교환 후 재점검",
        tip: "간극이 크면 압축가스가 블로바이되므로 피스톤 링 신품 교환입니다."
      },
      {
        scenario: "두께 게이지 측정 간극이 규정보다 작을 때",
        measured: "0.28 mm",
        standard: "0.30 ~ 0.33 mm",
        judgment: "불량",
        action: "피스톤 링 엔드 절삭 후 재점검",
        tip: "간극이 좁으면 열팽창 시 링 끝이 맞닿아 실린더 벽을 긁으므로 줄(File)로 링 엔드를 정밀 절삭합니다."
      }
    ],
    actionOptions: [
      "피스톤 압축링 교환 후 재점검",
      "피스톤 링 엔드 절삭 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  engine_scanner: {
    id: "engine_scanner",
    category: "기관",
    title: "자기진단 (TPS, WTS, MAP, AFS, CAS, TDC 등)",
    standardVal: "자기진단기에 표출되는 규정값 범위 (예: TPS 0.4~0.6V)",
    unit: "V, ℃ 등",
    cases: [
      {
        scenario: "커넥터가 의도적으로 탈거되어 있을 때",
        troublePart: "TPS (스로틀 포지션 센서)",
        measured: "5.0 V",
        standard: "0.4 ~ 0.6 V",
        troubleContent: "TPS 커넥터 탈거",
        judgment: "불량",
        action: "TPS 커넥터 연결 후 과거 기억 소거 후 재점검",
        tip: "반드시 '커넥터 연결 후 과거 기억 소거 후 재점검' 세트 문장으로 작성해야 합니다!"
      },
      {
        scenario: "센서 내부 고장(단선/단락)일 때",
        troublePart: "TPS (스로틀 포지션 센서)",
        measured: "5.0 V",
        standard: "0.4 ~ 0.6 V",
        troubleContent: "TPS 단선",
        judgment: "불량",
        action: "TPS 교환 후 과거 기억 소거 후 재점검",
        tip: "센서 교환 후에도 스캐너에서 DTC 과거 기억 소거가 필수입니다."
      },
      {
        scenario: "과거 고장 코드를 소거하지 않았을 때",
        troublePart: "TPS (스로틀 포지션 센서)",
        measured: "0.5 V (정상 전압)",
        standard: "0.4 ~ 0.6 V",
        troubleContent: "과거 기억 미소거",
        judgment: "불량",
        action: "과거 기억 소거 후 재점검",
        tip: "측정값은 정상인데 자기진단기에 과거 고장이 남아있는 트릭 문제입니다."
      }
    ],
    actionOptions: [
      "TPS 커넥터 연결 후 과거 기억 소거 후 재점검",
      "TPS 교환 후 과거 기억 소거 후 재점검",
      "과거 기억 소거 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  // ===================== [섀시 파트] =====================
  wheel_alignment: {
    id: "wheel_alignment",
    category: "섀시",
    title: "휠 얼라인먼트 (캐스터 각, 캠버 각) 점검",
    standardVal: "캐스터: 2 ± 0.5°, 캠버: 0.5 ± 0.5°",
    unit: "° (도)",
    cases: [
      {
        scenario: "맥퍼슨 스트럿 차량에서 캐스터 각이 불량일 때",
        measured: "캐스터: +3°, 캠버: +0.5°",
        standard: "캐스터: 2 ± 0.5°, 캠버: 0.5 ± 0.5°",
        judgment: "불량",
        action: "로우암 교환 후 재점검",
        tip: "일반 승용 맥퍼슨 타입은 캐스터 조정이 불가하므로 하체 변형으로 판단하여 '로우암 교환'을 기재합니다."
      },
      {
        scenario: "캠버 각이 규정값을 벗어났을 때",
        measured: "캐스터: +2°, 캠버: +3°",
        standard: "캐스터: 2 ± 0.5°, 캠버: 0.5 ± 0.5°",
        judgment: "불량",
        action: "캠버 볼트 조정 후 재점검",
        tip: "스트럿 장착 볼트(캠버 볼트) 편심을 돌려 규정 각도로 조정합니다."
      }
    ],
    actionOptions: [
      "로우암 교환 후 재점검",
      "캠버 볼트 조정 후 재점검",
      "타이로드 조정 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  inhibitor_switch: {
    id: "inhibitor_switch",
    category: "섀시",
    title: "인히비터 스위치와 변속 선택 레버 위치 점검",
    standardVal: "규정값 없음 (변속레버 N단 시 인히비터 스위치 N단 일치)",
    unit: "단수",
    cases: [
      {
        scenario: "변속레버 N단인데 인히비터 스위치가 P단에 위치할 때",
        checkPos: "변속 선택 레버: N단",
        status: "변속 선택레버 N단 시 인히비터 스위치 P단에 위치함",
        judgment: "불량",
        action: "변속 케이블 장력 조정 너트로 케이블 장력을 N단으로 조정 후 재점검",
        tip: "규정값 칸에는 '해당 없음' 또는 'N단' 표기. 조치사항에 케이블 장력 조정 너트를 꼭 기재합니다."
      }
    ],
    actionOptions: [
      "변속 케이블 장력 조정 너트로 케이블 장력을 N단으로 조정 후 재점검",
      "인히비터 스위치 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  mt_endplay: {
    id: "mt_endplay",
    category: "섀시",
    title: "수동변속기(M/T) 입력축 엔드 플레이 점검",
    standardVal: "0.03 ~ 0.20 mm (또는 0.03 ~ 0.12 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "측정 유격이 규정값보다 클 때 (예: 0.23 mm)",
        measured: "0.23 mm",
        standard: "0.03 ~ 0.20 mm",
        judgment: "불량",
        action: "규정값 내로 스페이서 삽입 후 재점검",
        tip: "유격이 크면 축 흔들림을 줄이기 위해 스페이서(심)를 '삽입(추가)'합니다."
      },
      {
        scenario: "측정 유격이 규정값보다 작을 때 (예: 0.02 mm)",
        measured: "0.02 mm",
        standard: "0.03 ~ 0.20 mm",
        judgment: "불량",
        action: "규정값 내로 스페이서 제거 후 재점검",
        tip: "유격이 너무 빡빡하면 베어링 손상이 오므로 스페이서를 '제거(감소)'합니다."
      }
    ],
    actionOptions: [
      "규정값 내로 스페이서 삽입 후 재점검",
      "규정값 내로 스페이서 제거 후 재점검",
      "입력축 어셈블리 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  wheel_balance: {
    id: "wheel_balance",
    category: "섀시",
    title: "휠 밸런스(동적/정적) 점검",
    standardVal: "IN: 0g, OUT: 0g (고정 규정값)",
    unit: "g (그램)",
    cases: [
      {
        scenario: "밸런스 측정기 측정값 IN: 15g, OUT: 20g 언밸런스 발생",
        measured: "IN: 15g, OUT: 20g",
        standard: "IN: 0g, OUT: 0g",
        judgment: "불량",
        action: "밸런스 웨이트를 IN에 15g, OUT에 20g 부착 후 재점검",
        tip: "규정값은 항상 0g이며, 조치사항에 측정된 그램수만큼 납(웨이트)을 IN/OUT 각각 부착한다고 씁니다."
      }
    ],
    actionOptions: [
      "밸런스 웨이트를 IN에 15g, OUT에 20g 부착 후 재점검",
      "타이어 신품 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  parking_lever: {
    id: "parking_lever",
    category: "섀시",
    title: "주차 브레이크 레버 클릭 수(노치) 점검",
    standardVal: "7 ~ 8클릭 / 10kgf (또는 6 ~ 8클릭 / 10kgf)",
    unit: "클릭(노치)",
    cases: [
      {
        scenario: "케이블 장력은 정상이지만 슈 마모로 클릭수 과다 (예: 9클릭)",
        measured: "9클릭 / 10kgf",
        standard: "7 ~ 8클릭 / 10kgf",
        judgment: "불량",
        action: "슈 교환 또는 조정 스트럿으로 드럼 유격 조정 후 재점검",
        tip: "라이닝/슈가 닳았을 때는 슈 교환 or 자동조정 스트럿 조정을 기재합니다."
      },
      {
        scenario: "슈는 정상이나 케이블 장력이 헐거워 클릭수 과다 (예: 10클릭)",
        measured: "10클릭 / 10kgf",
        standard: "7 ~ 8클릭 / 10kgf",
        judgment: "불량",
        action: "주차 케이블 장력 조정 너트로 케이블 장력을 규정값 내로 조정 후 재점검",
        tip: "케이블 유격 조정 너트로 규정 노치 수가 나오도록 조여줍니다."
      },
      {
        scenario: "클릭 수가 규정값보다 적을 때 (예: 5클릭)",
        measured: "5클릭 / 10kgf",
        standard: "7 ~ 8클릭 / 10kgf",
        judgment: "불량",
        action: "조정 스트럿으로 드럼 유격을 규정값 내로 조정 후 재점검",
        tip: "드럼 슈 간극이 너무 좁으면 주행 중 브레이크 끌림이 발생합니다."
      }
    ],
    actionOptions: [
      "주차 케이블 장력 조정 너트로 케이블 장력을 규정값 내로 조정 후 재점검",
      "슈 교환 또는 조정 스트럿으로 드럼 유격 조정 후 재점검",
      "조정 스트럿으로 드럼 유격을 규정값 내로 조정 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  brake_disc: {
    id: "brake_disc",
    category: "섀시",
    title: "브레이크 디스크 두께 및 런아웃(흔들림) 측정",
    standardVal: "두께: 20 ~ 22 mm, 흔들림: 0.03 mm 이하",
    unit: "mm",
    cases: [
      {
        scenario: "디스크 두께 마모 한계 초과 또는 흔들림 과다",
        measured: "두께: 25 mm, 흔들림: 0.05 mm",
        standard: "두께: 20 ~ 22 mm, 흔들림: 0.03 mm 이하",
        judgment: "불량",
        action: "브레이크 디스크 교환 후 재점검",
        tip: "런아웃 초과는 브레이크 페달 떨림(저더 현상)의 주원인입니다."
      }
    ],
    actionOptions: [
      "브레이크 디스크 교환 후 재점검",
      "브레이크 패드 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  at_oil_pressure: {
    id: "at_oil_pressure",
    category: "섀시",
    title: "자동변속기(A/T) 라인 오일 압력 점검",
    standardVal: "11 ~ 12 bar (또는 10 ~ 12 kgf/㎠)",
    unit: "bar 또는 kgf/㎠",
    cases: [
      {
        scenario: "유압 게이지 측정 라인 압력 규정 미달 (예: 10 bar)",
        measured: "10 bar",
        standard: "11 ~ 12 bar",
        judgment: "불량",
        action: "밸브 바디 교환 후 재점검",
        tip: "라인 압력 제어 불량은 유압제어 컨트롤 밸브바디 결함입니다."
      }
    ],
    actionOptions: [
      "밸브 바디 교환 후 재점검",
      "변속기 오일 보충 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  atf_level: {
    id: "atf_level",
    category: "섀시",
    title: "자동변속기(A/T) 오일량 및 오일상태 점검",
    standardVal: "규정값 없음 (게이지 HOT 또는 COLD 영역)",
    unit: "게이지 레벨",
    cases: [
      {
        scenario: "열간(웜업) 시 오일 레벨이 HOT 눈금 초과 과다",
        status: "오일 레벨 HOT 상한선 초과",
        judgment: "불량",
        action: "변속기 오일 배출 후 재점검",
        tip: "오일이 너무 많으면 거품(포밍)이 발생해 슬립이 일어납니다."
      },
      {
        scenario: "열간(웜업) 시 오일 레벨이 COLD 아래로 부족",
        status: "오일 레벨 COLD 하한선 미달",
        judgment: "불량",
        action: "변속기 오일 보충 후 재점검",
        tip: "오일이 부족하면 클러치 압착 불량으로 가속이 안 됩니다."
      }
    ],
    actionOptions: [
      "변속기 오일 배출 후 재점검",
      "변속기 오일 보충 후 재점검",
      "변속기 오일 및 오일필터 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  final_gear_backlash: {
    id: "final_gear_backlash",
    category: "섀시",
    title: "종감속 기어 백래시(Backlash) 측정",
    standardVal: "0.03 ~ 0.05 mm (또는 0.02 ~ 0.06 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "다이얼 게이지 측정 백래시가 규정값보다 클 때 (예: 0.06 mm)",
        measured: "0.06 mm",
        standard: "0.03 ~ 0.05 mm",
        judgment: "불량",
        action: "조절나사로 링기어를 안으로 밀어 백래시를 규정값 내로 조정 후 재점검",
        tip: "백래시가 크면(치합이 헐거움) 링기어를 피니언 기어 안쪽으로 밀착시켜야 합니다."
      },
      {
        scenario: "측정 백래시가 규정값보다 작을 때 (예: 0.02 mm)",
        measured: "0.02 mm",
        standard: "0.03 ~ 0.05 mm",
        judgment: "불량",
        action: "조절나사로 링기어를 밖으로 밀어 백래시를 규정값 내로 조정 후 재점검",
        tip: "백래시가 작으면(치합이 너무 빡빡함) 링기어를 바깥쪽으로 벌려줍니다."
      }
    ],
    actionOptions: [
      "조절나사로 링기어를 안으로 밀어 백래시를 규정값 내로 조정 후 재점검",
      "조절나사로 링기어를 밖으로 밀어 백래시를 규정값 내로 조정 후 재점검",
      "차동기어 어셈블리 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  brake_pedal: {
    id: "brake_pedal",
    category: "섀시",
    title: "브레이크 페달 유격 및 작동거리 점검",
    standardVal: "작동거리: 16 ~ 22 mm, 페달유격: 4 ~ 7 mm",
    unit: "mm",
    cases: [
      {
        scenario: "페달 유격이 규정 초과로 헐거울 때 (예: 8 mm)",
        measured: "작동거리: 17 mm, 페달유격: 8 mm",
        standard: "작동거리: 16 ~ 22 mm, 페달유격: 4 ~ 7 mm",
        judgment: "불량",
        action: "푸시로드 길이를 규정값 내로 조정 후 재점검",
        tip: "마스터실린더 푸시로드의 로크너트를 풀고 회전시켜 유격을 맞춥니다."
      }
    ],
    actionOptions: [
      "푸시로드 길이를 규정값 내로 조정 후 재점검",
      "브레이크 마스터 실린더 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  wheel_toe: {
    id: "wheel_toe",
    category: "섀시",
    title: "앞바퀴 토우(Toe-in) 점검 및 측정",
    standardVal: "IN 3 mm (또는 IN 3.6 mm)",
    unit: "mm",
    cases: [
      {
        scenario: "트래멀 게이지 측정 토우인 과다 (예: IN 5 mm)",
        measured: "IN 5 mm",
        standard: "IN 3 mm",
        judgment: "불량",
        action: "타이로드로 토우를 규정값 내로 조정 후 재점검",
        tip: "좌우 타이로드를 같은 회전수로 돌려 토우를 규정치로 맞춥니다."
      }
    ],
    actionOptions: [
      "타이로드로 토우를 규정값 내로 조정 후 재점검",
      "타이로드 엔드 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  clutch_pedal: {
    id: "clutch_pedal",
    category: "섀시",
    title: "클러치 페달 유격 점검",
    standardVal: "4 ~ 7 mm (또는 5 ~ 8 mm 이하)",
    unit: "mm",
    cases: [
      {
        scenario: "페달을 손으로 살짝 눌렀을 때 저항이 느껴질 때까지의 유격 초과",
        measured: "9 mm",
        standard: "4 ~ 7 mm",
        judgment: "불량",
        action: "푸시로드 길이를 규정값 내로 조정 후 재점검",
        tip: "클러치 마스터실린더 푸시로드 조절너트로 유격을 조정합니다."
      }
    ],
    actionOptions: [
      "푸시로드 길이를 규정값 내로 조정 후 재점검",
      "클러치 릴리스 실린더 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  tone_wheel_gap: {
    id: "tone_wheel_gap",
    category: "섀시",
    title: "ABS 톤 휠(센서 로터) 간극 측정",
    standardVal: "1.2 ~ 1.4 mm",
    unit: "mm",
    cases: [
      {
        scenario: "앞축 좌/우 톤 휠 갭이 규정값을 벗어났을 때",
        measured: "앞축 좌: 2.0 mm, 우: 1.0 mm",
        standard: "1.2 ~ 1.4 mm",
        judgment: "불량",
        action: "톤 휠 교환 후 재점검",
        tip: "톤 휠 변형 또는 이물질 침착으로 간극이 맞지 않으면 휠 스피드 센서 오류가 발생합니다."
      }
    ],
    actionOptions: [
      "톤 휠 교환 후 재점검",
      "휠 스피드 센서 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  // ===================== [전기 파트] =====================
  cranking_current: {
    id: "cranking_current",
    category: "전기",
    title: "기동 시 소모 전류 측정",
    standardVal: "배터리 용량(Ah)의 3배 이하 (예: 80Ah인 경우 240A 이하)",
    unit: "A (암페어)",
    cases: [
      {
        scenario: "배터리 12V 80Ah 기준 소모전류 과다 (예: 245A)",
        measured: "245 A",
        standard: "240 A 이하 (80Ah × 3)",
        judgment: "불량",
        action: "기동전동기 교환 후 재점검",
        tip: "전류가 많이 먹는다는 것은 기동모터 내부 브러시 마모, 전기자 코일 쇼트, 혹은 기계적 고착을 의미합니다."
      }
    ],
    actionOptions: [
      "기동전동기 교환 후 재점검",
      "축전지 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  ignition_coil: {
    id: "ignition_coil",
    category: "전기",
    title: "점화코일 1차, 2차 저항 측정",
    standardVal: "1차 저항: 16 ~ 17 Ω, 2차 저항: 20 ~ 21 kΩ (또는 1차 14~15Ω, 2차 21~22kΩ)",
    unit: "Ω, kΩ",
    cases: [
      {
        scenario: "멀티미터 측정 1차 또는 2차 저항 규정 이탈",
        measured: "1차: 15 Ω, 2차: 18.7 kΩ",
        standard: "1차: 16 ~ 17 Ω, 2차: 20 ~ 21 kΩ",
        judgment: "불량",
        action: "점화코일 교환 후 재점검",
        tip: "2차 저항은 단위가 'kΩ(킬로옴)'임에 각별히 유의해야 합니다!"
      }
    ],
    actionOptions: [
      "점화코일 교환 후 재점검",
      "점화플러그 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  alternator_output: {
    id: "alternator_output",
    category: "전기",
    title: "발전기 충전 전류 및 충전 전압 측정",
    standardVal: "충전전압: 14 ~ 16 V (또는 14.4 ~ 16.6 V)",
    unit: "V, A",
    cases: [
      {
        scenario: "공회전/부하 시 충전 전압 규정 미달 (예: 13V)",
        measured: "충전전류: 50A, 충전전압: 13 V",
        standard: "충전전압: 14 ~ 16 V",
        judgment: "불량",
        action: "발전기 교환 후 재점검",
        tip: "전압 레귤레이터 또는 다이오드 결함으로 충전전압이 미달되므로 발전기 교환입니다."
      }
    ],
    actionOptions: [
      "발전기 교환 후 재점검",
      "팬벨트 장력 조정 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  main_relay: {
    id: "main_relay",
    category: "전기",
    title: "메인 컨트롤 릴레이 점검",
    standardVal: "규정값 없음 (여자 시 도통 / 비여자 시 단절)",
    unit: "도통 상태",
    cases: [
      {
        scenario: "코일 여자 시(전원 인가) 불량",
        status: "코일 여자 시 불량 (비도통), 비여자 시 양호",
        judgment: "불량",
        action: "메인 컨트롤 릴레이 교환 후 재점검",
        tip: "전자석 코일에 전기를 넣었을 때 스위치 접점이 제대로 붙어야 양호입니다."
      }
    ],
    actionOptions: [
      "메인 컨트롤 릴레이 교환 후 재점검",
      "정비 및 조치할 사항 없음",
      "퓨즈 교환 후 재점검"
    ]
  },

  isc_duty: {
    id: "isc_duty",
    category: "전기",
    title: "ISC 밸브 듀티값(Duty Cycle) 측정",
    standardVal: "3 ~ 4 % (또는 4 ~ 5 %)",
    unit: "%",
    cases: [
      {
        scenario: "스캐너/오실로스코프 측정 듀티율 규정 초과 (예: 8%)",
        measured: "8 %",
        standard: "3 ~ 4 %",
        judgment: "불량",
        action: "ISC 밸브 교환 후 재점검",
        tip: "공회전 조절 밸브가 카본으로 고착되어 ECU가 듀티를 과도하게 열고 있는 상태입니다."
      }
    ],
    actionOptions: [
      "ISC 밸브 교환 후 재점검",
      "스로틀 보디 청소 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  battery_test: {
    id: "battery_test",
    category: "전기",
    title: "축전지 비중 및 무부하 단자전압 측정",
    standardVal: "비중: 1.260 ~ 1.280, 전압: 12.6 V 이상",
    unit: "비중, V",
    cases: [
      {
        scenario: "비중 1.090, 전압 11.92V (충전 가능 상태)",
        measured: "비중: 1.090, 전압: 11.92 V",
        standard: "비중: 1.260 ~ 1.280, 전압: 12.6 V 이상",
        judgment: "불량",
        action: "축전지 충전 후 재점검",
        tip: "비중이 1.080 초과이고 전압이 10.5V 초과이면 '충전 후 재점검'이 정답입니다!"
      },
      {
        scenario: "비중 1.060, 전압 10.3V (완전 방전/극판 손상으로 충전 불가)",
        measured: "비중: 1.060, 전압: 10.3 V",
        standard: "비중: 1.260 ~ 1.280, 전압: 12.6 V 이상",
        judgment: "불량",
        action: "축전지 교환 후 재점검",
        tip: "비중이 1.060~1.080 이하이거나 전압이 10.5V 이하이면 충전 불능으로 '교환'입니다!"
      }
    ],
    actionOptions: [
      "축전지 충전 후 재점검",
      "축전지 교환 후 재점검",
      "증류수 보충 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  ac_pressure: {
    id: "ac_pressure",
    category: "전기",
    title: "에어컨 고압/저압 라인 압력 점검",
    standardVal: "저압: 4 ~ 5 kgf/㎠, 고압: 13 ~ 14 kgf/㎠",
    unit: "kgf/㎠",
    cases: [
      {
        scenario: "저압, 고압 모두 규정값보다 낮을 때 (냉매 부족)",
        measured: "저압: 2 kgf/㎠, 고압: 12 kgf/㎠",
        standard: "저압: 4 ~ 5 kgf/㎠, 고압: 13 ~ 14 kgf/㎠",
        judgment: "불량",
        action: "규정값 내로 냉매 주입 후 재점검",
        tip: "가스가 새어나가 시스템 전체 압력이 낮은 상태입니다."
      },
      {
        scenario: "저압, 고압 모두 규정값보다 높을 때 (냉매 과충전)",
        measured: "저압: 7 kgf/㎠, 고압: 17 kgf/㎠",
        standard: "저압: 4 ~ 5 kgf/㎠, 고압: 13 ~ 14 kgf/㎠",
        judgment: "불량",
        action: "규정값 내로 냉매 배출 후 재점검",
        tip: "냉매가 너무 많이 들어가 컴프레셔에 무리가 가는 상태입니다."
      },
      {
        scenario: "저압은 높고, 고압은 낮을 때 (컴프레셔 압축 불량)",
        measured: "저압: 7 kgf/㎠, 고압: 10 kgf/㎠",
        standard: "저압: 4 ~ 5 kgf/㎠, 고압: 13 ~ 14 kgf/㎠",
        judgment: "불량",
        action: "에어컨 컴프레셔 교환 후 냉매를 규정값 내로 주입 후 재점검",
        tip: "컴프레셔 밸브가 파손되어 고압과 저압이 새는 상태입니다."
      },
      {
        scenario: "저압은 낮고, 고압은 높을 때 (배관 라인 막힘)",
        measured: "저압: 2 kgf/㎠, 고압: 18 kgf/㎠",
        standard: "저압: 4 ~ 5 kgf/㎠, 고압: 13 ~ 14 kgf/㎠",
        judgment: "불량",
        action: "리시버 드라이어 교환 후 냉매를 규정값 내로 주입 후 재점검",
        tip: "리시버 드라이어나 팽창밸브가 이물질로 막힌 상태입니다."
      }
    ],
    actionOptions: [
      "규정값 내로 냉매 주입 후 재점검",
      "규정값 내로 냉매 배출 후 재점검",
      "에어컨 컴프레셔 교환 후 냉매를 규정값 내로 주입 후 재점검",
      "리시버 드라이어 교환 후 냉매를 규정값 내로 주입 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  injector_resistance: {
    id: "injector_resistance",
    category: "전기",
    title: "인젝터 코일 저항 측정",
    standardVal: "2 ~ 3 Ω (또는 3 ~ 4 Ω)",
    unit: "Ω",
    cases: [
      {
        scenario: "인젝터 솔레노이드 코일 저항 규정 초과 (예: 4 Ω)",
        measured: "4 Ω",
        standard: "2 ~ 3 Ω",
        judgment: "불량",
        action: "인젝터 교환 후 재점검",
        tip: "인젝터 코일 단선 또는 열화로 분사 응답성이 저하됩니다."
      }
    ],
    actionOptions: [
      "인젝터 교환 후 재점검",
      "인젝터 커넥터 세척 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  cranking_voltage_drop: {
    id: "cranking_voltage_drop",
    category: "전기",
    title: "크랭킹 시 전압 강하 측정",
    standardVal: "배터리 전압(V)의 80% 이상 (예: 12V 기준 9.6V 이상)",
    unit: "V",
    cases: [
      {
        scenario: "12V 80Ah 배터리 크랭킹 시 전압 9.4V 측정 (규정 9.6V 미달)",
        measured: "9.4 V",
        standard: "9.6 V 이상 (12V의 80%)",
        judgment: "불량",
        action: "기동전동기 교환 후 재점검",
        tip: "스타터 모터 내부 저항이나 기계적 부하로 전압이 비정상적으로 급락한 상태입니다."
      }
    ],
    actionOptions: [
      "기동전동기 교환 후 재점검",
      "축전지 충전 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  step_motor_resistance: {
    id: "step_motor_resistance",
    category: "전기",
    title: "스텝 모터 (공회전 조절 서보) 코일 저항 측정",
    standardVal: "2 ~ 3 Ω",
    unit: "Ω",
    cases: [
      {
        scenario: "각 단자별 코일 저항 측정값 규정 초과 (예: 4 Ω)",
        measured: "4 Ω",
        standard: "2 ~ 3 Ω",
        judgment: "불량",
        action: "스텝 모터 교환 후 재점검",
        tip: "코일 소손으로 스텝 모터가 올바르게 스텝 이동을 하지 못합니다."
      }
    ],
    actionOptions: [
      "스텝 모터 교환 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  },

  circuit_trouble: {
    id: "circuit_trouble",
    category: "전기",
    title: "전장 회로 점검 및 수리 (전조등, 와이퍼, 방향지시등, 제동등 등)",
    standardVal: "규정값 없음 (정비 지침서 및 전장 회로도 명칭 준수)",
    unit: "부품 명칭",
    cases: [
      {
        scenario: "퓨즈 또는 릴레이 단선일 때",
        troublePart: "좌측 전조등",
        troubleContent: "엔진룸 정션박스 내의 좌측 전조등 10A 퓨즈(릴레이) 단선",
        judgment: "불량",
        action: "엔진룸 정션박스 내의 좌측 전조등 10A 퓨즈(릴레이) 교환 후 재점검",
        tip: "위치('엔진룸 정션박스 내')와 정격 용량('10A')을 정확히 써야 만점입니다!"
      },
      {
        scenario: "퓨즈 또는 릴레이가 탈거되어 있을 때",
        troublePart: "좌측 전조등",
        troubleContent: "엔진룸 정션박스 내의 좌측 전조등 10A 퓨즈(릴레이) 탈거",
        judgment: "불량",
        action: "엔진룸 정션박스 내의 좌측 전조등 10A 퓨즈(릴레이) 부착 후 재점검",
        tip: "탈거되어 있는 것은 '교환'이 아니라 '부착(장착)' 후 재점검입니다."
      },
      {
        scenario: "커넥터가 빠져(탈거) 있을 때",
        troublePart: "좌측 전조등",
        troubleContent: "좌측 전조등 커넥터 탈거",
        judgment: "불량",
        action: "좌측 전조등 커넥터 부착 후 재점검",
        tip: "커넥터 부착(연결) 후 재점검으로 작성합니다."
      }
    ],
    actionOptions: [
      "엔진룸 정션박스 내의 좌측 전조등 10A 퓨즈(릴레이) 교환 후 재점검",
      "엔진룸 정션박스 내의 좌측 전조등 10A 퓨즈(릴레이) 부착 후 재점검",
      "좌측 전조등 커넥터 부착 후 재점검",
      "정비 및 조치할 사항 없음"
    ]
  }
};
