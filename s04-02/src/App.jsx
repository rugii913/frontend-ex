import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; // 상태가 아니므로 함수 밖에 둔다.
// 상태는 아니지만 메모리에서 계속 값이 유지된다.
// 깊은 복사를 사용해서 이 값을 불변값으로 유지시켜주고, 매 재실행마다 정말로 새로 렌더링하게 한 것

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer
} // 헬퍼 함수 - 컴포넌트와 관련된 어떤 상태나 데이터에 접근할 필요가 없으며, 컴포넌트 함수가 재실행될 때 함께 다시 실행될 필요가 없을 때 활용 가능

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  } // 컴포넌트 재실행될 때마다 turns에서 값을 읽어와서 gameBoard에 값들을 배치

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X"); // 불필요한 state 제거 - 상태는 최대한 적게 사용하는 게 낫다, 그리고 값은 파생 및 연산으로
  // const [hasWinner, setHasWinner] = useState(false); // 역시 불필요한 state임, 어차피 handleSelectSquare에서 클릭 이벤트 있을 때마다 App을 재실행하므로, 그 안에서 확인 작업을 진행하면 된다.

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
      // 스프레드 연산자 사용 예시 https://velog.io/@tnstjd120/스프레드-연산자spread-operator
      // ES6 spread vs. rest https://hanamon.kr/javascript-spread-reat/
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* isActive prop으로 boolean 값을 넘김, 여기서 제어하고 있는 상태 activePlayer에 따라 동적으로 */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
