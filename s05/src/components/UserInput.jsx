import { useState } from "react";

export default function UserInput() {
  // 각 input 필드에 대해 상태를 따로 관리할지 하나의 객체로 관리할지는 선택 문제
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
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
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            required
            value={userInput.initialInvestment}
            onChange={(event) =>
              handleChange("initialInvestment", event.target.value)
              /* 
              - input 컴포넌트의 값 변화 이벤트 발생하면 handleChange 호출하며 inputIdentifier와 newValue를 넘김
              - 이로 handleChange 호출되어 setUserInput 호출되면 상태 변화 스케줄링
              - 새로 렌더링할 때 userInput의 새 값이 렌더링
               */
            }
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            required
            value={userInput.annualInvestment}
            onChange={(event) =>
              handleChange("annualInvestment", event.target.value)
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Initial Expected Return</label>
          <input
            type="number"
            required
            value={userInput.expectedReturn}
            onChange={(event) =>
              handleChange("expectedReturn", event.target.value)
            }
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            required
            value={userInput.duration}
            onChange={(event) =>
              handleChange("duration", event.target.value)
            }
          />
        </p>
      </div>
    </section>
  );
}
