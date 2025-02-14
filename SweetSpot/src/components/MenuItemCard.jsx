import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import PropTypes from 'prop-types';
import Typography from "@mui/material/Typography";



export default function MenuItemCard({ title, price, cardImage, description }) {
  return (
    <Card
      sx={{
        backgroundColor: "#2c2c2e", // Dark background for the card
        color: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.25)", // Soft shadow
        transition: "transform 0.3s ease",
        '&:hover': {
          transform: "scale(1.005)", // Hover effect to make it pop
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
        subheader={price + " Ft"}
        titleTypographyProps={{ variant: 'h4', color: 'secondary.main', fontWeight: 'bold', fontFamily: "Caveat", paddingBottom: "10px"}}
        subheaderTypographyProps={{ variant: 'h5', color: 'rgba(255, 255, 255, 0.7)' }}
      />
      <CardContent sx={{paddingLeft: '20px'}}>
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
};
