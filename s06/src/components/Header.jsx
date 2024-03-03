import { styled } from  "styled-components";

import logo from '../assets/logo.png';
// import './Header.css';
// import classes from './Header.module.css';
/* 
- CSS 모듈을 사용했을 때
  - 장점: jsx 코드와 CSS 코드 분리, 협업 시 유리, CSS가 영향을 미치는 위치를 해당 CSS 파일을 직접 임포트하는 컴포넌트로 스코핑 가능
  - 단점: CSS를 꼭 알아야만 한다, 작고 많은 CSS 파일들을 갖게 될 가능성이 높다.
*/

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: "Pacifico", cursive;
    margin: 0;
  }

  & p {
    text-align: center;
    color: #a39191;
    margin: 0;
  }

  @media (min-width: 768px) {
    margin-bottom: 4rem;

    & h1 {
      font-size: 2.25rem;
    }
  }
`; // &는 해당 컴포넌트의 내부 요소 혹은 이미지 등에 적용됨을 표시해준다.

export default function Header() {
  /* 
  - JSX 코드 내에 인라인 스타일 CSS를 사용했을 때
    - 장점: 쉽다, 해당 요소에만 영향을 미친다
    - 단점: 모든 요소를 개별적으로 스타일링해야함, CSS 코드가 JSX 코드로 안으로 들어간다 - 협업 시 불편
  */
  return (
    <StyledHeader>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p /*className={classes.paragraph}*/>A community of artists and art-lovers.</p>
      {/* 
      <p // style={{
        // color: "red",
        // background-color: "left", // 불가능
        // backgroundColor: "blue", // 가능 - 카멜 표기법 사용 - 자동 완성 가능
        // "background-color": "blue", // 가능 - 따옴표로 묶어주기 - 자동 완성은 안 됨 }}
        >A community of artists and art-lovers.</p>
     */}
     {/*
     HMTL에 style을 넣는 것과 거의 같긴 하지만, 태그가 아니라 컴포넌트이므로 차이가 있다.
     {}으로 JS 표현임을 알리고, {color: "red"} 이런 식으로 JS 객체를 넘긴 것임
     {{}} 자체가 특별한 리액트 기능인 것은 아님
     */}
    </StyledHeader>
  );
}
