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

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          color="primary"
          onChange={handlePageChange}
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </Stack>
  );
}