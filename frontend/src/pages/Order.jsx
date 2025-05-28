import {useRef, useState} from "react";
import {menuItems} from "../components/menu";
import Navbar from "../components/Navbar";
import {
    TextField,
    Button,
    FormControlLabel,
    Radio,
    Container,
    Typography,
    Select,
    MenuItem, Grid2,
} from "@mui/material";
import axios from "axios";
import Footer from "../components/Footer.jsx";

export default function Order() {
    const form = useRef();
    const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
    const [cart, setCart] = useState([]);
    const [userName, setUserName] = useState("");
    const [userTel, setUserTel] = useState("");
    const [message, setMessage] = useState("");
    const [delivery, setDelivery] = useState("");

    const addMoreItemsToCart = () => {
        setCart([...cart, {food: "", quantity: 1, price: 0}]);
    };

    const handleSelectChange = (index, event) => {
        const selectedItem = menuItems.find(item => item.title === event.target.value);
        const updatedCart = [...cart];
        updatedCart[index] = {food: selectedItem.title, price: selectedItem.price, quantity: 1};
        setCart(updatedCart);
    };

    const handleQuantityChange = (index, event) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = parseInt(event.target.value);
        setCart(updatedCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log("CART:", cart);
        try {
            await axios.post('/api/email', {
                user_name: userName,
                phone_number: userTel,
                cart,
                message: message,
                delivery_method: delivery
            }).then(() => setIsSentSuccessfully(true))
                .catch((err) => {
                console.log(err);
                setIsSentSuccessfully(false);
            });
        } catch (err) {
            console.error("Email send failed:", err);
        }
    };

    return (
        <>
            <Navbar/>
            <Container sx={{marginTop: "5rem", padding: "2rem"}}>

                <form ref={form} onSubmit={sendEmail}>
                    <Grid2 container spacing={4}>
                        <Grid2 item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>
                                Order Information
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Please fill out the form below, so we can process your order!
                            </Typography>

                            <TextField
                                fullWidth
                                label="Name"
                                name="user_name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Phone number"
                                name="user_tel"
                                type="tel"
                                value={userTel}
                                onChange={(e) => setUserTel(e.target.value)}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Special Requests"
                                name="message"
                                multiline
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                margin="normal"
                            />
                            <FormControlLabel
                                control={<Radio checked={delivery === "Delivery"}
                                                onChange={() => setDelivery("Delivery")} value="Delivery"
                                                name="delivery" color="primary"/>}
                                label="Delivery"
                            />
                            <FormControlLabel
                                control={<Radio checked={delivery === "Pickup"} onChange={() => setDelivery("Pickup")}
                                                value="Pickup" name="delivery" color="primary"/>}
                                label="Pickup"
                            />
                        </Grid2>

                        {/* Right Column: Cart */}
                        <Grid2 item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>
                                Cart
                            </Typography>
                            {cart.map((item, index) => (
                                <Grid2 container spacing={2} key={index} sx={{mb: 2}}>
                                    <Grid2 item xs={6}>
                                        <Select fullWidth value={item.food || "Select item"}
                                                onChange={(e) => handleSelectChange(index, e)} variant={"filled"}
                                                sx={{minWidth: "300px"}}>
                                            {menuItems.map((menuItem, idx) => (
                                                <MenuItem key={idx} value={menuItem.title}
                                                          sx={{display: "grid", gridTemplateColumns: "0.5fr 1fr"}}>
                                                    <img src={menuItem.imageUrl} alt={item.title}
                                                         style={{width: 35, height: 35, marginRight: 10}}/>
                                                    <Typography
                                                        variant={"body1"}>{menuItem.title} - {menuItem.price} FT</Typography>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid2>
                                    <Grid2 item xs={6}>
                                        <Select variant={"filled"} fullWidth value={item.quantity}
                                                onChange={(e) => handleQuantityChange(index, e)}>
                                            {[...Array(10).keys()].map(num => (
                                                <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid2>
                                </Grid2>
                            ))}
                            <Button variant="outlined" fullWidth onClick={addMoreItemsToCart} sx={{mt: 2}}>
                                {cart.length > 0 ? "Add More Items" : "Add an item to cart"}
                            </Button>
                            <Typography variant="h6" align="center" sx={{mt: 3}}>
                                Total: {getTotalPrice()} FT
                            </Typography>
                        </Grid2>
                    </Grid2>

                    <Button type="submit" variant="contained" disabled={cart.length === 0} fullWidth sx={{mt: 4}}>
                        Place Order
                    </Button>
                </form>
            </Container>
                <Footer></Footer>
        </>

    );
}