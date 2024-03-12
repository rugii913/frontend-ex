import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState("");

  function handleClick() {
    // - ref로 지정된 변수를 통해 input 컴포넌트에 접근이 가능해짐
    //   - 그 ref JS 객체는 current 프로퍼티 하나만 갖고 있는 객체임
    //   - 그리고 그 current 프로퍼티가 연결된 컴포넌트를 가리켜줌
    setEnteredPlayerName(playerName.current.value); /* DOM에서 바꾸는 게 아니라 읽어들이기만 하므로 괜찮다. */
    playerName.current.value = ""; /* 선언적이지 않은 명령형 코드이므로 좋지 바람직하지 않다. - 브라우저의 DOM을 입력된 코드로 직접 제어하려 하고 있음  */
    // DOM과의 상호작용은 원칙적으로 사용자가 작성한 명령형 코드가 아니라 리액트가 하게끔 해야 한다.
    // 하지만 최종적으로 많은 코드를 줄여준다면 사용할 수도 있다.
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName || "unknown entity"}</h2> {/* JS 문법 - ||는 앞 값 truthy이면 앞 값 리턴, falsy이면 뒤 값 리턴 */} {/* (cf.) ||가 아니라 ??은 falsy가 아니라 nullish를 따진다. https://thefirstperson.tistory.com/177 */}
      <p>
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
