import "../styles/categorie.css";
function Categories({
  listCategories,
  selectedCategorie,
  setSelectedCategorie,
}) {
  const Reset = () => {
    setSelectedCategorie("");
  };
  return (
    <div className="cat">
      <h1>Nos categories</h1>
      <select
        className="cat-select "
        value={selectedCategorie}
        onChange={(e) => {
          setSelectedCategorie(e.target.value);
        }}
      >
        <option value={selectedCategorie}>---</option>
        {listCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={() => Reset()}>Réinitialiser</button>
    </div>
  );
}

export default Categories;
