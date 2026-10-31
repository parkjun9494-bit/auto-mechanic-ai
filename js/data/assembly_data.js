// 자동차정비기능사 실기 탈거/조립/부착 과제별 상세 공정 및 실습 체크리스트 가이드
// 실습 순서: 준비 ➔ 분해(탈거) ➔ 🚨[감독관 대면 확인] ➔ 조립(부착) ➔ 작동 확인

export const ASSEMBLY_GUIDES = {
  // ===================== [기관 탈부착] =====================
  diesel_head: {
    title: "디젤 실린더 헤드 / 분사 노즐 탈거 및 조립",
    category: "기관",
    tools: ["10/12/14/17mm 소켓 및 라쳇", "토크 렌치", "스핀들 핸들", "분사노즐 소켓", "자석봉"],
    safety: ["고온 시 화상 주의 (실습 엔진 냉각 상태 확인)", "분사 노즐 팁 손상 방지용 보호 캡 사용", "보호안경 및 면장갑 착용"],
    steps: [
      { step: 1, type: "disassembly", desc: "엔진 커버 및 흡·배기 매니폴드 연결 볼트 탈거 (필요 시)" },
      { step: 2, type: "disassembly", desc: "고압 파이프 17mm 플레어 너트 양쪽을 조심스럽게 풀고 탈거 (노즐 오염 방지)" },
      { step: 3, type: "disassembly", desc: "연료 리턴 파이프 분리 및 분사노즐 홀더 볼트(또는 너트) 탈거" },
      { step: 4, type: "disassembly", desc: "전용 소켓 또는 풀러를 사용하여 분사노즐을 수직으로 조심스럽게 탈거" },
      { step: 5, type: "disassembly", desc: "로커암 커버(실린더 헤드 커버) 볼트를 바깥쪽에서 안쪽으로 대각선 순서로 탈거" },
      { step: 6, type: "disassembly", desc: "타이밍 벨트/체인 텐셔너 이완 및 캠축 스프로킷 마킹 확인 후 분리" },
      { step: 7, type: "disassembly", desc: "실린더 헤드 볼트를 바깥쪽에서 안쪽으로(2~3회에 걸쳐 대각선으로) 균일하게 풀고 탈거" },
      { step: 8, type: "disassembly", desc: "실린더 헤드를 수직으로 들어 올려 작업대에 안착 (가스켓 접촉면 손상 금지)" },
      { step: 9, type: "inspect_point", desc: "🚨 [시험위원 확인] 실린더 헤드 및 분사노즐 탈거 상태를 시험위원에게 보고하고 확인 도장을 받습니다. (확인 없이 조립 시 실격!)" },
      { step: 10, type: "assembly", desc: "실린더 블록 상면 이물질 제거 후 신품 실린더 헤드 가스켓 방향(TOP 마크) 확인 안착" },
      { step: 11, type: "assembly", desc: "실린더 헤드를 가이드 핀에 맞춰 수직으로 안착" },
      { step: 12, type: "assembly", desc: "헤드 볼트에 엔진오일을 살짝 도포 후 안쪽에서 바깥쪽으로 규정 토크(약 6.5~7.5 kgf·m + 각도조임)로 2~3회 분할 체결" },
      { step: 13, type: "assembly", desc: "타이밍 마크 일치 확인 후 캠축 스프로킷 및 벨트/체인 장착 및 텐셔너 체결" },
      { step: 14, type: "assembly", desc: "로커암 커버 가스켓 정위치 확인 후 규정 토크(약 0.8~1.0 kgf·m)로 균일 체결" },
      { step: 15, type: "assembly", desc: "동와셔(Copper Washer) 신품 장착 후 분사노즐 안착 및 규정 토크(약 6.0~7.0 kgf·m) 체결" },
      { step: 16, type: "assembly", desc: "고압 파이프 및 리턴 파이프 연결 볼트 체결 후 누유 여부 점검 준비" }
    ],
    tips: "실린더 헤드 볼트는 '풀 때는 밖에서 안으로', '조일 때는 안에서 밖으로' 나선형/대각선 순서를 반드시 엄수해야 헤드 변형 감점을 방지할 수 있습니다."
  },

  gasoline_head: {
    title: "가솔린 실린더 헤드 / 밸브스프링 탈거 및 조립",
    category: "기관",
    tools: ["10/12/14mm 소켓", "밸브스프링 압축기(컴프레서)", "자석봉", "토크 렌치"],
    safety: ["밸브 코터 핀이 튈 수 있으므로 반드시 보안경 착용", "밸브 스템 끝단 손상 방지"],
    steps: [
      { step: 1, type: "disassembly", desc: "로커암 커버 탈거 및 점화플러그 케이블/코일 분리" },
      { step: 2, type: "disassembly", desc: "타이밍 벨트 장력 해제 및 캠축 베어링 캡(안쪽부터 바깥쪽으로) 탈거" },
      { step: 3, type: "disassembly", desc: "캠축 탈거 후 실린더 헤드 볼트(바깥쪽에서 안쪽으로) 균일하게 풀기" },
      { step: 4, type: "disassembly", desc: "실린더 헤드 탈거 후 작업대에 거치" },
      { step: 5, type: "disassembly", desc: "지정된 실린더의 밸브스프링 압축기를 설치하고 레버를 눌러 스프링 압축" },
      { step: 6, type: "disassembly", desc: "자석봉으로 밸브 코터 핀(2개)을 안전하게 수거" },
      { step: 7, type: "disassembly", desc: "압축기 서서히 풀고 밸브 리테이너, 스프링, 밸브 분리" },
      { step: 8, type: "inspect_point", desc: "🚨 [시험위원 확인] 밸브 스프링 및 실린더 헤드 탈거 상태 확인 요청" },
      { step: 9, type: "assembly", desc: "밸브 스템에 엔진오일 도포 후 헤드 가이드에 삽입" },
      { step: 10, type: "assembly", desc: "밸브 스프링(피치가 좁은 쪽이 헤드 바닥 쪽) 및 리테이너 안착" },
      { step: 11, type: "assembly", desc: "압축기로 스프링 누른 후 그리스를 살짝 묻힌 코터 핀 2개를 밸브 홈에 정확히 안착" },
      { step: 12, type: "assembly", desc: "압축기 해제 후 고무 망치로 밸브 상단을 가볍게 톡톡 쳐서 코터 안착 확인" },
      { step: 13, type: "assembly", desc: "헤드 가스켓 정위치 안착 후 안쪽에서 바깥쪽으로 규정 토크 체결" },
      { step: 14, type: "assembly", desc: "캠축 베어링 캡 화살표 방향 및 번호 순서대로 체결 (약 1.2~1.5 kgf·m)" }
    ],
    tips: "밸브 스프링 조립 시 '부등 피치 스프링'의 경우 피치가 좁은 쪽(도색된 쪽)이 실린더 헤드 바닥면을 향하도록 조립하는 것이 채점 포인트입니다."
  },

  timing_belt: {
    title: "타이밍 벨트 / 캠축 탈거 및 조립",
    category: "기관",
    tools: ["10/12/14/19mm 소켓", "크랭크축 풀리 렌치", "텐셔너 고정 핀", "토크 렌치"],
    safety: ["밸브와 피스톤 간섭 방지를 위해 크랭크축 임의 회전 금지"],
    steps: [
      { step: 1, type: "disassembly", desc: "크랭크축 댐퍼 풀리 볼트 탈거 및 타이밍 벨트 상/하부 플라스틱 커버 분리" },
      { step: 2, type: "disassembly", desc: "크랭크축을 시계 방향으로 회전시켜 1번 실린더 압축 상사점(TDC) 타이밍 마크 정렬" },
      { step: 3, type: "disassembly", desc: "타이밍 텐셔너 볼트를 풀고 장력을 해제한 뒤 고정 핀 삽입" },
      { step: 4, type: "disassembly", desc: "타이밍 벨트 조심스럽게 탈거 (재사용 시 회전방향 화살표 분필 마킹)" },
      { step: 5, type: "disassembly", desc: "캠축 스프로킷 볼트 탈거 후 캠축 베어링 캡(바깥쪽에서 안쪽으로) 풀기" },
      { step: 6, type: "disassembly", desc: "캠축을 조심스럽게 수평으로 들어 올려 탈거" },
      { step: 7, type: "inspect_point", desc: "🚨 [시험위원 확인] 타이밍 벨트 및 캠축 탈거 상태 대면 확인" },
      { step: 8, type: "assembly", desc: "캠축 저널부에 엔진오일 도포 후 베어링 캡 번호/방향 맞추어 안쪽부터 조임" },
      { step: 9, type: "assembly", desc: "캠축 오일씰 정위치 삽입 및 캠 스프로킷 규정 토크(약 8.0~10.0 kgf·m) 체결" },
      { step: 10, type: "assembly", desc: "크랭크 스프로킷과 캠 스프로킷 타이밍 마크를 엔진 블록/헤드 기준선에 정렬" },
      { step: 11, type: "assembly", desc: "크랭크축 ➔ 워터펌프 ➔ 캠축 ➔ 텐셔너 풀리 순서로 벨트의 인장측이 팽팽하도록 장착" },
      { step: 12, type: "assembly", desc: "텐셔너 핀 제거 후 크랭크축을 시계방향으로 2바퀴 정회전시켜 타이밍 마크 재일치 확인" },
      { step: 13, type: "assembly", desc: "타이밍 커버 및 크랭크 댐퍼 풀리 장착 후 규정 토크 체결" }
    ],
    tips: "타이밍 벨트를 걸 때는 크랭크에서 캠축까지의 인장측(당겨지는 쪽)에 유격이 없도록 팽팽하게 걸어야 타이밍 1코 이탈을 방지할 수 있습니다."
  },

  crankshaft: {
    title: "크랭크축 및 메인베어링 탈거 및 조립",
    category: "기관",
    tools: ["10/12/14/17mm 소켓", "토크 렌치", "플라스틱 망치", "자석봉"],
    safety: ["저널 마찰면 스크래치 절대 주의", "커넥팅 로드 피스톤 낙하 주의"],
    steps: [
      { step: 1, type: "disassembly", desc: "엔진 오일 팬 및 오일 스트레이너 탈거" },
      { step: 2, type: "disassembly", desc: "커넥팅 로드 캡 볼트를 풀고 캡과 베어링 탈거 (실린더 번호 확인 마킹)" },
      { step: 3, type: "disassembly", desc: "플라이휠 및 리어 오일씰 리테이너 분리" },
      { step: 4, type: "disassembly", desc: "크랭크축 메인베어링 캡 볼트를 바깥쪽에서 안쪽으로 균일하게 풀기" },
      { step: 5, type: "disassembly", desc: "메인베어링 캡과 스러스트 베어링을 조심스럽게 탈거" },
      { step: 6, type: "disassembly", desc: "크랭크축을 수평으로 들어 올려 스탠드 또는 안전한 작업대에 거치" },
      { step: 7, type: "inspect_point", desc: "🚨 [시험위원 확인] 크랭크축 및 메인베어링 탈거 완료 후 확인 요청" },
      { step: 8, type: "assembly", desc: "실린더 블록 메인 저널 홈 청소 후 상부 메인베어링(오일 홀 일치) 장착" },
      { step: 9, type: "assembly", desc: "중앙 저널에 스러스트 베어링(오일 홈이 바깥쪽을 향하도록) 장착" },
      { step: 10, type: "assembly", desc: "크랭크축 저널에 엔진오일 도포 후 수평으로 블록에 안착" },
      { step: 11, type: "assembly", desc: "하부 메인베어링을 캡에 장착하고 화살표가 전방(엔진 앞)을 향하도록 번호 순 안착" },
      { step: 12, type: "assembly", desc: "안쪽에서 바깥쪽으로 규정 토크(약 7.5~8.5 kgf·m)로 2~3회 분할 체결" },
      { step: 13, type: "assembly", desc: "크랭크축을 손으로 돌려 걸림 없이 부드럽게 회전하는지 확인" }
    ],
    tips: "메인 베어링 캡은 반드시 주물에 각인된 번호(1~5번)와 방향 화살표(앞쪽 지향)를 지켜야 하며, 스러스트 베어링의 오일 홈이 크랭크 암을 향해야 합니다."
  },

  engine_sensors: {
    title: "기관 센서/액추에이터류 (공전속도 조절장치, 인젝터, AFS, 스로틀바디 등)",
    category: "기관",
    tools: ["10/12mm 스패너/소켓", "일자/십자 드라이버", "라디오 펜치"],
    safety: ["전원 OFF (키 OFF 확인)", "연료 라인 잔압 방출 후 소화기 비치"],
    steps: [
      { step: 1, type: "disassembly", desc: "배터리 (-) 단자 분리 상태 확인" },
      { step: 2, type: "disassembly", desc: "대상 센서/부품의 전기 커넥터 락(Lock) 클립을 누르고 분리" },
      { step: 3, type: "disassembly", desc: "연결 호스(진공, 연료, 냉각수) 클램프 해제 및 조심스럽게 탈착" },
      { step: 4, type: "disassembly", desc: "고정 볼트(10mm 또는 12mm) 대각선 순서로 탈거 후 부품 분리" },
      { step: 5, type: "inspect_point", desc: "🚨 [시험위원 확인] 부품 탈거 완료 후 감독관 대면 확인" },
      { step: 6, type: "assembly", desc: "가스켓 또는 O링 상태 점검(신품 교환 또는 오일 살짝 도포) 후 정위치 안착" },
      { step: 7, type: "assembly", desc: "고정 볼트 균일 체결 (오버토크 금지)" },
      { step: 8, type: "assembly", desc: "연결 호스 클램프 체결 및 전기 커넥터 '딸깍' 소리 나도록 확실히 체결" }
    ],
    tips: "인젝터나 스로틀보디 조립 시 O링이 씹히지 않도록 엔진오일이나 실리콘 그리스를 얇게 도포한 후 수직으로 밀어 넣습니다."
  },

  // ===================== [섀시 탈부착] =====================
  strut_absorber: {
    title: "앞 쇽업소버 및 코일 스프링 탈거 및 조립",
    category: "섀시",
    tools: ["12/14/17/19mm 소켓 및 임팩/라쳇", "스프링 압축기(컴프레서)", "토크 렌치"],
    safety: ["스프링 압축기 체결 시 후크가 미끄러지지 않도록 반드시 대칭 체결", "스프링 상단 인슐레이터 너트 임의 탈거 금지"],
    steps: [
      { step: 1, type: "disassembly", desc: "브레이크 호스 및 ABS 휠 스피드 센서 배선 고정 브래킷 볼트 분리" },
      { step: 2, type: "disassembly", desc: "하부 너클 연결 볼트/너트(17/19mm) 2개를 풀고 분리" },
      { step: 3, type: "disassembly", desc: "엔진룸 후드를 열고 스트럿 마운트 상부 너트 3개를 풀기 (중앙 너트 풀지 말 것!)" },
      { step: 4, type: "disassembly", desc: "쇽업소버 어셈블리를 차체에서 분리하여 작업대 바이스에 고정" },
      { step: 5, type: "disassembly", desc: "스프링 컴프레서를 양쪽에 180도 대칭으로 걸고 양쪽을 번갈아 균일하게 압축" },
      { step: 6, type: "disassembly", desc: "스프링이 유격으로 덜렁거릴 때 중앙 피스톤 로드 너트 풀고 인슐레이터, 스프링 시트, 스프링 분리" },
      { step: 7, type: "inspect_point", desc: "🚨 [시험위원 확인] 쇽업소버 스프링 분해 상태 확인 요청" },
      { step: 8, type: "assembly", desc: "스프링 하단 끝단을 쇼바 하부 스프링 시트 단턱 홈에 정확히 맞춤" },
      { step: 9, type: "assembly", desc: "상부 인슐레이터 및 와셔 안착 후 중앙 로드 너트 임시 체결 후 규정 토크 체결" },
      { step: 10, type: "assembly", desc: "스프링 컴프레서를 양쪽 균등하게 서서히 풀어 스프링 시트에 안착" },
      { step: 11, type: "assembly", desc: "차체에 스트럿 삽입 후 상부 마운트 너트 3개 체결 (약 4.5~6.0 kgf·m)" },
      { step: 12, type: "assembly", desc: "하부 너클 볼트/너트 관통 체결 (약 10.0~12.0 kgf·m) 및 브레이크 호스 브래킷 고정" }
    ],
    tips: "스프링이 압축되지 않은 상태에서 중앙 로드 너트를 풀면 스프링이 튀어나와 대형 안전사고가 발생하므로 즉시 실격 사유가 됩니다!"
  },

  brake_pad_caliper: {
    title: "브레이크 패드 / 캘리퍼 탈거·조립 및 공기빼기",
    category: "섀시",
    tools: ["14/17mm 스패너/소켓", "피스톤 리셋 툴", "브레이크 블리딩 호스 및 투명 용기", "DOT4 브레이크액"],
    safety: ["브레이크액이 차체 도장면에 묻지 않도록 주의", "패드 마찰재 표면에 기름/그리스 오염 금지"],
    steps: [
      { step: 1, type: "disassembly", desc: "캘리퍼 슬라이딩 가이드 핀 하부 볼트(14mm) 탈거" },
      { step: 2, type: "disassembly", desc: "캘리퍼 바디를 위로 들어 올려 서스펜션 스프링에 철사로 걸어두기 (호스 꺾임 방지)" },
      { step: 3, type: "disassembly", desc: "내측 및 외측 브레이크 패드, 심(Shim), 패드 리테이너 스프링 탈거" },
      { step: 4, type: "inspect_point", desc: "🚨 [시험위원 확인] 브레이크 패드 탈거 상태 및 마모 한계 확인 요청" },
      { step: 5, type: "assembly", desc: "피스톤 리턴 툴로 캘리퍼 피스톤을 실린더 안쪽으로 끝까지 밀어 넣기" },
      { step: 6, type: "assembly", desc: "패드 리턴 클립 장착 및 패드 마모 경고 인디케이터 위치 확인 후 신품 패드 삽입" },
      { step: 7, type: "assembly", desc: "캘리퍼 바디를 내리고 가이드 핀 볼트 규정 토크(약 2.5~3.2 kgf·m)로 체결" },
      { step: 8, type: "air_bleeding", desc: "공기빼기 과제 시: 블리더 플러그에 투명 호스 연결 후 2인 1조로 페달 3~4회 밟고 유지 상태에서 밸브 개폐하여 기포 배출" },
      { step: 9, type: "assembly", desc: "조립 후 반드시 운전석 브레이크 페달을 3~5회 펌핑하여 답력(압력) 형성 확인" }
    ],
    tips: "패드 교환 후 페달 펌핑을 하지 않으면 첫 브레이크 시 허당을 치게 되어 시험에서 매우 엄격하게 감점됩니다."
  },

  tie_rod_end: {
    title: "타이로드 엔드 탈거 및 부착",
    category: "섀시",
    tools: ["17/19/22mm 스패너", "타이로드 볼조인트 풀러", "플라이어", "분할 핀(코터 핀)"],
    safety: ["볼조인트 더스트 부트가 찢어지지 않도록 전용 풀러 사용"],
    steps: [
      { step: 1, type: "disassembly", desc: "타이로드 록 너트(Lock Nut)를 1/4~1/2바퀴 풀어 유격 만들기 (위치 마킹)" },
      { step: 2, type: "disassembly", desc: "너클과 체결된 캐슬 너트(Castle Nut)의 분할 핀을 플라이어로 펴서 제거" },
      { step: 3, type: "disassembly", desc: "캐슬 너트를 풀고 볼조인트 풀러를 설치하여 '딱' 소리와 함께 테이퍼부 분리" },
      { step: 4, type: "disassembly", desc: "타이로드 엔드를 반시계방향으로 돌려 풀면서 회전수(나사산 수)를 카운트하며 분리" },
      { step: 5, type: "inspect_point", desc: "🚨 [시험위원 확인] 타이로드 엔드 탈거 완료 확인 요청" },
      { step: 6, type: "assembly", desc: "타이로드 엔드를 기록해둔 회전수만큼 정확히 돌려 삽입" },
      { step: 7, type: "assembly", desc: "너클 홀에 볼조인트를 삽입하고 캐슬 너트 규정 토크(약 3.5~4.5 kgf·m) 체결" },
      { step: 8, type: "assembly", desc: "캐슬 너트 홈과 볼트 홀을 일치시킨 후 신품 분할 핀 삽입 및 양 갈래 벌려 꺾기" },
      { step: 9, type: "assembly", desc: "타이로드 록 너트 규정 토크(약 5.0~5.5 kgf·m) 확실히 조임" }
    ],
    tips: "분할 핀(코터 핀)을 재사용하거나 누락하면 안전 규정 위반으로 큰 감점이 발생하므로 반드시 체결하고 끝을 확실히 벌려줍니다."
  },

  // ===================== [전기 탈부착] =====================
  starter_motor: {
    title: "기동전동기(스타터 모터) 탈거·부착 및 작동상태 확인",
    category: "전기",
    tools: ["10/12/14mm 소켓 및 라쳇", "익스텐션 바", "배터리 점프선"],
    safety: ["단락(합선)으로 인한 화재 방지를 위해 배터리 (-) 단자 탈거 필수"],
    steps: [
      { step: 1, type: "disassembly", desc: "배터리 (-) 음극 단자 분리 및 절연 조치" },
      { step: 2, type: "disassembly", desc: "스타터 모터 B단자 보호 고무 캡을 벗기고 12mm 너트 탈거 후 B단자선 분리" },
      { step: 3, type: "disassembly", desc: "마그네틱 스위치 S단자(커넥터 또는 10mm 너트) 분리" },
      { step: 4, type: "disassembly", desc: "변속기 하우징과 체결된 스타터 모터 고정 볼트 2개(14mm) 탈거" },
      { step: 5, type: "disassembly", desc: "스타터 모터를 조심스럽게 꺼내 작업대에 안착" },
      { step: 6, type: "inspect_point", desc: "🚨 [시험위원 확인] 기동전동기 탈거 완료 및 단품 작동 시험(무부하 시험) 준비 보고" },
      { step: 7, type: "operation_test", desc: "단품 작동 시험: 바디에 배터리 (-), B단자에 (+), 점퍼선으로 S단자에 (+) 순간 연결 시 피니언 기어가 전진하며 힘차게 회전하는지 확인" },
      { step: 8, type: "assembly", desc: "변속기 플라이휠 링기어 홈에 맞춰 스타터 모터 정위치 삽입" },
      { step: 9, type: "assembly", desc: "고정 볼트 2개 규정 토크(약 4.0~5.0 kgf·m)로 균일하게 체결" },
      { step: 10, type: "assembly", desc: "B단자선 연결 및 너트 체결 후 고무 절연 캡 씌우기, S단자 커넥터 체결" },
      { step: 11, type: "assembly", desc: "배터리 (-) 단자 연결 후 시동 키를 돌려 크랭킹 정상 작동 확인" }
    ],
    tips: "B단자는 배터리 직결 상시 전원이므로 조립 시 절연 고무 캡을 반드시 제 위치에 씌워야 차체 접촉 쇼트를 방지할 수 있습니다."
  },

  alternator: {
    title: "발전기(알터네이터) 탈거 및 부착 (작동상태 확인)",
    category: "전기",
    tools: ["10/12/14mm 소켓 및 스패너", "장력 게이지(또는 벨트 텐셔너 렌치)"],
    safety: ["배터리 (-) 단자 탈거 필수 (B단자 쇼트 방지)"],
    steps: [
      { step: 1, type: "disassembly", desc: "배터리 (-) 단자 분리 확인" },
      { step: 2, type: "disassembly", desc: "발전기 B단자 너트 분리 및 커넥터(L-S단자) 분리" },
      { step: 3, type: "disassembly", desc: "발전기 장력 조절 볼트 및 힌지 볼트를 풀고 구동 벨트 탈거" },
      { step: 4, type: "disassembly", desc: "발전기 상/하부 관통 지지 볼트를 완전히 풀고 발전기 본체 탈거" },
      { step: 5, type: "inspect_point", desc: "🚨 [시험위원 확인] 발전기 탈거 완료 대면 확인" },
      { step: 6, type: "assembly", desc: "발전기를 엔진 브래킷에 정렬하고 관통 볼트 가조립" },
      { step: 7, type: "assembly", desc: "V-리브드 벨트를 크랭크 풀리, 워터펌프, 발전기 풀리 홈에 정확히 장착" },
      { step: 8, type: "assembly", desc: "지렛대 또는 텐션 볼트로 장력(눌렀을 때 약 7~9mm 휨) 조정한 뒤 고정 볼트 체결" },
      { step: 9, type: "assembly", desc: "B단자선 체결(절연 캡 장착) 및 L-S단자 커넥터 연결" },
      { step: 10, type: "assembly", desc: "배터리 단자 연결 후 시동을 걸어 계기판 충전 경고등 소등 여부 확인" }
    ],
    tips: "벨트 조립 시 풀리 홈(골)에 벨트 산이 1줄이라도 어긋나게 걸리면 시동 시 벨트가 찢어지거나 튕겨져 나가므로 거울이나 손으로 홈 안착을 반드시 확인합니다."
  },

  wiper_motor: {
    title: "와이퍼 모터 및 링크 탈거 및 부착",
    category: "전기",
    tools: ["10/12/14mm 소켓", "일자 드라이버", "클립 리무버"],
    safety: ["와이퍼 암 탈거 시 전면 유리창 파손 주의 (유리창 위에 두꺼운 수건 깔기)"],
    steps: [
      { step: 1, type: "disassembly", desc: "와이퍼 암 피벗 캡을 제거하고 14mm 너트를 풀어 와이퍼 암 좌/우 탈거" },
      { step: 2, type: "disassembly", desc: "엔진룸 카울 탑 커버 고정 클립 및 워셔 호스 분리 후 카울 그릴 탈거" },
      { step: 3, type: "disassembly", desc: "와이퍼 모터 커넥터를 분리" },
      { step: 4, type: "disassembly", desc: "와이퍼 링크 및 모터 어셈블리 고정 볼트 4개(10mm) 탈거" },
      { step: 5, type: "disassembly", desc: "모터와 링크 어셈블리를 차체 밖으로 조심스럽게 인출" },
      { step: 6, type: "inspect_point", desc: "🚨 [시험위원 확인] 와이퍼 모터/링크 탈거 상태 확인 요청" },
      { step: 7, type: "assembly", desc: "모터와 링크 어셈블리를 카울 공간에 정위치 삽입 및 10mm 볼트 체결" },
      { step: 8, type: "assembly", desc: "전기 커넥터 연결 후 와이퍼 스위치를 ON/OFF 하여 모터를 '오토 스톱(정지 위치)'에 정렬" },
      { step: 9, type: "assembly", desc: "카울 커버 장착 및 와이퍼 암을 유리 하단 세라믹 마킹 라인에 맞춰 장착 후 너트 체결" },
      { step: 10, type: "assembly", desc: "와이퍼 작동 및 워셔액 분사 연동 정상 동작 확인" }
    ],
    tips: "와이퍼 암을 체결하기 전에 반드시 '모터를 1회 회전시켜 자동 정지(Park 위치)' 상태를 만든 후 암을 걸어야 시동 시 와이퍼가 본넷을 치는 대참사를 막을 수 있습니다."
  }
};
