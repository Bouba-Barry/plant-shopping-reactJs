import "./App.css";
import Banner from "./components/Banner";
import ShoopingList from "./components/ShoopingList";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import useInsertOrder from "./hooks/order/useInsertOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const { insertOrderMutation } = useInsertOrder();

  const userToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(userToken ? JSON.parse(userToken) : null);

  useEffect(() => {
    if (token !== undefined) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    if (cart !== undefined) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const orderCart = () => {
    console.log("my token : ", token);
    const order = {
      user: token ?? "",
      items: cart.map((item) => ({
        item: item.id,
        quantity: item.amount,
      })),
      total: cart.reduce(
        (acc, plantType) => acc + plantType.amount * plantType.price,
        0
      ),
      status: "pending",
    };
    if (token !== null) {
      insertOrderMutation.mutateAsync(order, {
        onSuccess: () => {
          toast.success("Order is successfully saved");
          setCart([]);
        },
        onError: () => {
          toast.error("Error during saving order....");
        },
      });
    } else {
      toast.error("Login first to save your order");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Banner />
        <div className="mainComponent">
          <Cart
            cart={cart}
            updateCart={setCart}
            orderCart={orderCart}
            token={token}
            setToken={setToken}
          />
          <ShoopingList cart={cart} updateCart={setCart} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
