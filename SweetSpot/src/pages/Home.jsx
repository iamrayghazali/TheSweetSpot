import {Typography, Container, Button} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom';
import "/src/styles/Home.css"
import useMediaQuery from "@mui/material/useMediaQuery";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Footer from "../components/Footer.jsx";

const images = [
  '/src/assets/carousel/food1.png',
  '/src/assets/carousel/food2.png',
  '/src/assets/carousel/food3.png',
  '/src/assets/carousel/food4.png',
];

const HomePage = () => {
  const navigate = useNavigate();
  const goToPage = (page) => () => {
    navigate(`/${page}`);
  };
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const fetchLastInstagramPost = async () => {
    const username = "the.sweet.spot.budapest"
    try {
      const response = await fetch(`https://instagram.com/${username}/?__a=1`);
      const data = await response.json();
      console.log(data);
      ;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar/>
        <Container id={"section-1"} sx={{ minWidth: "100%", backgroundColor: "#1c1c1e", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            {/*TODO CREATE SMALL SCREEN AND DESKTOP IMAGE KEEPING IN MIND THE TWO BUTTONS*/}

            <Button variant="contained" color="secondary" style={{marginRight: "10px", marginBottom: "10px"}}
                    onClick={goToPage("order")}>
              <ShoppingCartIcon/> Order Now
            </Button>
            <Button variant="contained" color="primary" style={{marginRight: "10px", marginBottom: "10px"}}
                    onClick={goToPage("menu")}>
              <RestaurantMenuIcon/> View Menu
            </Button>
          </Container>


        <Container id={"section-2"} sx={{
          backgroundColor: "primary",
          paddingTop: "50px",
          paddingBottom: "50px",
          minWidth: "100%",
          margin: {xs: "none", md: "20px"},
          display: "grid",
          gridTemplateColumns: {xs: "1fr", md: "1fr 0.7fr 1fr"},
          border: {xs: "none", md: "3px solid white"},
        }} >
          <Carousel
            //autoPlay
            interval={3000}
            indicators={false}
            navButtonsAlwaysVisible
            sx={{
              maxWidth: "500px",
              aspectRatio: "1 / 1.2", // Ensures it's a square
              objectFit: "cover",
            }}          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }} // Set fixed height
              />
            ))}
          </Carousel>

          <Timeline
            position="right"
            sx={{
              paddingTop: "100px",
              fontFamily: "Caveat",
              display: { xs: "none", md: "block" },
              ml: "-120px", // Moves everything left
            }}
          >
            {[
              "Select Items",
              "Select Delivery Method",
              "Select Delivery Time",
              "Place Order",
              "Repeat"
            ].map((text, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot />
                  {index < 4 && <TimelineConnector />} {/* Keeps lines between steps */}
                </TimelineSeparator>
                <TimelineContent sx={{ fontFamily: "Caveat", fontSize: "20px", ml: "-10px", fontWeight: "bold"}}>
                  {text}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <Container sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Typography
              variant="body1"
              sx={{
                paddingTop: {sx: "none", md: "120px"},
                paddingRight: {sx: "none", sm: "none",  md: "100px"},
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.8,
                color: "text.primary",
                fontWeight: 400,
                textAlign: "justify",
                maxWidth: "600px"
              }}
            >
              Experience a seamless journey through our interactive platform.
              From selecting your favorite items to placing an order, everything is
              designed for convenience and simplicity.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                paddingTop: {sx: "none", md: "60px"},
                paddingLeft: {sx: "none", sm: "none", md: "10px"},
                paddingRight: {sx: "none", sm: "none",  md: "100px"},
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.6,
                color: "text.primary",
                fontWeight: 400,
                textAlign: "justify",
                maxWidth: "600px"
              }}
            >
              Every great experience starts with a simple choice.
              Take control, select your favorites, and let us handle the rest.
              Smooth, fast, and effortless—just the way it should be.
            </Typography>

            <Button variant="contained" color="primary" style={{ }}
                    onClick={goToPage("menu")}>
              <RestaurantMenuIcon/> View Menu
            </Button>
          </Container>

        </Container>


      <Container id={"section-3"} >

      </Container>

      <Container id={"section-4"} >

      </Container>

      {/*TODO*/}
          {/*<button onClick={fetchLastInstagramPost}>Get instagram post</button>*/}

        {/*      TODO FOOTER*/}
      <Footer></Footer>
    </>
  );
};

export default HomePage;
