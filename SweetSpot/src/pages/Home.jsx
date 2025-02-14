import {Typography, Container, Button} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom';
import "/src/styles/Home.css"
import useMediaQuery from "@mui/material/useMediaQuery";

const images = [
  '/src/assets/chef.jpg',
  '/src/assets/food.jpg',
  '/src/assets/chef.jpg',
  '/src/assets/food5.jpeg',
  '/src/assets/hamburger.jpg',
];

const HomePage = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const goToPage = (page) => () => {
    navigate(`/${page}`);
  };

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
      <div id="home-page">
          {isSmallScreen ? (
            <>
              {/* SMALL SCREEN */}

              {/*TODO CHANGE FONT SIZE*/}
              <Container maxWidth="100%"
                         style={{textAlign: "center", flexGrow: 1, paddingLeft: "0", paddingRight: "0"}}>
                {/* TITLE */}
                <Typography className={"text-shadow"} color="primary" variant="h4" gutterBottom
                            style={{marginTop: "15px"}}>
                  <div className='small-text'>The best</div>
                  <div className='highlight-pink'>HOMEMADE</div>
                  <div className='highlight-green'>NIGERIAN</div>
                  <div className='small-text'>food in Budapest!</div>
                </Typography>

                {/* Image Slideshow */}
                <Carousel
                  autoPlay
                  interval={2500}
                  indicators={true}
                  style={{margin: "0"}}
                >
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Slide ${index + 1}`}
                      style={{width: "100%", height: "400px", objectFit: "cover"}} // Set fixed height
                    />
                  ))}
                </Carousel>

                <Typography color="textSecondary" variant="body1" gutterBottom
                            style={{margin: "30px", fontWeight: "500", fontSize: "1.2rem"}}>
                  Experience the rich flavors and vibrant culture of Nigeria right here in the heart of Budapest.
                </Typography>

                <div style={{bottom: '0', width: '100%'}}>
                  <Button variant="contained" color="secondary"
                          style={{marginRight: "10px", marginBottom: "10px", width: "50%"}} onClick={goToPage("order")}>
                    <ShoppingCartIcon/> Order Now
                  </Button>
                  <Button variant="contained" color="primary"
                          style={{marginRight: "10px", marginBottom: "10px", width: "50%"}} onClick={goToPage("menu")}>
                    <RestaurantMenuIcon/> View Menu
                  </Button>
                </div>
              </Container>
              <Container>

                {/*TODO*/}
                {/*<button onClick={fetchLastInstagramPost}>Get instagram post</button>*/}
              </Container>
            </>
          ) : (
            <>
              {/* BIG SCREEN */}
              <Typography className={"text-shadow"} color="primary" variant="h4" gutterBottom
                          style={{width: "70%", textAlign: "center", marginBottom: "60px"}}>
                <div className='white-text' style={{display: 'inline', fontWeight: 1000}}>The best</div>
                <div className='highlight-pink padding-left-right-6px' style={{display: 'inline'}}>HOMEMADE</div>
                <div className='highlight-green padding-left-right-6px' style={{display: 'inline'}}>NIGERIAN</div>
                <div className='white-text' style={{display: 'inline', fontWeight: 1000}}>food in Budapest!</div>
              </Typography>
              <div className={"desktop-view-home"}>
                <div className={"left-side"}>
                  {/* Image Slideshow */}
                  <Carousel
                    autoPlay
                    interval={2500}
                    indicators={false}
                    style={{margin: "20px 0"}}
                  >
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: '2px solid white'
                        }} // Set fixed height
                      />
                    ))}
                  </Carousel>
                </div>
                <div className={"right-side"}>
                  <Container maxWidth="sm" style={{textAlign: "center", padding: "20px", flexGrow: 1}}>
                    <div className={"glass"} >
                      <Typography color="textSecondary" variant="h6" gutterBottom style={{fontWeight: "bold", margin: "10px", padding: "10px", color: "white"}}>
                        Experience the vibrant culture and
                        <div className={"highlight-pink text-shadow padding-left-right-6px"} style={{display: 'inline'}}>rich flavors</div>
                        of
                        <div className={"highlight-green text-shadow padding-left-right-6px"} style={{display: 'inline'}}>homemade food of Nigeria</div>
                        in the heart of Budapest.
                      </Typography>
                    </div>


                    <div style={{marginTop: "50px", position: 'relative', bottom: '0', width: '100%'}}>
                      <Button variant="contained" color="secondary" style={{marginRight: "10px", marginBottom: "10px"}}
                              onClick={goToPage("order")}>
                        <ShoppingCartIcon/> Order Now
                      </Button>
                      <Button variant="contained" color="primary" style={{marginRight: "10px", marginBottom: "10px"}}
                              onClick={goToPage("menu")}>
                        <RestaurantMenuIcon/> View Menu
                      </Button>
                    </div>
                  </Container>
                </div>
              </div>
              <Container>

                {/*TODO*/}
                {/*<button onClick={fetchLastInstagramPost}>Get instagram post</button>*/}
              </Container>
            </>
          )
          }



        {/*      TODO FOOTER*/}

      </div>
    </>
  );
};

export default HomePage;
