import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import useGenre from "../../hooks/useGenre";
// import "./Movies.css";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies();
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>

      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />

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
                date={c.release_date}
                media_type="movie"
                vote_average={c.vote_average}
              />
            ))
          ) : (
            <h2 className="no-content">No Movies Found</h2>
          )}
        </div>
      )}

      {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
    </div>
  );
};

export default Movies;