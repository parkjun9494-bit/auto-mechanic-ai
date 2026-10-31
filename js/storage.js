// js/storage.js
// 로컬 스토리지 데이터 관리 및 차계부/진단 이력 영구 보관

const STORAGE_KEYS = {
  CAR_PROFILE: "automechanic_car_profile",
  DIAGNOSIS_HISTORY: "automechanic_diagnosis_history",
  MAINTENANCE_LOGS: "automechanic_maintenance_logs",
  THEME: "automechanic_theme"
};

export const StorageManager = {
  // 차량 프로필 저장 & 불러오기
  getCarProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAR_PROFILE);
      return data ? JSON.parse(data) : {
        model: "현대 아반떼 CN7",
        year: 2022,
        powertrain: "gasoline",
        mileage: 45000,
        annualMileage: 15000
      };
    } catch (e) {
      return { model: "내 차", year: 2022, powertrain: "gasoline", mileage: 45000 };
    }
  },

  saveCarProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.CAR_PROFILE, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.error("Save profile error:", e);
      return false;
    }
  },

  // 진단 이력
  getDiagnosisHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DIAGNOSIS_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveDiagnosisRecord(record) {
    try {
      const history = this.getDiagnosisHistory();
      const newRecord = {
        id: "diag_" + Date.now(),
        date: new Date().toISOString(),
        ...record
      };
      history.unshift(newRecord);
      // 최대 50건 유지
      if (history.length > 50) history.pop();
      localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(history));
      return newRecord;
    } catch (e) {
      console.error("Save diagnosis error:", e);
      return null;
    }
  },

  deleteDiagnosisRecord(id) {
    try {
      let history = this.getDiagnosisHistory();
      history = history.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(history));
      return true;
    } catch (e) {
      return false;
    }
  },

  // 테마
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // 데이터 내보내기 및 가져오기 (백업)
  exportAllData() {
    const data = {
      profile: this.getCarProfile(),
      history: this.getDiagnosisHistory(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.saveCarProfile(parsed.profile);
      if (Array.isArray(parsed.history)) {
        localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(parsed.history));
      }
      return true;
    } catch (e) {
      console.error("Import error:", e);
      return false;
    }
  }
};
