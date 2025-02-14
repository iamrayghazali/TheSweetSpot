import {menuItems} from "../components/menu";
import {useRef, useState} from "react";
import "../styles/Orders.css";
import Navbar from "../components/Navbar";
import emailjs from "@emailjs/browser";
import {TextField, Button, FormControlLabel, Radio, Grid2, Container, Typography} from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {ConnectingAirports} from "@mui/icons-material";


export default function Order() {
  const form = useRef();
  const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(""); // State to track delivery method

  const addMoreItemsToCart = () => {
    setCart([...cart, {food: "", quantity: 1, price: 0}]);
  };

  const handleSelectChange = (index, event) => {
    const selectedItem = menuItems.find(item => item.title === event.target.value.split(" - ")[0]);
    const updatedCart = [...cart];
    updatedCart[index] = {...updatedCart[index], food: selectedItem.title, price: selectedItem.price};
    setCart(updatedCart);
  };

  const handleQuantityChange = (index, event) => {
    const updatedCart = [...cart];
    updatedCart[index] = {...updatedCart[index], quantity: parseInt(event.target.value)};
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("SUBMITTED CART:", cart)


    emailjs
      .sendForm('service_v9znwyh', 'template_fatg7dm', form.current, {
        publicKey: '9i8BEf6aUEo0KhiSy',
      })
      .then(
        () => {
          setIsSentSuccessfully(true);
          console.log('SUCCESS!');
          e.target.reset(); // Reset the form fields
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Navbar/>
      <div id="order-page">

        {/*TODO WELCOME MESSAGE*/}
        {isSentSuccessfully ? (
          <>
            <h2 className="success">Order successful.</h2>
            <h3 className="success">Thank you for your order!</h3>
            <p className="success">We will contact you shortly.</p>
          </>
        ) : (
          <>
            <div id="form-container">
              <form ref={form} onSubmit={sendEmail}>
                <Grid2 container spacing={4} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                  <Container sx={{display: "grid", gridTemplateColumns: "1fr 2fr 2fr", gap: "10px", minWidth: "100%", padding: "0px", margin: "0px"}}>

                    <Container id={"timeline-container"} sx={{paddingLeft: "0px", paddingRight: "0px"}}>
                      <Timeline position="left" sx={{paddingLeft: "0px", paddingRight: "0px"}}>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot/>
                            <TimelineConnector/>
                          </TimelineSeparator>
                          <TimelineContent sx={{textAlign: "center"}}>Fill Info</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot/>
                            <TimelineConnector/>
                          </TimelineSeparator>
                          <TimelineContent>Select Delivery</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot/>
                            <TimelineConnector/>
                          </TimelineSeparator>
                          <TimelineContent>Add Items</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot/>
                            <TimelineConnector/>
                          </TimelineSeparator>
                          <TimelineContent>Place Order</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot/>
                          </TimelineSeparator>
                          <TimelineContent>Repeat</TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </Container>
                    <Container id={"form-container"}>
                      <Typography variant="h4" gutterBottom sx={{paddingTop: "50px", paddingBottom: "0px", fontWeight: "400", textAlign: "center", fontFamily: "Caveat"}}>
                        Order Information
                      </Typography>

                      {/*NAME*/}
                      <Grid2 item xs={12} sm={6} sx={{paddingTop: "10px", paddingBottom: "10px", color: "white"}}>
                        <TextField
                          sx={{input: {color: "white"}, label: {color: "white"}}}
                          label="Name"
                          name="user_name"
                          required
                          fullWidth
                          variant="outlined"
                        />
                      </Grid2>

                      {/*EMAIL*/}
                      <Grid2 item xs={12} sm={6} sx={{paddingTop: "10px", paddingBottom: "10px"}}>
                        <TextField
                          label="Email"
                          name="user_email"
                          type="email"
                          required
                          fullWidth
                          variant="outlined"
                        />
                      </Grid2>

                      {/*PHONE NUMBER*/}
                      <Grid2 item xs={12} sm={6} sx={{paddingTop: "10px", paddingBottom: "10px"}}>
                        <TextField
                          label="Phone number"
                          name="user_tel"
                          type="tel"
                          required
                          fullWidth
                          variant="outlined"
                        />
                      </Grid2>

                      {/*SPECIAL REQUEST*/}
                      <Grid2 item xs={12} sx={{paddingTop: "10px", paddingBottom: "10px"}}>
                        <TextField
                          label="Special Requests"
                          name="message"
                          multiline
                          rows={3}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid2>

                      {/* Delivery Method */}
                      <Container sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Grid2 item xs={12} sm={6} sx={{padding: "10px"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={deliveryMethod === "Delivery"}
                                onChange={() => setDeliveryMethod("Delivery")}
                                value="Delivery"
                                name="delivery"
                                color="primary"
                              />
                            }
                            label="Delivery"
                          />
                        </Grid2>
                        <Grid2 item xs={12} sm={6} sx={{padding: "10px"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={deliveryMethod === "Pickup"}
                                onChange={() => setDeliveryMethod("Pickup")}
                                value="Pickup"
                                name="delivery"
                                color="primary"
                              />
                            }
                            label="Pickup"
                          />
                        </Grid2>
                      </Container>

                    </Container>
                    <Container id={"cart-container"}>
                      <Grid2 item xs={12}>
                        <Typography variant="h4" gutterBottom sx={{paddingTop: "50px", paddingBottom: "0px", fontWeight: "400", textAlign: "center", fontFamily: "Caveat"}}>
                          Cart
                        </Typography>

                        {cart.map((item, index) => (
                          <Grid2 container spacing={2} key={index}>
                            <Grid2 item xs={12} sm={6}>
                              <select onChange={(e) => handleSelectChange(index, e)}>
                                <option>Select item</option>
                                {menuItems.map((menuItem, idx) => (
                                  <option key={idx}>
                                    {menuItem.title} - {menuItem.price} FT
                                  </option>
                                ))}
                              </select>
                            </Grid2>
                            <Grid2 item xs={12} sm={6}>
                              <select
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, e)}
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <option key={num + 1}>{num + 1}</option>
                                ))}
                              </select>
                            </Grid2>
                          </Grid2>
                        ))}
                        <Button
                          variant="outlined"
                          onClick={addMoreItemsToCart}
                          fullWidth
                          style={{marginTop: "10px"}}
                        >
                          Add More
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={clearCart}
                          fullWidth
                          style={{marginTop: "10px"}}
                        >
                          Clear Cart
                        </Button>

                        <h3>Total Price: {getTotalPrice()} FT</h3>
                      </Grid2>
                    </Container>
                  </Container>

                  {/* Submit Button */}
                  <Grid2 item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Place Order
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </div>

          </>
        )}
      </div>
    </>
  );
}