import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ImageListWithTitles() {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await axios.get("/api/admin/menu");
            if (response.status === 200 && response.data.length > 0) {
                setMenuItems(response.data);
            }
        };
        fetchMenu();
    }, []);

    const goToMenuItem = (id) => {
        navigate(`/admin/menu/${id}`);
    };

    return (
        <Container sx={{ marginTop: "3rem", minHeight: "60vh" }}>
            <Grid container spacing={3}>
                {menuItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    ID: {item.id}
                                </Typography>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body1">Price: {item.price}</Typography>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => goToMenuItem(item.id)}
                                    sx={{ mt: 1 }}
                                >
                                    Edit item
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}