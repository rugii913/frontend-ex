import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("Cleaning up interval");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("TIMER SET");
    const timer = setTimeout(() => { // 직접 JSX를 바꾸지 않으므로 side effect
      onConfirm();
    }, TIMER);

    // clean up 함수
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, [onConfirm]);
  // - 여기서 의존성으로 추가된 onConfirm은 함수인데, 함수 의존성은 무한 루프를 만들 수도 있다.
  //   - JS에서 함수는 객체이고, 따라서 여기서 App에서 onConfirm 파라미터로 넘긴 handleRemovePlace 함수는 App component가 실행될 때마다 재생성된다.
  // - App에서의 흐름을 따라가보면
  //   - setTimeout()에 의해 DeleteConfirmation의 onConfirm()이 실행되면 App에서 넘긴 handleRemovePlace() 실행
  //   - handleRemovePlace() 안에서 state 업데이트 함수 실행
  //   - App 컴포넌트 재실행
  //   - handleRemovePlace() 함수 객체가 새로 생성
  //   - onConfirm이 변경됨
  //   - useEffect() 다시 실행 ... 반복
  // - 하지만 실제로 무한 루프에 빠지진 않는데, handleRemovePlace()에서 실행되는 함수 때문에 그러함
  //   - setModalIsOpen(false); 호출하면 Modal의 {open ? children : null} 부분 때문에 DeleteConfirmation 부분이 사라짐
  //   - setModalIsOpen(false) 부분을 주석처리하면 바로 무한 루프를 확인할 수 있다.
  // - 이처럼 무한 루프를 방지하기 위해서는
  //   - 방법 1 setModalIsOpen(false)처럼 해당 요소를 DOM에서 삭제하는 코드를 추가한다.
  //   - 방법 2 (더 안전한 방법) useCallback()을 사용한다.

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
