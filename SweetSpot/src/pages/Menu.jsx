import Navbar from "../components/Navbar";
import MenuItemCard from "../components/MenuItemCard";
import {Box, Container, Typography} from "@mui/material";
import "/src/index.css"
import "/src/styles/Menu.css"

import { menuItems } from "../components/menu";

export default function Menu() {
  return (
    <>
    <div id="menu-page">
      <Navbar />

      <Container sx={{minWidth: "100%" ,backgroundImage: "url(/src/assets/menu-text-bg.png)", minHeight: "150px",backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", borderBottom: "3px solid black"}}>
        <Typography variant="h1" color="white" gutterBottom sx={{paddingTop: "50px", paddingBottom: "0px", fontWeight: "400",textAlign: "center", fontFamily: "Caveat"}}>
          Our Menu
        </Typography>
        <Typography variant={"h4"} color="white" sx={{textAlign: "center", fontFamily: "Lato", fontWeight: "400", paddingBottom: "50px"}}>
          Fresh, homemade Nigerian food
        </Typography>

      </Container>

      <Container
        sx={{
          backgroundColor: "#1c1c1e", // Dark background for contrast
          borderRadius: "15px",
          padding: "40px 20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          marginTop: "20px",
          maxWidth: "90%",
        }}
      >

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {menuItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '1 1 100%',// full width for xs
                    '@media (min-width:600px)': {
                      flex: '1 1 33.33%', // 50% width for sm
                    },
                    '@media (min-width:800px)': {
                      flex: '1 1 33.33%', // 33.33% width for md
                    },
                  }}
                >
                  <MenuItemCard
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    cardImage={item.imageUrl}
                  />
                </Box>
              ))}
        </Box>
      </Container>
    </div>
    </>
  );
}