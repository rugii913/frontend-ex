import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer;
// - let 변수인 타이머를 함수 컴포넌트 밖에 선언했을 때의 문제점
//   - 모든 컴포넌트 인스턴스들이 공유한다.
//   - 한 타이머가 실행된 상태에서 다른 도전 타이머를 또 실행시키면 원래 타이머가 버려진다.
// - component 바깥에 let 변수를 선언하면 안 되는 이유

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  // - 컴포넌트 함수 안에 있으므로 특정 컴포넌트 인스턴스에만 할당되며,
  // - component가 재실행될 때도 같은 주소를 그대로 바라본다.(리액트가 알아서 해결해주는 부분)
  //   → **참조의 또다른 특별한 기능**: refs는 state와 마찬가지로 component 재실행 시 유실되지 않는다
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    // **주의** 컴포넌트에서 바로 state 수정 함수를 호출하는 건 무한 루프를 만들 수 있으므로 위험하다, 여기서는 if 조건이 있으므로 무한 루프에 빠지진 않을 것이다.
    dialog.current.open();
  }

  // let timer;
  // - let 변수인 타이머를 함수 컴포넌트 안에 선언했을 때의 문제점
  //   - 버튼을 누르면서 상태를 set하고 컴포넌트가 재실행, timer 변수도 새로 생성됨
  //   - handleStart()의 타이머와 handleStop()의 타이머가 서로 다른 타이머가 된다.

  function handleStart() {
    /*
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open();
    }, targetTime * 1000);
    // setTimeout() vs. setInterval()
    */
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
    }, 10)
  }

  function handleStop() {
    // clearTimeout(timer.current);
    dialog.current.open();
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
