import { useState } from "react";
import "../styles/cart.css";
import UserInfo from "./UserInfo";
const Cart = ({ cart, updateCart, orderCart, token, setToken }) => {
  const [open, setOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleShowingForm = () => setShowForm(!showForm);

  const handleOpening = () => setOpen(!open);
  const removeItem = (name) => {
    updateCart(cart.filter((elt) => elt.name !== name));
  };
  const handleOrder = () => {
    if (token !== null) {
      orderCart();
    } else {
      handleShowingForm();
    }
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
        <>
          <div className="main">
            <h2>Votre Panier</h2>

            <div className="item">
              <ul>
                {cart.length > 0 ? (
                  cart.map(({ name, price, amount }, index) => (
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
                  ))
                ) : (
                  <div>votre Panier est vide ! Aller Commander ! </div>
                )}
              </ul>
              <h3>Total :{total}€</h3>
              <div style={{ display: "flex" }}>
                <div>
                  <button
                    style={{ marginTop: "15px" }}
                    onClick={() => updateCart([])}
                  >
                    Vider le panier
                  </button>
                </div>
                <div>
                  <button
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    onClick={() => handleOrder()}
                  >
                    enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {showForm && (
              <UserInfo
                handleUserIsLogged={handleShowingForm}
                setToken={setToken}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
