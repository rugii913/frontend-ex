import logo from '../assets/logo.png';

export default function Header() {
  /* 
  - JSX 코드 내에 인라인 스타일 CSS를 사용했을 때
    - 장점: 쉽다, 해당 요소에만 영향을 미친다
    - 단점: 모든 요소를 개별적으로 스타일링해야함, CSS 코드가 JSX 코드로 안으로 들어간다 - 협업 시 불편
  */
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
      {/* 
      <p // style={{
        // color: "red",
        // background-color: "left", // 불가능
        // backgroundColor: "blue", // 가능 - 카멜 표기법 사용 - 자동 완성 가능
        // "background-color": "blue", // 가능 - 따옴표로 묶어주기 - 자동 완성은 안 됨 }}
        >A community of artists and art-lovers.</p>
     */}
    </header>
  );
}
