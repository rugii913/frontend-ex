import { Fragment } from 'react'; // useState React hook 추가

import './App.css'; // 위와 마찬가지로 순수 JS에서는 CSS 파일을 이런 식으로 가져오지 못함
import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {
  return (
    <Fragment className="App">
      {/* 위처럼 className 같은 게 주어져 있지 않다면, 최신 React에서는 빈 태그 <> </>를 이용할 수도 있다. */}
      {/*
      - 원래 코드가 div 태그로 감싸져있었던 이유
        - JSX 문법을 return (React.createElement(Header) React.createElement('main')) 이라고 생각해보면 할 수 있다.
        - JS는 두 개의 값을 return 할 수 없다.
      */}
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </Fragment>
  );
}

export default App;
