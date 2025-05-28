import {Typography, Container, Button, Avatar, Box} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom';
import "/src/styles/Home.css"
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Footer from "../components/Footer.jsx";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import logo from '../assets/icon.png';
import FadeContent from '../components/animated/FadeContent.jsx'
import BlurText from '../components/animated/BlurText.jsx';

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

  //TODO fix orders table, need to add delivery location if that was selected
  return (
    <>

      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <Navbar/>
      <Container id="section-1"
                 sx={{
                   backgroundColor: "black",
                   maxWidth: "100%", minWidth: "100%", minHeight: "100dvh",
                   display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                   margin: 0, padding: 0, position: "relative",
                 }}
      >
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
              opacity: 0.7,
              filter: "blur(5px)",
              zIndex: -1,
            },
          }}
        >
          <Typography variant="h3" sx={{color: "white", fontFamily: "caveat", marginBottom: {xs: "170px", md: "200px"}, textAlign: "center", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
            fontSize: { xs: "3rem", md: "4rem" }}}>
            <BlurText
              text="Homemade Nigerian food in Budapest!"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-5xl mb-8"
            />
          </Typography>
          <Button variant="contained" color="secondary" sx={{ marginRight: "30px", marginBottom: "30px", width: "180px", height: "50px", fontSize: "1rem"}} onClick={goToPage("order")}>
            <ShoppingCartIcon /> Order Now
          </Button>
          <Button variant="contained" color="primary" sx={{ marginRight: "30px", marginBottom: "30px" }} onClick={goToPage("menu")}>
            <RestaurantMenuIcon /> View Menu
          </Button>
        </Container>
      </Container>
      <Container
        id="section-2"
        sx={{
          color: "white",
          backgroundColor: "black",
          padding: 0,
          paddingTop: "50px",
          paddingBottom: "50px",
          minWidth: "100%",
          maxMargin: 0,
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr", lg: "1fr 0.7fr 1fr" },
        }}
      >

        <Carousel
          autoPlay
          interval={5000}
          indicators={false}
          navButtonsAlwaysVisible
          sx={{
            maxWidth: "500px",
            aspectRatio: "1 / 1.2",
            objectFit: "cover",
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ))}
        </Carousel>

        <Timeline
          position="right"
          sx={{
            paddingTop: "100px",
            fontFamily: "Caveat",
            display: { xs: "none", md: "none", lg: "block" },
            ml: "-120px",
          }}
        >
          {[
            "Select Items",
            "Select Delivery Method",
            "Select Delivery Time",
            "Place Order",
            "Repeat",
          ].map((text, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index < 4 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent
                sx={{
                  fontFamily: "Caveat",
                  fontSize: "20px",
                  ml: "-10px",
                  fontWeight: "bold",
                }}
              >
                {text}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column",
          paddingTop: { xs: "50px", md: "30px" },
        }}>
          <Typography
            variant="body1"
            sx={{
              paddingTop: { xs: "30px", md: "120px" },
              paddingRight: { xs: "none", sm: "none", md: "100px" },
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.8,
              fontWeight: 400,
              textAlign: "justify",
              maxWidth: "600px",
            }}
          >
            Experience a seamless journey through our interactive platform. From selecting your favorite items to placing an order, everything is designed for convenience and simplicity.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              paddingTop: { xs: "20px", md: "60px" },
              paddingLeft: { xs: "none", sm: "none", md: "10px" },
              paddingRight: { xs: "none", sm: "none", md: "100px" },
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.6,
              fontWeight: 400,
              textAlign: "justify",
              maxWidth: "600px",
            }}
          >
            Every great experience starts with a simple choice. Take control, select your favorites, and let us handle the rest. Smooth, fast, and effortless—just the way it should be.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={goToPage("menu")}
            sx={{marginTop: {xs: "50px", md: "60px"}}}
          >
            <RestaurantMenuIcon /> View Menu
          </Button>
        </Container>
      </Container>

      {/* Section 3 */}
      <Container id="section-3" sx={{ borderTop: "2px solid black", minWidth: "100%", position: "relative"}}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url(/src/assets/home-background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // Parallax effect
            opacity: 0.8,
            zIndex: -1,
          }}
        />

        <Container
          sx={{
            height: {xs: "25dvh", md:"40dvh"},
            minWidth: "100%",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            position: "relative",
          }}
        >
          <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "65px"}}>
            <ShoppingCartOutlinedIcon
              sx={{ height: { xs: "50px", md: "130px" }, width: { xs: "50px", md: "130px" } }}
            />
            <Typography variant={"h3"} sx={{color: "secondary", fontFamily: "caveat", fontSize: { xs: "2rem", md: "4rem" } }}>
              CHOOSE
            </Typography>
          </Container>

          <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column",  marginTop: "65px" }}>
            <DeliveryDiningOutlinedIcon
              sx={{ height: { xs: "50px", md: "130px" }, width: { xs: "50px", md: "130px" } }}
            />
            <Typography variant={"h3"} sx={{color: "secondary", fontFamily: "caveat", fontSize: { xs: "2rem", md: "4rem" } }}>
              ORDER
            </Typography>
          </Container>

          <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column",  marginTop: "65px" }}>
            <RestaurantOutlinedIcon
              sx={{ height: { xs: "50px", md: "130px" }, width: { xs: "50px", md: "130px" } }}
            />
            <Typography variant={"h3"} sx={{color: "secondary", fontFamily: "caveat", fontSize: { xs: "2rem", md: "4rem" } }}>
              EAT
            </Typography>
          </Container>
        </Container>
      </Container>

      <Container
        id={"section-4"}
        sx={{
          minHeight: "100dvh",
          textAlign: "center",
          padding: { xs: "20px", sm: "40px", md: "60px" },
        }}
      >
        <Container sx={{display: "grid", gridTemplateColumns: "0.5fr 3fr",
          marginTop: { xs: "120px", sm: "20px", md: "100px" },
        }}>
          <Avatar
            onClick={goToPage("")}
            src={logo}
            alt="-logo-"
            sx={{ cursor: "pointer", backgroundColor: "grey",
              marginTop: { xs: "15px", sm: "20px", md: "50px" },
              width: { xs: "100px", md: "200px" },
              height: { xs: "100px", md: "200px" },

          }}
          />
          <Typography
            variant={"h1"}
            sx={{
              fontFamily: "Caveat",
              color: "grey",
              fontSize: { xs: "3rem", md: "4rem" },
              fontWeight: "bold",
              marginTop: { xs: "35px", sm: "20px", md: "100px" },
              marginBottom: { xs: "15px", sm: "20px", md: "100px" },
            }}
          >
            About Me
          </Typography>
        </Container>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Typography
            variant={"h6"}
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              lineHeight: 1.8,
              color: "text.primary",
              maxWidth: "800px",
              marginTop: { xs: "80px", sm: "20px", md: "100px" },
            }}
          >
            I’m a Nigerian woman studying in Budapest, and I’ve turned my passion for cooking into a small home-based restaurant. Missing the flavors of home, I decided to share the authentic tastes of Nigeria with my new community. From jollof rice to pounded yam, I prepare each dish with love and care, using fresh, locally sourced ingredients. My food is more than just a meal – it’s a way to bring a piece of Nigerian culture to Budapest. Through my cooking, I’m building connections and offering not just food, but a taste of home for anyone craving something different.
          </Typography>
        </Box>

        <Button variant="contained" color="secondary" sx={{ marginRight: "30px", marginBottom: "30px",
          marginTop: { xs: "80px", sm: "20px", md: "150px" },

        }} onClick={goToPage("order")}>
          <RestaurantMenuIcon /> Try My Food
        </Button>

      </Container>


      <Footer></Footer>
      </FadeContent>

    </>
  );
};

export default HomePage;
