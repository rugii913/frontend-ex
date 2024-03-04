import { useState } from "react";

import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {
  // 각 input 필드에 대해 상태를 따로 관리할지 하나의 객체로 관리할지는 선택 문제
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  // 각각의 input마다 연결된 네 개의 함수를 만들 수도 있고, 모든 input과 연결되는 함수 한 개를 만들 수도 있다.
  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput, // JS 객체를 스프레드 - 불변성을 위해 깊은 복사
        [inputIdentifier]: newValue, // inputIdentifier에 해당되는 값만 바꿔치기
      };
      // 참고
      // - JavaScript의 spread operator(전개 구문) 사용하기 https://chanhuiseok.github.io/posts/js-8/
      // - 코어 자바스크립트 - 객체: 기본 중 대괄호 표기법, 계산된 프로퍼티 https://ko.javascript.info/object#ref-214
    });
  }

  return (
    <>
      <Header />;
      <UserInput userInput={userInput} onChange={handleChange} />
      <Results input={userInput} />
    </>
  );
}

export default App;
