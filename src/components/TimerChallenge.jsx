import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

//let timer;
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handlerStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal onReset={handleReset} ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handlerStop : handleStart}>{timeIsActive ? "Stop" : "Start"} Challenge</button>
        </p>
        <p className={timeIsActive ? "active" : undefined}>{timeIsActive ? "Time is Running.." : "Timer inactive"}</p>
      </section>
    </>
  );
}
