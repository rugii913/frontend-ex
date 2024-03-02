import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer
} // 헬퍼 함수 - 컴포넌트와 관련된 어떤 상태나 데이터에 접근할 필요가 없으며, 컴포넌트 함수가 재실행될 때 함께 다시 실행될 필요가 없을 때 활용 가능

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X"); // 불필요한 state 제거 - 상태는 최대한 적게 사용하는 게 낫다, 그리고 값은 파생 및 연산으로

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns; // 이 콜백 함수의 반환값이 새 gameTurns로 저장됨 // 이 정도 길이이ㅡ 상태 업데이트 함수는 종종 사용할 수도 있다.
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* isActive prop으로 boolean 값을 넘김, 여기서 제어하고 있는 상태 activePlayer에 따라 동적으로 */}
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
