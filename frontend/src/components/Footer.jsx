import {Container, Box, Typography, IconButton, Link} from "@mui/material";
import {Instagram, Email} from "@mui/icons-material";

export default function Footer() {

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: 4
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: {xs: "column", md: "row"},
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="body1" sx={{fontWeight: "bold"}}>
          The Sweet Spot © {new Date().getFullYear()}
        </Typography>

        <Typography variant="body2" sx={{mt: {xs: 1, md: 0}}}>
          Made by <strong>this guy</strong> |
          <Link href="mailto:ghazali.raydan@gmail.com" color="inherit" sx={{ml: 1}}>
            ghazali.raydan@gmail.com
          </Link>
        </Typography>

        <Box>
            {/*TODO: Change email href */}
          <IconButton color="inherit" component="a" href="mailto:your.email@example.com">
            <Email/>
          </IconButton>
          <IconButton color="inherit" component="a" href="https://www.instagram.com/the.sweet.spot.budapest/" target="_blank" rel="noopener noreferrer">
            <Instagram/>
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}