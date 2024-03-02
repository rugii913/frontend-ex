import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X")
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* isActive prop으로 boolean 값을 넘김, 여기서 제어하고 있는 상태 activePlayer에 따라 동적으로 */}
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
        {/* 함수 handleSelectSquare를 prop으로 넘겨서 GameBoard의 handleSelectSquare(..)가 호출될 때 같이 호출되도록 한다. */}
      </div>
      LOG
    </main>
  );
}

export default App;
