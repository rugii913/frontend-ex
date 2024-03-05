import logo from '../assets/logo.png';

export default function Header() {
  /* 
  - JSX 코드 내에 인라인 스타일 CSS를 사용했을 때
    - 장점: 쉽다, 해당 요소에만 영향을 미친다
    - 단점: 모든 요소를 개별적으로 스타일링해야함, CSS 코드가 JSX 코드로 안으로 들어간다 - 협업 시 불편
  */
  return (
    <header className="flex flex-col items-center mt-8 mb-8 md:mb-16">
      <img
        src={logo}
        alt="A canvas"
        className="mb-8 w-44 h-44 object-contain"
      />
      <h1 className="text-xl md:text-4xl font-semibold tracking-widest text-center uppercase text-amber-800 font-title">
        ReactArt
      </h1>
      <p className="text-stone-500">A community of artists and art-lovers.</p>
    </header>
  );
}
