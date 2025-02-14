import { Container, Box, Typography, IconButton, Link } from "@mui/material";
import { Instagram, Email } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const goToPage = (page) => () => {
    navigate(`/${page}`);
  };
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 3,
        mt: 4
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Left Section */}
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          The Sweet Spot © {new Date().getFullYear()}
        </Typography>

        {/* Center Section - Made by & Email */}
        <Typography variant="body2" sx={{ mt: { xs: 1, md: 0 } }}>
          Made by <strong>Ray Ghazali</strong> |
          <Link href="mailto:ghazali.raydan@gmail.com" color="inherit" sx={{ ml: 1 }}>
            ghazali.raydan@gmail.com
          </Link>
        </Typography>

        {/* Right Section - Social Icon */}
        <Box>
          <IconButton color="inherit" component="a" href="mailto:your.email@example.com">
            <Email />
          </IconButton>
          <IconButton color="inherit" component="a" href="https://www.instagram.com/the.sweet.spot.budapest/" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}