import "./App.scss";
import { useState, useEffect } from "react";
import { getData } from "./API/fetchFunc";
import Filter from "./Components/Filter";
import Products from "./Components/Products";
import { useNavigate, useParams } from "react-router-dom";

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [emptyRows, setEmptyRows] = useState(0);

  const navigate = useNavigate();
  const { param } = useParams();


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
    if (newPage === 0) {
      navigate("/");
    } else {
      navigate(`pg-${newPage + 1}`, { replace: true });
    }
  };

  useEffect(() => {
    setEmptyRows(
      rowsPerPage -
        Math.min(rowsPerPage, productsToDisplay.length - page * rowsPerPage)
    );
  }, [productsToDisplay, page]);


  useEffect(() => {
    if (param && param.slice(0, 3) === "id-") {
      setProductsToDisplay(products.filter(el => el.id === parseInt(param.slice(3))));
    } else if (param && param.slice(0, 3) === "pg-" && param.slice(3) <= 2) {
      setPage(parseInt(param.slice(3)) - 1)
    }
    
  }, [param, products])


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
