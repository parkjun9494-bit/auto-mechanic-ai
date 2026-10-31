// 자동차정비기능사 실기 1안 ~ 15안 종합 과제 매트릭스 (공개문제 기준)
export const EXAM_MATRIX = {
  1: {
    round: 1,
    title: "제 1 안",
    engine: {
      removal: "디젤 실린더 헤드 / 분사 노즐 탈거 및 조립",
      record: {
        name: "분사노즐 압력 및 후적 점검",
        type: "injection_nozzle"
      },
      fault: "점화 회로 점검 및 시동 (고장 1개소)",
      part_removal: "공전속도 조절장치(ISA) 탈거 및 부착",
      scanner: "자기진단 - TPS (스로틀 포지션 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "앞 쇽업소버 및 코일 스프링 탈거 및 조립",
      record: {
        name: "휠 얼라인먼트 (캐스터 각, 캠버 각) 점검",
        type: "wheel_alignment"
      },
      operation_check: "ABS 브레이크 패드 탈거/조립 및 작동상태 확인",
      diag_record: {
        name: "인히비터 스위치와 변속 선택 레버 위치 점검",
        type: "inhibitor_switch"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "윈드실드 와이퍼 모터 탈거 및 부착 (작동상태 확인)",
      record: {
        name: "기동 시 소모 전류 측정",
        type: "cranking_current"
      },
      circuit_record: {
        name: "미등 및 번호등 회로 점검",
        type: "circuit_taillight"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  2: {
    round: 2,
    title: "제 2 안",
    engine: {
      removal: "가솔린 실린더 헤드 / 밸브스프링 탈거 및 조립",
      record: {
        name: "밸브스프링 장력 및 자유고 점검",
        type: "valve_spring"
      },
      fault: "연료 회로 점검 및 시동 (고장 1개소)",
      part_removal: "인젝터 1개 탈거 및 부착",
      scanner: "자기진단 - WTS (냉각수온 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "앞 허브 및 너클 탈거 및 조립",
      record: {
        name: "휠 얼라인먼트 (캐스터 각, 캠버 각) 점검",
        type: "wheel_alignment"
      },
      operation_check: "브레이크 슈 탈거/조립 및 작동상태 확인",
      diag_record: {
        name: "자동변속기(A/T) 자기진단",
        type: "at_scanner"
      },
      inspection: "최소 회전반경 측정"
    },
    electrical: {
      removal: "발전기(알터네이터) 탈거 및 부착 (작동상태 확인)",
      record: {
        name: "점화코일 1차, 2차 저항 측정",
        type: "ignition_coil"
      },
      circuit_record: {
        name: "전조등 회로 점검",
        type: "circuit_headlight"
      },
      inspection: "경음기 음량 측정"
    }
  },
  3: {
    round: 3,
    title: "제 3 안",
    engine: {
      removal: "디젤 워터펌프 / 라디에이터 캡 탈거 및 조립",
      record: {
        name: "라디에이터 압력식 캡 개방 압력 점검",
        type: "radiator_cap"
      },
      fault: "크랭킹 회로 점검 및 시동 (고장 1개소)",
      part_removal: "공기유량센서(AFS) 탈거 및 부착",
      scanner: "자기진단 - AFS (공기유량센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "타이어 림 탈거 및 부착 (휠 밸런스 포함)",
      record: {
        name: "수동변속기(M/T) 입력축 엔드 플레이 점검",
        type: "mt_endplay"
      },
      operation_check: "클러치 릴리스 실린더 탈거/조립 및 공기빼기",
      diag_record: {
        name: "전자제어 현가장치(ECS) 자기진단",
        type: "ecs_scanner"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "점화플러그 및 고압 케이블 탈거 및 부착",
      record: {
        name: "발전기 충전 전류 및 충전 전압 측정",
        type: "alternator_output"
      },
      circuit_record: {
        name: "와이퍼 회로 점검",
        type: "circuit_wiper"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  4: {
    round: 4,
    title: "제 4 안",
    engine: {
      removal: "타이밍 벨트 / 캠축 탈거 및 조립",
      record: {
        name: "캠축 캠 높이 측정",
        type: "cam_height"
      },
      fault: "점화 회로 점검 및 시동 (고장 1개소)",
      part_removal: "CRDI 연료압력 조절밸브 탈거 및 부착",
      scanner: "자기진단 - TDC (상사점 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "프런트 로워 암(Lower Arm) 탈거 및 조립",
      record: {
        name: "휠 얼라인먼트 (캐스터 각, 캠버 각) 점검",
        type: "wheel_alignment"
      },
      operation_check: "브레이크 캘리퍼 탈거/조립 및 공기빼기",
      diag_record: {
        name: "ABS 자기진단",
        type: "abs_scanner"
      },
      inspection: "캐스터 각, 캠버 각 점검"
    },
    electrical: {
      removal: "기동전동기(스타터 모터) 탈거/부착 및 작동상태 확인",
      record: {
        name: "메인 컨트롤 릴레이 점검",
        type: "main_relay"
      },
      circuit_record: {
        name: "방향지시등 및 비상등 회로 점검",
        type: "circuit_turnsignal"
      },
      inspection: "경음기 음량 측정"
    }
  },
  5: {
    round: 5,
    title: "제 5 안",
    engine: {
      removal: "디젤 크랭크축 탈거 및 조립",
      record: {
        name: "크랭크축 휨 측정",
        type: "crank_runout"
      },
      fault: "연료 회로 점검 및 시동 (고장 1개소)",
      part_removal: "예열플러그 탈거 및 부착",
      scanner: "자기진단 - CAS (크랭크각 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "앞 등속 드라이브 샤프트 탈거 및 조립",
      record: {
        name: "휠 밸런스(동적/정적) 점검",
        type: "wheel_balance"
      },
      operation_check: "타이로드 엔드 탈거 및 부착",
      diag_record: {
        name: "자동변속기(A/T) 자기진단",
        type: "at_scanner"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "에어컨 냉매 회수 및 진공/재충전 작업",
      record: {
        name: "ISC 밸브 듀티값 측정",
        type: "isc_duty"
      },
      circuit_record: {
        name: "경음기 및 경음기 릴레이 회로 점검",
        type: "circuit_horn"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  6: {
    round: 6,
    title: "제 6 안",
    engine: {
      removal: "가솔린 크랭크축 탈거 및 조립",
      record: {
        name: "크랭크축 마모량 (저널 외경) 측정",
        type: "crank_journal"
      },
      fault: "크랭킹 회로 점검 및 시동 (고장 1개소)",
      part_removal: "스로틀 보디 탈거 및 부착",
      scanner: "자기진단 - TPS (스로틀 포지션 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "앞 또는 뒤 범퍼 탈거 및 부착",
      record: {
        name: "주차 브레이크 레버 클릭 수(노치) 점검",
        type: "parking_lever"
      },
      operation_check: "파워스티어링(P/S) 오일펌프 탈거 및 공기빼기",
      diag_record: {
        name: "자동변속기(A/T) 자기진단",
        type: "at_scanner"
      },
      inspection: "최소 회전반경 측정"
    },
    electrical: {
      removal: "다기능 스위치(콤비네이션 스위치) 탈거 및 부착",
      record: {
        name: "축전지 비중 및 무부하 단자전압 측정",
        type: "battery_test"
      },
      circuit_record: {
        name: "기동 및 점화 회로 점검",
        type: "circuit_cranking"
      },
      inspection: "경음기 음량 측정"
    }
  },
  7: {
    round: 7,
    title: "제 7 안",
    engine: {
      removal: "DOHC 가솔린 실린더 헤드 탈거 및 조립",
      record: {
        name: "실린더 헤드 변형도(평면도) 측정",
        type: "head_warpage"
      },
      fault: "점화 회로 점검 및 시동 (고장 1개소)",
      part_removal: "점화플러그 및 고압 배선 케이블 탈부착",
      scanner: "자기진단 - TPS (스로틀 포지션 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "M/T 후진 아이들 기어 / 차동기어 탈거 및 조립",
      record: {
        name: "브레이크 디스크 두께 및 런아웃(흔들림) 측정",
        type: "brake_disc"
      },
      operation_check: "타이로드 엔드 탈부착 및 조향핸들 직진 상태 점검",
      diag_record: {
        name: "자동변속기 라인 오일 압력 측정",
        type: "at_oil_pressure"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "경음기(혼) 및 경음기 릴레이 탈거 및 부착",
      record: {
        name: "에어컨 고압/저압 라인 압력 점검",
        type: "ac_pressure"
      },
      circuit_record: {
        name: "전동팬 회로 점검",
        type: "circuit_fan"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  8: {
    round: 8,
    title: "제 8 안",
    engine: {
      removal: "에어클리너 어셈블리 / 점화플러그 전부 탈거 및 조립",
      record: {
        name: "각 실린더 압축압력 측정",
        type: "compression_pressure"
      },
      fault: "연료 회로 점검 및 시동 (고장 1개소)",
      part_removal: "점화코일 탈거 및 부착",
      scanner: "자기진단 - ATS (흡기온도 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "리어 액슬축(Axle Shaft) 탈거 및 조립",
      record: {
        name: "자동변속기(A/T) 오일량 및 오일상태 점검",
        type: "atf_level"
      },
      operation_check: "브레이크 캘리퍼 탈거/조립 및 공기빼기",
      diag_record: {
        name: "인히비터 스위치와 변속 선택 레버 위치 점검",
        type: "inhibitor_switch"
      },
      inspection: "최소 회전반경 측정"
    },
    electrical: {
      removal: "파워 윈도우 모터 및 레귤레이터 탈거 및 부착",
      record: {
        name: "축전지 급속충전 및 비중/전압 점검",
        type: "battery_fast_charge"
      },
      circuit_record: {
        name: "충전 회로 점검",
        type: "circuit_charging"
      },
      inspection: "경음기 음량 측정"
    }
  },
  9: {
    round: 9,
    title: "제 9 안",
    engine: {
      removal: "가솔린 크랭크축 탈거 및 조립",
      record: {
        name: "크랭크축 축 방향 유격(엔드플레이) 측정",
        type: "crank_endplay"
      },
      fault: "크랭킹 회로 점검 및 시동 (고장 1개소)",
      part_removal: "MAP 센서 탈거 및 부착",
      scanner: "자기진단 - MAP 센서 (흡기다기관 절대압력 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "뒷 쇽업소버 및 스프링 탈거 및 조립",
      record: {
        name: "종감속 기어 백래시(Backlash) 측정",
        type: "final_gear_backlash"
      },
      operation_check: "리어 휠 실린더 탈거/조립 및 공기빼기",
      diag_record: {
        name: "ABS 자기진단",
        type: "abs_scanner"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "전조등(헤드라이트 어셈블리) 탈거 및 부착",
      record: {
        name: "발전기 충전 전류 및 충전 전압 측정",
        type: "alternator_output"
      },
      circuit_record: {
        name: "에어컨 회로 점검",
        type: "circuit_ac"
      },
      inspection: "경음기 음량 측정"
    }
  },
  10: {
    round: 10,
    title: "제 10 안",
    engine: {
      removal: "가솔린 크랭크축 및 메인베어링 탈거 및 조립",
      record: {
        name: "크랭크축 메인베어링 오일간극(플라스틱게이지) 측정",
        type: "main_bearing_clearance"
      },
      fault: "점화 회로 점검 및 시동 (고장 1개소)",
      part_removal: "연료 펌프 탈거 및 부착",
      scanner: "자기진단 - AFS (공기유량 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "A/T 오일필터 및 유온센서 탈거 및 부착",
      record: {
        name: "브레이크 페달 유격 및 작동거리 점검",
        type: "brake_pedal"
      },
      operation_check: "파워스티어링(P/S) 오일펌프 탈거 및 공기빼기",
      diag_record: {
        name: "전자제어 현가장치(ECS) 자기진단",
        type: "ecs_scanner"
      },
      inspection: "최소 회전반경 측정"
    },
    electrical: {
      removal: "에어컨 필터 및 블로워 모터 탈거 및 부착",
      record: {
        name: "인젝터 코일 저항 측정",
        type: "injector_resistance"
      },
      circuit_record: {
        name: "점화 회로 점검",
        type: "circuit_ignition"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  11: {
    round: 11,
    title: "제 11 안",
    engine: {
      removal: "가솔린 실린더 헤드 / 캠축 탈거 및 조립",
      record: {
        name: "캠축 휨(런아웃) 측정",
        type: "cam_runout"
      },
      fault: "연료 회로 점검 및 시동 (고장 1개소)",
      part_removal: "연료 펌프 탈거 및 부착",
      scanner: "자기진단 - WTS (냉각수온 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "추진축(프로펠러 샤프트) 탈거 및 조립",
      record: {
        name: "앞바퀴 토우(Toe-in) 점검 및 측정",
        type: "wheel_toe"
      },
      operation_check: "브레이크 마스터 실린더 탈거 및 공기빼기",
      diag_record: {
        name: "자동변속기(A/T) 자기진단",
        type: "at_scanner"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "냉각 전동팬 어셈블리 탈거 및 부착",
      record: {
        name: "크랭킹 시 전압 강하 측정",
        type: "cranking_voltage_drop"
      },
      circuit_record: {
        name: "제동등 및 미등 회로 점검",
        type: "circuit_brakelight"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  12: {
    round: 12,
    title: "제 12 안",
    engine: {
      removal: "디젤 크랭크축 탈거 및 조립",
      record: {
        name: "플라이휠 런아웃(흔들림) 측정",
        type: "flywheel_runout"
      },
      fault: "크랭킹 회로 점검 및 시동 (고장 1개소)",
      part_removal: "연료 펌프 탈거 및 부착",
      scanner: "자기진단 - TPS (스로틀 포지션 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "종감속 장치의 차동기어 어셈블리 탈거 및 조립",
      record: {
        name: "클러치 페달 유격 점검",
        type: "clutch_pedal"
      },
      operation_check: "브레이크 슈 탈거/조립 및 자동간극 작동확인",
      diag_record: {
        name: "ABS 자기진단",
        type: "abs_scanner"
      },
      inspection: "최소 회전반경 측정"
    },
    electrical: {
      removal: "발전기(알터네이터) 탈거 및 부착 (작동상태 확인)",
      record: {
        name: "스텝 모터(공회전 조절 서보) 코일 저항 측정",
        type: "step_motor_resistance"
      },
      circuit_record: {
        name: "실내등 및 열선 회로 점검",
        type: "circuit_roomlamp"
      },
      inspection: "경음기 음량 측정"
    }
  },
  13: {
    round: 13,
    title: "제 13 안",
    engine: {
      removal: "CRDI 인젝터 1개, 예열플러그 1개 탈거 및 부착",
      record: {
        name: "예열플러그 저항 측정",
        type: "glow_plug_resistance"
      },
      fault: "점화 회로 점검 및 시동 (고장 1개소)",
      part_removal: "공기유량센서(AFS) 및 에어필터 탈부착",
      scanner: "자기진단 - BPS (부스트 압력 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "A/T 오일 펌프 탈거 및 조립",
      record: {
        name: "사이드 슬립(Side Slip) 점검 및 측정",
        type: "sideslip_test"
      },
      operation_check: "브레이크 패드 탈거/조립 및 작동상태 확인",
      diag_record: {
        name: "자동변속기(A/T) 오일 압력 점검",
        type: "at_oil_pressure"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "에어컨 블로워 모터 탈거 및 부착",
      record: {
        name: "공전속도 조절장치(ISA) 저항 측정",
        type: "step_motor_resistance"
      },
      circuit_record: {
        name: "방향지시등 회로 점검",
        type: "circuit_turnsignal"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  },
  14: {
    round: 14,
    title: "제 14 안",
    engine: {
      removal: "실린더 헤드 / 피스톤 탈거 및 조립",
      record: {
        name: "실린더와 피스톤 간극 측정",
        type: "cylinder_clearance"
      },
      fault: "연료 회로 점검 및 시동 (고장 1개소)",
      part_removal: "공기유량센서(AFS) 및 에어필터 탈부착",
      scanner: "자기진단 - AFS (공기유량 센서)",
      inspection: "가솔린 배기가스 (CO, HC) 측정"
    },
    chassis: {
      removal: "M/T 후진 아이들 기어 / 차동기어 탈거 및 조립",
      record: {
        name: "ABS 톤 휠(센서 로터) 간극 측정",
        type: "tone_wheel_gap"
      },
      operation_check: "리어 휠 실린더 탈거/조립 및 공기빼기",
      diag_record: {
        name: "자동변속기(A/T) 자기진단",
        type: "at_scanner"
      },
      inspection: "최소 회전반경 측정"
    },
    electrical: {
      removal: "에어컨 컴프레셔 구동벨트 탈부착 및 벨트 장력 조정",
      record: {
        name: "메인 컨트롤 릴레이 점검",
        type: "main_relay"
      },
      circuit_record: {
        name: "와이퍼 및 워셔 모터 회로 점검",
        type: "circuit_wiper"
      },
      inspection: "경음기 음량 측정"
    }
  },
  15: {
    round: 15,
    title: "제 15 안",
    engine: {
      removal: "실린더 헤드 / 피스톤 1개 탈거 및 조립",
      record: {
        name: "피스톤 링 이음간극(압축링) 측정",
        type: "piston_ring_gap"
      },
      fault: "크랭킹 회로 점검 및 시동 (고장 1개소)",
      part_removal: "공기유량센서(AFS) 및 에어필터 탈부착",
      scanner: "자기진단 - AFS (공기유량 센서)",
      inspection: "디젤 매연 측정"
    },
    chassis: {
      removal: "A/T 밸브 바디(Control Valve Body) 탈거 및 조립",
      record: {
        name: "자동변속기(A/T) 오일량 및 오일상태 점검",
        type: "atf_level"
      },
      operation_check: "클러치 릴리스 실린더 탈거/조립 및 공기빼기",
      diag_record: {
        name: "전자제어 현가장치(ECS) 자기진단",
        type: "ecs_scanner"
      },
      inspection: "제동력 측정 (전축/후축/주차)"
    },
    electrical: {
      removal: "계기판(클러스터 어셈블리) 탈거 및 부착 (작동확인)",
      record: {
        name: "점화코일 1차, 2차 저항 측정",
        type: "ignition_coil"
      },
      circuit_record: {
        name: "파워 윈도우 회로 점검",
        type: "circuit_powerwindow"
      },
      inspection: "전조등 광도 및 광축 점검"
    }
  }
};
