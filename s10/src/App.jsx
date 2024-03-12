import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
  

  return (
    // <CartContext.Provider value={shoppingCart}> {/* {{ items: [] }} 였던 것을 상태와 연결시켜 동적으로 만든다. */}
    <CartContextProvider> {/* 함수까지 함께 넘긴다. */}
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
