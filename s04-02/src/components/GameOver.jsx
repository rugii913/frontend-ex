export default function GameOver({ winner }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>} {/* &apos;는 '가 됨 */}
      <p>
        <button>Rematch!</button>
      </p>
    </div>
  );
}
