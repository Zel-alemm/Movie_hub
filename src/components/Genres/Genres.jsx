import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({ 
  selectedGenres, 
  setSelectedGenres, 
  genres, 
  setGenres, 
  type, 
  setPage 
}) => {
  
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]); // cleanup
    };
  }, [type]);

  return (
    <div style={{ padding: "6px 0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {/* Selected Genres */}
      {selectedGenres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
          sx={{
            backgroundColor: "#ff3d00",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
            "&:hover": {
              backgroundColor: "#ff5722",
              transform: "scale(1.05)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
            },
          }}
        />
      ))}

      {/* Available Genres */}
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
          sx={{
            backgroundColor: "#3a3f4f",
            color: "#fff",
            fontWeight: 500,
            fontSize: "0.85rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#5c6370",
              transform: "scale(1.05)",
              boxShadow: "0 3px 8px rgba(0,0,0,0.4)"
            },
          }}
        />
      ))}
    </div>
  );
};

export default Genres;