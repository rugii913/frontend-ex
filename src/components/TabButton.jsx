export default function TabButton({ children, isSelected, ...props }) {
    // - children은 component의 특별한 prop
    //   - 아무 작업도 하지 않아도 children은 사실 받고 있다. 그러니 컴포넌트 태그에 일부러 children attribute를 명시하면 안 됨.
    //   - 단순 텍스트를 넘길 수도 있고, JSX 구조가 들어올 수도 있다.
    // - children prop 없이 컴포넌트 열림-닫힘 태그 사이에 무언가를 전달하면 리액트가 출력할 위치를 모르므로 무시해버린다.
    //   - 여기처럼 children을 받고 정의해서 사용하는 부분이 없으면 태그 사이에 작성된 내용이 렌더링되지 않는다.

    // document.querySelector("button").addEventListener("click", () => {})
    // 바닐라 JS처럼 위와 같은 방식은 사용 지양, 리액트로 작업할 때는 DOM과 직접 상호작용하는 명령형 코드를 작성하지 않는다.
    // DOM과의 상호작용은 리액트에게 맡긴다.

    console.log("TAP BUTTON COMPONENT EXECUTING");

    return (
      <li>
        <button className={isSelected ? "active" : undefined} {...props}>{children}</button>  {/* 파라미터에서 구조 분해를 사용하지 않는 경우 props.children으로 사용하면 된다. */}
        {/* 리액트에서는 해당 요소에 이벤트 리스너를 걸지 않고, attribute로 이벤트 리스너와 관련된 특별한 prop들을 추가해준다.*/}
        {/* 클래스는 class=.. 가 아니라 className prop을 이용하여 부여한다. */}
      </li>
    );
}
