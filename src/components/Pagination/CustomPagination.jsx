import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function CustomPagination({ setPage, numOfPages = 10, currentPage = 1 }) {
  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value); // Debug log
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ marginTop: 4, marginBottom: 4 }}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          size="large"
          siblingCount={1}
          boundaryCount={2}
        />
      </ThemeProvider>
    </Stack>
  );
}