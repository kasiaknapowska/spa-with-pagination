import { useState } from "react";

export default function Filter({ products, setProductsToDisplay, setPage }) {
  const [filteredId, setFilteredId] = useState("");

  const filterById = (e) => {
    setFilteredId(e.target.value);
    setPage(0);
    if (e.target.value === "0") {
      setProductsToDisplay(products);
    } else {
      const index = products.findIndex(
        (el) => el.id === parseInt(e.target.value)
      );
      setProductsToDisplay(products.slice(index, index + 1));
    }
  };

  return (
    <div className="filter">
      <label>Filter by ID</label>
      <input
        type="number"
        min="0"
        max={products.length}
        name="id"
        value={filteredId}
        placeholder="Write down ID"
        onChange={filterById}
      />
    </div>
  );
}
