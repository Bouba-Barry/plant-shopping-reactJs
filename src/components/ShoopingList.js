import { useEffect, useState } from "react";
import Categories from "./Categories";
import PlantItem from "./PlantItem";
import "../styles/shoopingList.css";
import { useGetItems } from "../hooks/item/useGetItems";

function ShoopingList({ cart, updateCart }) {
  const { statusItems, plantList } = useGetItems();
  const [selectedCategorie, setSelectedCategorie] = useState("");

  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

  const addToCart = (id, name, price) => {
    const item = cart.find((elt) => elt.name === name);
    console.log("item : ", item);
    if (!item) {
      updateCart([...cart, { id, name, price, amount: 1 }]);
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
    <div className="shopping-list">
      {statusItems === "isLoading" && <div>loading the data</div>}
      {plantList.length > 0 && (
        <>
          <Categories
            listCategories={categories}
            selectedCategorie={selectedCategorie}
            setSelectedCategorie={setSelectedCategorie}
          />
          <div className="plant-list">
            {plantList.map((plant) =>
              !selectedCategorie || selectedCategorie === plant.category ? (
                <div key={plant._id}>
                  <PlantItem
                    cover={plant.cover}
                    name={plant.name}
                    water={plant.water}
                    light={plant.light}
                    price={plant.price}
                  />
                  <button
                    className="btn-add"
                    onClick={() =>
                      addToCart(plant._id, plant.name, plant.price)
                    }
                  >
                    Ajouter
                  </button>
                </div>
              ) : null
            )}
          </div>
        </>
      )}
      {statusItems === "error" && <div>Error while loading all data .....</div>}
    </div>
  );
}

export default ShoopingList;
