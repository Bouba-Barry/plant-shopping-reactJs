import "../styles/plantItem.css";
import CareScale from "./CareScale";
export default function PlantItem({ name, cover, water, light, price }) {
  return (
    <li className="item">
      <span className="price">{price}€</span>
      <img className="cover" src={cover} alt={`${name} cover`} />
      {name}
      <CareScale careType="water" scaleValue={water} />
      <CareScale careType="light" scaleValue={light} />
    </li>
  );
}
