import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCard: () => {}, // 비어있는 dummy function, 스키마만 주기 위함
  updateItemQuantity: () => {},
}); // createContext로 만들어지는 값은 실은 리액트 컴포넌트를 포함한 객체임 - 그대로 대문자로 시작

function shoppingCartReducer(state, action) {
  // 앞서 만든 값, 속성에 직접 접근할 필요가 없는 함수이며, 함수를 매번 재생성하지 않기 위해 컴포넌트 함수 바깥에 만들어줌
  // 직접 접근하지 않고, useReducer에 전달되어 그 곳에서 값을 받는다.
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items]; // 항상 메모리에 있는 값을 직접 바꾸지 말아라, ...으로 복사해서 사용해라

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      // ...state, // 만약 다른 상태들도 있었다면, 다른 상태는 변경하지 않도록 처리
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      // ...state, // 만약 다른 상태들도 있었다면, 다른 상태는 변경하지 않도록 처리
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM", // 대문자에 _ 사용은 관습, 소문자에 - 사용해도 상관은 없다.
      payload: id, // 보통 payload라 많이 씀, id라 해도 상관 없다.
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId, // productId: productId, // JS 문법: 속성 이름이 변수 이름과 같으면 속성 이름 명시 안 해줘도 알아서 객체로 담음
        amount, // amount: amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCard: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  // 렌더링 가능한 뭔가를 갖고 리턴해야 한다.
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    /* 
    - shopping-cart-context의 CartContext에 { items: [] }을 준 것과는 별개로 여기 컨텍스트의 Provider에 꼭 value prop을 넣어줘야 동작한다. 
      - shopping-cart-context의 CartContext에 지정해준 것은 스키마 같은 거라고 생각하면 될 것 같다. - 자동 완성 등 잘 됨
      - 정확하게는 "The default value set when creating the context in only used if a component that was not wrapped by the Provider component tries to access the context value."라고 한다.
        - 즉, XxxContext.Provider 안에 있지 않은 컴포넌트가 컨텍스트 value에 접근할 때 사용되는 값
    */
    /* 특정 오브젝트 안에 중첩된 속성이 실질적인 컴포넌트가 되는 경우, 이런 식으로 Xxx.Yyy 역시 JSX 파일로 유효함 */
  );
}
