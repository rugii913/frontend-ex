// import { styled } from "styled-components";

/* 
- styled components를 사용했을 때
  - 장점: 추가하기 쉽다, 리액트 안에서 계속 작업할 수 있다(컴포넌트와 거의 같음), 스코핑 명확함
  - 단점: CSS를 꼭 알아야만 한다, 리액트와 CSS 코드를 분리하기 어렵다, 작은 wrapper 컴포넌트가 많이 생긴다(꼭 나쁜 건 아님, 재사용하기에 좋은 경우도 있긴 함)
*/

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 700;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: ${({$invalid}) => $invalid ? "#f87171" : "#6b7280"};
// `;
// // 위 동적인 스타일링은 JS tagged template과도 연관됨

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   line-height: 1.5;
//   background-color: ${({$invalid}) => $invalid ? "#fed2d2" : "#d1d5db"};
//   color: ${({$invalid}) => $invalid ? "#ef4444" : "#374151"};
//   border: 1px solid ${({$invalid}) => $invalid ? "#f73f3f" : "transparent"};
//   border-radius: 0.25rem;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// `;

// export default function CustomInput({label, invalid, ...props}) {
//   return (
//     <p>
//       <Label $invalid={invalid}>{label}</Label>
//       <Input $invalid={invalid} {...props} />
//     </p>
//   );
// }

/* 
- tailwindcss를 사용했을 때
  - 장점: CSS를 몰라도 된다, 빠른 개발 속도, 자동 완성 도움 받을 수 있음, 스타일끼리 충돌 가능성 거의 없음, 커스터마이징도 가능은 함
  - 단점: JSX 코드에 뭔가를 추가해야 한다(JSX와 스타일 간 분리가 안 됨),
          클래스 이름이 너무 길어진다(하지만 보통 상위 컴포넌트에서는 스타일 때문에 클래스 이름이 길어지는 경우가 거의 없음)
          작은 래퍼 컴포넌트들이 많아진다(하지만 리액트에서는 오히려 당연한 부분임)
*/
export default function Input({label, invalid, ...props}) {
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase"
  let inputClasses = "w-full px-3 py-2 leading-tight  border rounded shadow"

  if (invalid) {
    labelClasses += " text-red-400";
    inputClasses += " text-red-500 bg-red-100 border-red-300";
  } else {
    labelClasses += " text-stone-300"
    inputClasses += " text-gray-700 bg-stone-300";
  }

  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} {...props} />
    </p>
  );
}
