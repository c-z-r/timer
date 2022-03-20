const saveElapsedTime = (seconds) => {
  window.localStorage.setItem("secondsElapsed", seconds + "");
};

const loadElapsedTime = () => {
  const seconds = window.localStorage.getItem("secondsElapsed");
  return +seconds;
};

const saveHourlyRate = (value) => {
  window.localStorage.setItem("hourlyRate", value + "");
};

const loadHourlyRate = () => {
  const rate = window.localStorage.getItem("hourlyRate");
  return +rate || 60;
};

const localStore = {
  saveElapsedTime,
  loadElapsedTime,
  saveHourlyRate,
  loadHourlyRate,
};

export default localStore;
