export default function TabButton({ children }) {
    // - children은 component의 특별한 prop
    //   - 아무 작업도 하지 않아도 children은 사실 받고 있다. 그러니 컴포넌트 태그에 일부러 children attribute를 명시하면 안 됨.
    //   - 단순 텍스트를 넘길 수도 있고, JSX 구조가 들어올 수도 있다.
    // - children prop 없이 컴포넌트 열림-닫힘 태그 사이에 무언가를 전달하면 리액트가 출력할 위치를 모르므로 무시해버린다.
    //   - 여기처럼 children을 받고 정의해서 사용하는 부분이 없으면 태그 사이에 작성된 내용이 렌더링되지 않는다.
    return (
      <li>
        <button>{children}</button>  {/* 파라미터에서 구조 분해를 사용하지 않는 경우 props.children으로 사용하면 된다. */}
      </li>
    );
}
