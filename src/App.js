import "./App.css";

import React, { useEffect, useState } from "react";

import localStore from "./storage";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
    localStore.saveHourlyRate(e.target.value);
  }
  return {
    value,
    onChange,
  };
};

const Timer = ({ seconds }) => {
  const transformToText = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutesDivisor = secs % 3600;
    const minutes = Math.floor(minutesDivisor / 60);
    const secondss = Math.ceil(minutesDivisor % 60);

    return {
      hours,
      minutes,
      seconds: secondss,
    };
  };

  const text = transformToText(seconds);
  return (
    <>
      {text.hours}h {text.minutes}m {text.seconds}s
    </>
  );
};

const App = () => {
  const calculateTotal = (hourlyRate, secondsElapsed) => {
    return ((hourlyRate / 3600) * secondsElapsed).toFixed(2);
  };

  const [seconds, setSeconds] = useState(localStore.loadElapsedTime());
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
        localStore.saveElapsedTime(seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const hourlyRateInput = useInput(localStore.loadHourlyRate());
  return (
    <div className="app">
      Hourly rate
      <input
        className="rate-input"
        {...hourlyRateInput}
        placeholder="Hourly rate"
      />
      <br />
      <br />
      <div className="time">
        Time elapsed: <Timer seconds={seconds} />
      </div>
      <div>
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggleIsActive}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      {
        <p className="time">
          Total payout: {calculateTotal(hourlyRateInput.value, seconds)}$
        </p>
      }
    </div>
  );
};

export default App;
