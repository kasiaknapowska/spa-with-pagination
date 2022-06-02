import "./App.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "./API/fetchFunc";
import Filter from "./Components/Filter";
import Products from "./Components/Products";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, setProductsToDisplay } from "./Redux/changeProductsSlice";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(null);
  const [emptyRows, setEmptyRows] = useState(0);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.changeProducts.products);
  const productsToDisplay = useSelector(
    (state) => state.changeProducts.productsToDisplay
  );

  const navigate = useNavigate();
  const { param } = useParams();

  useEffect(() => {
    getData((data) => {
      dispatch(setProducts(data.data));
      dispatch(setProductsToDisplay(data.data));
      setRowsPerPage(data.per_page - 1);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setEmptyRows(
      rowsPerPage -
        Math.min(rowsPerPage, productsToDisplay.length - page * rowsPerPage)
    );
  }, [productsToDisplay, page]);

  useEffect(() => {
    if (param && param.slice(0, 3) === "id-") {
      dispatch(
        setProductsToDisplay(
          products.filter((el) => el.id === parseInt(param.slice(3)))
        )
      );
    } else if (
      param &&
      param.slice(0, 3) === "pg-" &&
      products &&
      rowsPerPage &&
      param.slice(3) <= Math.ceil(products.length / rowsPerPage)
    ) {
      setPage(parseInt(param.slice(3)) - 1);
    } else if (
      param &&
      param.slice(0, 3) === "pg-" &&
      products &&
      rowsPerPage &&
      param.slice(3) > Math.ceil(products.length / rowsPerPage)
    ) {
      dispatch(setProductsToDisplay([]));
    }
  }, [param, products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage === 0) {
      navigate("/");
    } else {
      navigate(`pg-${newPage + 1}`, { replace: true });
    }
  };

  return (
    <div className="App">
      <Filter setPage={setPage} />
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <Products
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
}
