import { Box, Typography, IconButton } from "@mui/material";
import { Email } from "@mui/icons-material";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function ErrorElement() {
  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          height: "91vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Oops! This page is not available.
        </Typography>
        <Typography variant="body1">
          If you think this is a mistake, feel free to contact me.
        </Typography>
        <IconButton
          color="primary"
          component="a"
          href="mailto:ghazali.raydan@gmail.com"
          sx={{ fontSize: "24px" }}
        >
          <Email />
        </IconButton>
      </Box>
      <Footer></Footer>
    </>
  );
}