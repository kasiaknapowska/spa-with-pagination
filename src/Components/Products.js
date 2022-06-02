import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

export default function Products({
  productsToDisplay,
  page,
  rowsPerPage,
  emptyRows,
  handleChangePage,
}) {
  return (
    <TableContainer>
      <Table sx={{ mt: "2rem" }} aria-label="simple table">
        <TableBody>
          {productsToDisplay &&
            productsToDisplay
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow
                    key={product.id}
                    sx={{ backgroundColor: product.color }}
                  >
                    <TableCell
                      align="center"
                      style={{ color: "white", width: "20%" }}
                    >
                      {product.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: "40%" }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: "40%" }}
                    >
                      {product.year}
                    </TableCell>
                  </TableRow>
                );
              })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 52 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {productsToDisplay && rowsPerPage && (
        <TablePagination
          component="div"
          count={productsToDisplay.length}
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          page={page}
        />
      )}
    </TableContainer>
  );
}
