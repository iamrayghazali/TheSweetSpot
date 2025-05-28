import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import PropTypes from 'prop-types';
import Typography from "@mui/material/Typography";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";



export default function MenuItemCard({ title, price, cardImage, description, actionButtonText }) {
    const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundColor: "#2c2c2e",
        color: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.25)",
        transition: "transform 0.3s ease",
        '&:hover': {
          transform: "scale(1.005)",
        },
        maxWidth: "700px"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={cardImage}
        alt={title}
        sx={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          objectFit: "cover"
        }}
      />
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h4', color: 'secondary.main', fontWeight: 'bold', fontFamily: "Caveat", paddingTop: "10px", paddingBottom: "0px" }}
      />
        <CardContent sx={{paddingLeft: '20px'}}>
            <Box sx={{display: "grid", gridTemplateColumns: '1.5fr 1fr', paddingBottom: "10px"}}>
                <Typography variant="h5" sx={{ variant: 'h4', color: 'rgba(255, 255, 255, 0.7)', padding: '0'}}>
                    {price + "Ft"}
                </Typography>
                <Button variant="contained" onClick={() => navigate(`/${actionButtonText}`)}>{actionButtonText.toUpperCase()}</Button>
            </Box>
                <Typography variant="subtitle1" sx={{ color: "rgba(255, 255, 255, 0.8)", padding: '0'}}>
                    {description}
                </Typography>
        </CardContent>
    </Card>
  );
}

MenuItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionButtonText: PropTypes.string.isRequired
};
