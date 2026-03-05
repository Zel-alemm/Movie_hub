import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { styled } from "@mui/material/styles";

const SideNavigation = styled(BottomNavigation)({
  height: "70vh",
  width: "70px",
  position: "fixed",
  left: 5,
  top: 80,
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: 0,
  backgroundColor: "rgba(31, 31, 46, 0.5)", // semi-transparent
  borderRight: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  zIndex: 100,
  transition: "all 0.3s ease-in-out",
  "& .MuiBottomNavigationAction-root": {
    color: "white",
    margin: "10px 0",
    transition: "all 0.2s ease",
  },
  "& .MuiBottomNavigationAction-root:hover": {
    backgroundColor: "rgba(97, 122, 245, 0.2)", // lighter hover effect
    borderRadius: "6px",                        // slightly smaller rounding
  },
  "& .Mui-selected": {
    backgroundColor: "rgba(40, 37, 130, 0.4)", // lighter active effect
    color: "white",
    borderRadius: "6px",                        // slightly smaller rounding
  },
});

export default function MainNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <SideNavigation
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      showLabels
    >
      <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction label="TV" icon={<TvIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
    </SideNavigation>
  );
}