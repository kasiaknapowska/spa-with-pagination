import "./App.scss";
import { useState, useEffect } from "react";
import { getData } from "./API/fetchFunc";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { TableRow, TableCell, TableBody } from "@mui/material";

function App() {
  const [products, setProducts] = useState(null);
  const [filterById, setFilterById] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData((data) => setProducts(data.data));
    setIsLoading(false);
  }, []);

  console.log(products);

  return (
    <div className="App">
      <div className="filter">
        <label>Filter by ID</label>
        <input
          type="number"
          min="0"
          max={products && products.length}
          name="id"
          value={filterById}
          placeholder="Write down ID"
          onChange={(e) => setFilterById(e.target.value)}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <TableContainer>
          <Table
            sx={{ minWidth: 200, maxWidth: 600, marginTop: "2rem" }}
            aria-label="simple table"
          >
            <TableBody>
              {products &&
                products
                  .filter((product) => {
                    if (!filterById || filterById === "0") {
                      return product;
                    } else {
                      return product.id === parseInt(filterById);
                    }
                  })
                  .map((product) => {
                    return (
                      <TableRow
                        key={product.id}
                        style={{ backgroundColor: product.color }}
                      >
                        <TableCell align="center" style={{ color: "white" }}>
                          {product.id}
                        </TableCell>
                        <TableCell align="center" style={{ color: "white" }}>
                          {product.name}
                        </TableCell>
                        <TableCell align="center" style={{ color: "white" }}>
                          {product.year}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default App;
