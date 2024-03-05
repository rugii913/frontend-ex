import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import { CartContext } from './store/shopping-cart-context.jsx';

function App() {
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

  return (
    // <CartContext.Provider value={shoppingCart}> {/* {{ items: [] }} 였던 것을 상태와 연결시켜 동적으로 만든다. */}
    <CartContext.Provider value={ctxValue}> {/* 함수까지 함께 넘긴다. */}
      {/* 
      - shopping-cart-context의 CartContext에 { items: [] }을 준 것과는 별개로 여기 컨텍스트의 Provider에 꼭 value prop을 넣어줘야 동작한다. 
        - shopping-cart-context의 CartContext에 지정해준 것은 스키마 같은 거라고 생각하면 될 것 같다. - 자동 완성 등 잘 됨
        - 정확하게는 "The default value set when creating the context in only used if a component that was not wrapped by the Provider component tries to access the context value."라고 한다.
          - 즉, XxxContext.Provider 안에 있지 않은 컴포넌트가 컨텍스트 value에 접근할 때 사용되는 값
      */}
      {/* 특정 오브젝트 안에 중첩된 속성이 실질적인 컴포넌트가 되는 경우, 이런 식으로 Xxx.Yyy 역시 JSX 파일로 유효함 */}
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
