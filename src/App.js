import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const isIncuded = cart.every((eleman) => eleman.id !== item.id);
    console.log("isIncuded", isIncuded);
    let yeniCart = isIncuded ? [...cart, item] : [...cart];
    setCart(yeniCart);
  };

  const removeItem = (itemid) => {
    const filtelenmisItem = cart.filter((eleman) => eleman.id !== itemid);
    console.log("filtelenmisItem", filtelenmisItem);
    console.log("itemid", itemid);
    setCart(filtelenmisItem);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem, removeItem }}>
        <CartContext.Provider value={{ cart }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
