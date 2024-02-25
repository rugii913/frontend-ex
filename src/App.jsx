import './App.css'; // 위와 마찬가지로 순수 JS에서는 CSS 파일을 이런 식으로 가져오지 못함
import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';

function App() {
  function handleSelect(selectedButton) {
    // JS 문법: 함수 내에서 정의된 로컬 함수 가능
    // - component function 내에 event handler function을 정의했을 때의 장점은 
    // - component의 props와 state에 접근할 수 있다는 점
    console.log(selectedButton)
  }

  return (
    <div className="App">
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]}/>
            <CoreConcept {...CORE_CONCEPTS[1]}/>
            <CoreConcept {...CORE_CONCEPTS[2]}/>
            <CoreConcept {...CORE_CONCEPTS[3]}/>
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu> {/* menu는 기본 html 요소 태그임 */}
            {/* <TabButton children="ABCD"></TabButton> 아무 작업도 하지 않아도 children은 받으므로 부자연스럽게 attribute로 넘기지 말 것 */}
            <TabButton onSelect={() => handleSelect("components")}>
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
            </TabButton> {/* 컴포넌트 합성(composition)의 한 예시로 볼 수 있음 */}
            <TabButton onSelect={() => handleSelect("jsx")}>
              JSX
            </TabButton>
            <TabButton onSelect={() => handleSelect("props")}>
              Props
            </TabButton>
            <TabButton onSelect={() => handleSelect("state")}>
              State
            </TabButton>
            {/* children prop vs. attribute props: 렌더링 결과는 같게 만들 수 있다. (강의 - 컴포넌트 구성 7:00 경)
                  -JSX 코드를 넘길 것이냐 vs. prop 값만 넘길 것이냐의 문제
                  - 적절한 상황에 더 가독성 좋은 적절한 방법을 선택하면 됨 */}
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
