import { createContext } from 'react';

export const CartContext = createContext({
  items: []
}); // createContext로 만들어지는 값은 실은 리액트 컴포넌트를 포함한 객체임 - 그대로 대문자로 시작
