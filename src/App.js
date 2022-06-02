import "./App.scss";
import { useState, useEffect } from "react";
import { getData } from "./API/fetchFunc";
import Filter from "./Components/Filter";
import Products from "./Components/Products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [emptyRows, setEmptyRows] = useState(0);

  useEffect(() => {
    getData((data) => {
      setProducts(data.data);
      setProductsToDisplay(data.data);
      setRowsPerPage(data.per_page - 1);
    });
    setIsLoading(false);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setEmptyRows(
      rowsPerPage -
        Math.min(rowsPerPage, productsToDisplay.length - page * rowsPerPage)
    );
  }, [productsToDisplay, page]);

  return (
    <div className="App">
      <Filter
        products={products}
        setProductsToDisplay={setProductsToDisplay}
        setPage={setPage}
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <Products
          productsToDisplay={productsToDisplay}
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
}
