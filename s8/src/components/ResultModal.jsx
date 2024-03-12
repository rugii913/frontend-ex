import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal( /* forwardRef() 메서드에 prop 부분 수정한 원래의 컴포넌트를 원래 컴포넌트 이름으로 export  */
  { result, targetTime },
  ref
) {
  return (
    <dialog ref={ref} className="result-modal">
      {" "}
      {/* 모든 내장 컴포넌트는 ref 속성을 갖고 있다 - 커스텀 컴포넌트끼리 주고 받을 때는 forwardRef를 사용해야만 한다 */}
      {/* (cf.) dialog는 HTML 기본 지원 태그, dialog는 open 속성이 없으면 안 보임, 그런데 open으로 둘 경우 흐린 배경(backdrop)이 안 나타남 */}
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
/* export default const ResultModal = forwardRef(..) 로는 export 불가능함 */
/* export default forwardRef(..) 로는 export 가능하긴 함*/
