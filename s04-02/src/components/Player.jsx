import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(isEditing ? false: true); // 장황한 방식이면서 사용하면 안 되는 방식
    // setIsEditing(!isEditing); // 위보다 간결한 방식이면서 사용하면 안 되는 방식
    // 리액트에서는 상태를 이전 값에 기반하여 변경하는 경우 이렇게 상태 업데이트 함수에 새로운 함수를 보내야 한다.
    // 상태 변경 스케줄, 함수 실행 사이클과 관련됨 - 이런 상태 변경은 즉시 실행되지 않으며, 상태의 기준은 항상 현재 상태이다.
    // 즉 이 setIsEditing은 직접 상태를 바꾸는 것이 아니라 상태를 바꾸는 것을 예정(스케줄링)할 뿐이다. -> 두 번 호출되어도 여전히 같은 함수 실행 사이클
    setIsEditing(editing => !editing); // 이렇게 함수 형태를 사용해야 상태가 가장 최신 버전인 것을 보장할 수 있다.
  }

  let playerName = <span className="player-name">{name}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    playerName = <input type="text" required value={name} />;
    btnCaption = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button> {/* Save <-> Edit 바뀌는 것을 보여주기 위해 삼항 연산자를 이용할 수도 있다. */}
    </li>
  );
}
