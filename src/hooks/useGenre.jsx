const useGenre = (selectedGenres) => {
  if (!selectedGenres || selectedGenres.length === 0) return "";

  // Join all selected genre IDs into a comma-separated string
  const genreIds = selectedGenres.map((g) => g.id).join(",");
  return genreIds;
};

export default useGenre;