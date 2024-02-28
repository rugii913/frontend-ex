import { useState } from "react";

import TabButton from "./TabButton.jsx";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";
import { EXAMPLES } from "../data";

export default function Examples() {
  // 1. hook은 컴포넌트 함수의 안 혹은 커스텀 hook 안에서만 호출될 수 있음
  // 2. hook은 컴포넌트 함수의 최상위에서 호출해야함 - 다른 함수 혹은 if, loop statement 안에 들어가 있으면 안 됨
  // hook으로 연결된 데이터가 변경되면 이 hook이 자신이 속한 컴포넌트 함수를 다시 실행하도록 리액트에게 알림
  // useState는 두 개의 element로 이뤄진 배열을 반환한다.
  // [0]: 컴포넌트 실행 주기의 현재 데이터 스냅샷
  // [1]: state를 업데이트해주는 함수 - 이 컴포넌트 함수를 다시 호출해야한다고 알려주는 역할까지 한다.
  const [selectedTopic, setSelectedTopic] = useState(); // useState(..) ..에 넘기는 값은 기본값으로 사용할 값

  function handleSelect(selectedButton) {
    // JS 문법: 함수 내에서 정의된 로컬 함수 가능
    // - component function 내에 event handler function을 정의했을 때의 장점은
    // - component의 props와 state에 접근할 수 있다는 점
    setSelectedTopic(selectedButton);
    console.log(selectedTopic); // (cf.) setSelectedTopic(..)을 호출했을 때 selectedTopic 값이 바로 변경되는 게 아니라 업데이트 스케줄이 조정된다. App()이 다시 실행되기 전에는 값이 아직 예전 그대로 남아있다.
  }

  let tabContent = <p>Please select a topic.</p>; // 상태가 아님에 유의

  if (selectedTopic) {
    // JSX 코드를 반환하기 전에 변수를 설정
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <Section title={"Examples"} id="examples">
      <Tabs
        buttons={
          <>
            {/* menu는 기본 html 요소 태그임 */}
            {/* <TabButton children="ABCD"></TabButton> 아무 작업도 하지 않아도 children은 받으므로 부자연스럽게 attribute로 넘기지 말 것 */}
            <TabButton
              isSelected={selectedTopic === "components"}
              onClick={() => handleSelect("components")}
            >
              {/* 
              강의: 이벤트 함수에 커스텀 인자 전달하기 및 퀴즈 3 - 질문 5 관련
                - 퀴즈: 이벤트로부터 독립적인 함수는 어떻게 “구성 및 설정”할 수 있습니까? (예: 어떤 인자를 전달할지 정의하는 등) 
                  - 함수를 다른 함수로 감싼다 (예: onClick={() => handleClick(5)})
                  - 이벤트 핸들링하는 함수의 실행을 다른 함수로 감싸면, 그 다른 함수가 이벤트 핸들링의 prop의 값으로 전달됨, 따라서 handleClick()이 이벤트가 발생할 때만 실행됨
                - handleSelect를 넘기는 대신 화살표 함수 () => handleSelect("..")를 넘김
                  - 순수 JS에서도 많이 사용되는 스타일
                  - 이렇게 함으로써 함수를 바로 실행하지 않으면서도 함수 호출 시 넘길 인자를 정해줄 수 있다.
              */}
              Components
            </TabButton>
            {/* 컴포넌트 합성(composition)의 한 예시로 볼 수 있음 */}
            <TabButton
              isSelected={selectedTopic === "jsx"}
              onClick={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "props"}
              onClick={() => handleSelect("props")}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "state"}
              onClick={() => handleSelect("state")}
            >
              State
            </TabButton>
            {/* children prop vs. attribute props: 렌더링 결과는 같게 만들 수 있다. (강의 - 컴포넌트 구성 7:00 경)
                  -JSX 코드를 넘길 것이냐 vs. prop 값만 넘길 것이냐의 문제
                  - 적절한 상황에 더 가독성 좋은 적절한 방법을 선택하면 됨 */}
            {/* 조건부 렌더링 세 가지 방법 중 어떤 것을 사용할 것이냐는 선택의 문제 */}
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
