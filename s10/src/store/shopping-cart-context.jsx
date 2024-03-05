import { createContext, useState } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCard: () => {}, // 비어있는 dummy function, 스키마만 주기 위함
  updateItemQuantity: () => {},
}); // createContext로 만들어지는 값은 실은 리액트 컴포넌트를 포함한 객체임 - 그대로 대문자로 시작

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
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
