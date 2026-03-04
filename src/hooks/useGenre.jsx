const useGenre = (selectedGenres) => {
  if (!selectedGenres || selectedGenres.length === 0) return "";

  // Join all selected genre IDs into a comma-separated string
  return selectedGenres.map((g) => g.id).join(",");
};

export default useGenre;