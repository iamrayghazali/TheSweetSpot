import {Button, Container, Divider, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EditMenuItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getMenuItem = async () => {
      const response = await axios.get(`/api/admin/menu/${id}`);
      if (response.status === 200) {
        setMenuItem(response.data);
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          image_url: response.data.image_url,
        });
      }
    };
    getMenuItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/admin/menu/${id}`, formData);
      if (response.status === 200) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  //TODO: Delete button and confirmation
  return (
    <>
      {
        isSubmitted ? (
          <>
            <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20%"}}>
            <Typography variant="h5" gutterBottom>
             Edited successfully.
            </Typography>
            <CheckCircleIcon/>
            <Button variant="contained" fullWidth sx={{ mt: 4, maxWidth: "20rem"}} onClick={() => navigate("/admin/dashboard")}>
              Go to admin page
            </Button>
            </Container>
          </>
        ) : (
          <>
            {
              menuItem !== null ? (
                <>
                  <form onSubmit={handleSubmit}>
                    <Container sx={{ maxWidth: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Button variant="contained" fullWidth sx={{ mt: 4, maxWidth: "20rem"}} onClick={() => navigate("/admin/dashboard")}>
                        Go back to admin page
                      </Button>
                      <Divider />
                    <Typography variant="overline">
                      ID: {id}
                    </Typography>
                    <Typography variant="h6">
                      Currently editing:
                    </Typography>
                    <Typography variant="h3">
                      {formData.title}
                    </Typography>
                      <Divider sx={{color: "black"}} />

                      <Typography variant="subtitle1">
                      Title:
                    </Typography>
                    <TextField
                      fullWidth
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      margin="normal"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      Price:
                    </Typography>
                    <TextField
                      fullWidth
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      margin="normal"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      Description:
                    </Typography>
                    <TextField
                      fullWidth
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      margin="normal"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      Image url:
                    </Typography>
                    <TextField
                      fullWidth
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
                      Submit
                    </Button>
                    </Container>

                  </form>
                </>
              ) : (
                <p>Loading...</p>
              )
            }
          </>
        )
      }
    </>
  );
};
export default EditMenuItem;