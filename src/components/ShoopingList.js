import { useState } from "react";
import { plantList } from "../data/plantlist";
import Categories from "./Categories";
import PlantItem from "./PlantItem";
import "../styles/shoopingList.css";

function ShoopingList({ cart, updateCart }) {
  const [selectedCategorie, setSelectedCategorie] = useState("");

  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

  const addToCart = (name, price) => {
    const item = cart.find((elt) => elt.name === name);
    console.log("item : ", item);
    if (!item) {
      updateCart([...cart, { name, price, amount: 1 }]);
    } else {
      const updatedCart = cart.map((cartItem) =>
        cartItem.name === name
          ? { ...cartItem, amount: cartItem.amount + 1 }
          : cartItem
      );

      updateCart(updatedCart);
    }
  };

  return (
    <div className="lmj-shopping-list">
      <Categories
        listCategories={categories}
        selectedCategorie={selectedCategorie}
        setSelectedCategorie={setSelectedCategorie}
      />
      <div className="lmj-plant-list">
        {plantList.map((plant) =>
          !selectedCategorie || selectedCategorie === plant.category ? (
            <div key={plant.id}>
              <PlantItem
                cover={plant.cover}
                name={plant.name}
                water={plant.water}
                light={plant.light}
                price={plant.price}
              />
              <button
                className="btn-add"
                onClick={() => addToCart(plant.name, plant.price)}
              >
                Ajouter
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ShoopingList;
