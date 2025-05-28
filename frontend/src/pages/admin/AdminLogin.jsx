import {Box, Button, Container, TextField, Typography} from "@mui/material";
import { useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import BlurText from "../../components/animated/BlurText.jsx";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("/api/admin/login", { username, password });
      setError(null);
      if (response.status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (error.response) {
        // The server responded with a status outside the 2xx range

        if (error.response.status === 401) {
          setError("Incorrect username or password");
        } else if (error.response.status === 500) {
          setError("Unable to access database, please try again later");
        } else if (error.response.status === 404) {
          setError("User not found");
        } else {
          setError("An unexpected error occurred, please try again later");
        }
      } else {
        setError("Server is unreachable");
      }
    }
  };

  return (
    <>
      <Navbar/>
      <Container
          sx={{
            position: "relative", height: "100dvh", minWidth: "100%",
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/src/assets/home-background.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              opacity: 0.8,
              zIndex: -1,
            },
          }}
      >
        <Box sx={{textAlign: "center", fontSize: "1rem", padding: {xs: "1rem",sm: "1.5rem", md: "2rem", lg: "3rem"},
          background: "rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 1)",
          backdropFilter: "blur(8px)",
          "-webkit-backdrop-filter": "blur(3.1px)",
          border: "2px solid rgba(0, 0, 0, 1)"}} >
          <Typography variant="h4" color="primary" sx={{textAlign: "center", fontWeight:"bold" ,margin: "3rem"}}>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px"}}>
            <TextField inputRef={usernameRef} label="Username" variant="outlined" name="username" sx={{width: {sx: "80%", md: "20rem"} }} />
            <TextField inputRef={passwordRef} label="Password" variant="outlined" type="password" name="password"  sx={{width: {sx: "80%", md: "20rem"}}}/>
            {
              error ? (
                  <>
                    <Typography variant="body1" color="#5c0000" sx={{textAlign: "center", fontWeight:"bold" ,margin: "30px"}}>
                      {error}.
                    </Typography>
                  </>
              ) :(null)
            }
            <Button variant="contained" type="submit" onSubmit={handleLogin}>Log In</Button>
          </Box>
        </form>

        </Box>
      </Container>
      <Footer/>

    </>
  );
};

export default AdminLogin;