import logo from '../../logo.svg';
// - 아래 img 태그를 보면 HTML의 attribute에도 {}를 활용할 수 있음, 태그안에만 넣을 수 있는 게 아님
// - 만약 이 경로를 src attribute에 하드 코딩하게 되면 배포 과정에서 이미지가 유실될 수 있으며, 최적화되지 않는다.
// - 참고로 여기서 이미지 파일을 직접 가져오는 것처럼 보이는데,
//   - 실제로 가져온다기보다는 빌드 과정에서 해결해준다고 보면 된다.
//   - 순수 JS를 사용한다면 이런 것은 불가능함
// - 아무튼 React에서는 이런 방식으로 이미지를 변수처럼 받아서 코드에서 활용할 수 있음
import './Header.css';

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function generateRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
    const description = reactDescriptions[generateRandomInt(2)];
  
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          { description } React concepts you will need for almost any app you are going to build!
        </p>
      </header>
    );
  }
