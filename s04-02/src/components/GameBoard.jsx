const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; // 상태가 아니므로 함수 밖에 둔다. (계속 관리해줘야하는 변수가 아니라 처음에 한 번 주면 충분한 값임)

export default function GameBoard() {
  return (
    <ol id="game-board">
      {initialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
