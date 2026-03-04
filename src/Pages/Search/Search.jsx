import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Search.css";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const darkTheme = createTheme({
    palette: { 
      mode: "dark", 
      primary: { main: "#fff" } 
    },
  });

  const fetchSearch = async () => {
    if (!searchText.trim()) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSearch();
  }, [type, page]);

  const handleSearch = () => {
    setPage(1);
    fetchSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            onClick={handleSearch} 
            variant="contained" 
            style={{ marginLeft: 10 }}
            disabled={!searchText.trim()}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          textColor="primary"
          indicatorColor="primary"
          aria-label="search tabs"
          sx={{ paddingBottom: 1 }}
        >
          <Tab label="Search Movies" sx={{ width: "50%" }} />
          <Tab label="Search TV Series" sx={{ width: "50%" }} />
        </Tabs>
      </ThemeProvider>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="trending">
          {content && content.length > 0 ? (
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))
          ) : (
            searchText && <h2>{type ? "No Series Found" : "No Movies Found"}</h2>
          )}
        </div>
      )}

      {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
    </div>
  );
};

export default Search;