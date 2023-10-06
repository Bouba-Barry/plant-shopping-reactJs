import Sun from "../assets/sun.svg";
import Water from "../assets/water.svg";

function CareScale({ scaleValue, careType }) {
  const quantityLabel = {
    1: "peu",
    2: "modérément",
    3: "beaucoup",
  };

  const range = [1, 2, 3];
  return (
    <div
      onClick={() =>
        alert(
          `Cette plante requiert ${quantityLabel[scaleValue]} ${
            careType === "light" ? "de lumière" : "d'arrosage"
          }`
        )
      }
    >
      {range.map((myElt) =>
        scaleValue >= myElt ? (
          <span key={myElt.toString()}>
            {careType === "light" ? (
              <img src={Sun} alt="sun-icon" />
            ) : (
              <img src={Water} alt="water-icon" />
            )}
          </span>
        ) : null
      )}
    </div>
  );
}

export default CareScale;
