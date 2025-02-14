import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from '../assets/icon.png';

const Navbar = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close

  const goToPage = (page) => () => {
    navigate(`/${page}`);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{width: 150, backgroundColor: "primary.main", color: "secondary.main", height: "100%", borderLeft: "2px solid white"}} // Width of the drawer
      role="presentation"
      onClick={toggleDrawer(false)} // Close drawer on item click
      onKeyDown={toggleDrawer(false)} // Close drawer on key press
    >
      <List style={{fontWeight: "bold"}}>
        <ListItem onClick={goToPage("")} style={{borderBottom: "1px solid secondary.main"}}>
          <HomeIcon style={{color: "white", marginRight: "3px"}}/>
          <Typography variant="h6" style={{fontWeight: "bold", margin: "15px"}}>
            Home
          </Typography>
        </ListItem>
        <ListItem onClick={goToPage("menu")}>
          <RestaurantMenuIcon style={{color: "white", marginRight: "3px"}}/>
          <Typography variant="h6" style={{fontWeight: "bold", margin: "15px"}}>
            Menu
          </Typography>
        </ListItem>
        <ListItem onClick={goToPage("order")}>
          <ShoppingCartIcon style={{color: "white", marginRight: "3px"}}/>
          <Typography variant="h6" style={{fontWeight: "bold", margin: "15px"}}>
            Order
          </Typography>
        </ListItem>
        <ListItem>
          <a href="https://www.instagram.com/the.sweet.spot.budapest/" target="_blank"
             style={{display: "flex", alignItems: "center", textDecoration: "none", color: "inherit"}}>
            <InstagramIcon style={{color: "white", marginRight: "3px"}}/>
            <Typography style={{fontWeight: "bold", margin: "15px"}}>Instagram</Typography>
          </a>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed" style={{height: "70px", background: "transparent", backdropFilter: "blur(10px)", borderBottom: "1px solid #0000020"}}>
        <Toolbar>
          <img
            onClick={goToPage("")}
            src={logo}
            alt="-logo-"
            style={{marginRight: "10px", height: "40px", cursor: "pointer"}} // Adjust the height and margin as needed
          />
          <Typography onClick={goToPage("")} color="secondary" variant="h4" component="div" sx={{
            flexGrow: 1, fontWeight: "bold", cursor: "pointer", textShadow: `
      3px 3px 8px rgba(0, 0, 0, 0.9),  /* Strong dark shadow */
      -3px -3px 8px rgba(0, 0, 0, 0.9), /* Mirror shadow for better contrast */
      0px 0px 12px rgba(0, 0, 0, 1)  /* Extra glow effect */
    `, fontFamily: "Caveat"
          }}>
            The Sweet Spot
          </Typography>

          {isSmallScreen ? (
            <>
              <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon/>
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
              </Drawer>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={goToPage("")}
                sx={{
                  backgroundColor: "primary.main",
                  marginLeft: "15px",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={goToPage("menu")}
                sx={{
                  backgroundColor: "primary.main",
                  marginLeft: "15px",

                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Menu
              </Button>
              <Button
                color="inherit"
                onClick={goToPage("order")}
                sx={{
                  backgroundColor: "primary.main",
                  marginLeft: "15px",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Order
              </Button>
              <Button href="https://www.instagram.com/the.sweet.spot.budapest/">
                <InstagramIcon style={{color: "white", marginRight: "3px", paddingRight: "3px"}}></InstagramIcon>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
