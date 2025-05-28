import {Box, Typography} from "@mui/material";
import Navbar from "../../components/Navbar.jsx";
import ImageListWithTitles from "../../components/ImageListWithTitles.jsx";

const AdminDashboard = () => {
    //TODO: Edit images - after i build this and deploy how would a client delete and update images without code?
    //      Should I add a an upload file but how would i delete the existing files? How would this look like in production and in the code?
    // TODO: secure the page so that so only logged in users can access - if not logged in and tyring to access admin dashboard, gets routed to AdminLogin.jsx
    // TODO: add delete item and create new item button
    return (
      <>
          <Navbar />
          <Box sx={{marginTop: "5rem", textAlign: "center", fontSize: "1rem", padding: {xs: "3rem",sm: "3.5rem", md: "4rem", lg: "5rem"}, alignSelf: "center"}}>
            <Typography variant={"h3"}>All menu items</Typography>
            <ImageListWithTitles/>
          </Box>
      </>
    )
};
export default AdminDashboard;