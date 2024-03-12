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

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // let timer;
  // - let 변수인 타이머를 함수 컴포넌트 안에 선언했을 때의 문제점
  //   - 버튼을 누르면서 상태를 set하고 컴포넌트가 재실행, timer 변수도 새로 생성됨
  //   - handleStart()의 타이머와 handleStop()의 타이머가 서로 다른 타이머가 된다.

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal(); /* JS는 dialog DOM 요소의 showModal() 메서드를 호출할 수 있다.(표준 브라우저 기능) https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility_concerns */
    }, targetTime * 1000);

    setTimerStarted(true); // 위 코드보다 뒤에 있어도 상관이 없다.
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
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
    </>
  );
}
