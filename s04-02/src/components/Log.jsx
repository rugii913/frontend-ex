export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
      {/* 백틱 `` 사용하여 JS 템플릿 리터럴 사용 */}
    </ol>
  );
}
