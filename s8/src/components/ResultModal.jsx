export default function ResultModal({result, targetTime}) {
  return (
    <dialog className="result-modal" open>
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
}
