import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Trending.css";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      console.log("Fetching page:", page);
      
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_APP_API_KEY}&page=${page}`
      );
      
      console.log("API Response:", data);
      
      // Ensure each item has a media_type
      const resultsWithMediaType = data.results.map(item => ({
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv')
      }));
      
      setContent(resultsWithMediaType);
      setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (error) {
      console.error("Error fetching trending:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="trending">
          {content.length > 0 ? (
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))
          ) : (
            <h2 className="no-content">No trending content found.</h2>
          )}
        </div>
      )}

      {numOfPages > 1 && (
        <CustomPagination 
          setPage={setPage} 
          numOfPages={numOfPages} 
          currentPage={page}
        />
      )}
    </div>
  );
};

export default Trending;