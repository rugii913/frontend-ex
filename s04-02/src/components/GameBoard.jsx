const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; // 상태가 아니므로 함수 밖에 둔다. (계속 관리해줘야하는 변수가 아니라 처음에 한 번 주면 충분한 값임)

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard] = useState(initialGameBoard); // 이 GameBoard 컴포넌트에서는 상태를 제어하지 않게 할 것

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     // prevGameBoard[rowIndex][colIndex] = "V"
  //     // return prevGameBoard
  //     // 상태가 객체라면 업데이트할 때 변경 불가능(immutable)하게 해야한다.
  //     // 복제 후 값을 복사할 것, 직접 메모리의 값을 변경하면 변경 스케줄보다 먼저 메모리 변경이 발생, 버그 원인이 된다.
  //     // 강의 참고 링크 reference vs. primitive values - https://academind.com/tutorials/reference-vs-primitive-values
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
