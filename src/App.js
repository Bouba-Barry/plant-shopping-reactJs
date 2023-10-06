import logo from "./logo.svg";
import "./App.css";
import Banner from "./components/Banner";
import ShoopingList from "./components/ShoopingList";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <div className="App">
      <Banner />
      <div className="mainComponent">
        <Cart cart={cart} updateCart={setCart} />
        <ShoopingList cart={cart} updateCart={setCart} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
