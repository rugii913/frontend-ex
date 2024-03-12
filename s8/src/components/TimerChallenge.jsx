import { useState } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  let timer;
  // - let 변수인 타이머를 함수 컴포넌트 안에 선언했을 때의 문제점
  //   - 버튼을 누르면서 상태를 set하고 컴포넌트가 재실행, timer 변수도 새로 생성됨
  //   - handleStart()의 타이머와 handleStop()의 타이머가 서로 다른 타이머가 된다.

  function handleStart() {
    timer = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true); // 위 코드보다 뒤에 있어도 상관이 없다.
  }

  function handleStop() {
    clearTimeout(timer);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  );
}
