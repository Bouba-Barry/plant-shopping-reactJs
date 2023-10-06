import { useState } from "react";
import "../styles/cart.css";
const Cart = ({ cart, updateCart }) => {
  const [open, setOpen] = useState(false);
  const handleOpening = () => setOpen(!open);

  const removeItem = (name) => {
    updateCart(cart.filter((elt) => elt.name !== name));
  };

  const total = cart.reduce(
    (acc, plantType) => acc + plantType.amount * plantType.price,
    0
  );

  return (
    <div className="cart">
      <button onClick={handleOpening}>
        {!open ? "Ouvrir Panier" : "Fermer Panier"}
      </button>
      {open && (
        <div className="main">
          <h2>Votre Panier</h2>

          <div className="item">
            <ul>
              {cart.map(({ name, price, amount }, index) => (
                <div key={`${name}-${index}`}>
                  {name} {price}€ x {amount}
                  <button
                    className="plant-delete"
                    onClick={() => {
                      removeItem(name);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </ul>
            <h3>Total :{total}€</h3>
            <button onClick={() => updateCart([])}>Vider le panier</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
