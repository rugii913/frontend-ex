import './App.css'; // 위와 마찬가지로 순수 JS에서는 CSS 파일을 이런 식으로 가져오지 못함
import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';
import TabButtonWithLabel from './components/TabButtonWithLabel.jsx';

function App() {
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
            <TabButton>Components</TabButton> {/* 컴포넌트 합성(composition)의 한 예시로 볼 수 있음 */}
            <TabButtonWithLabel label="JSX" />
            {/* children prop vs. attribute props: 렌더링 결과는 같게 만들 수 있다. (강의 - 컴포넌트 구성 7:00 경)
                  -JSX 코드를 넘길 것이냐 vs. prop 값만 넘길 것이냐의 문제
                  - 적절한 상황에 더 가독성 좋은 적절한 방법을 선택하면 됨 */}
            <TabButton>Props</TabButton>
            <TabButton>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
