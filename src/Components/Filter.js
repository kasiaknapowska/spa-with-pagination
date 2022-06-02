import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProductsToDisplay } from "../Redux/changeProductsSlice";

export default function Filter({ setPage }) {
  const [filteredId, setFilteredId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.changeProducts.products);

  const filterById = (e) => {
    setFilteredId(e.target.value);
    setPage(0);
    if (e.target.value === "0") {
      dispatch(setProductsToDisplay(products));
      navigate("/");
    } else {
      const index = products.findIndex(
        (el) => el.id === parseInt(e.target.value)
      );
      dispatch(setProductsToDisplay(products.slice(index, index + 1)));
      navigate(`id-${e.target.value}`, { replace: true });
    }
  };

  return (
    <div className="filter">
      <label>Filter by ID</label>
      <input
        type="number"
        min="0"
        max={products && products.length}
        name="id"
        value={filteredId}
        placeholder="Write down ID"
        onChange={filterById}
      />
    </div>
  );
}
