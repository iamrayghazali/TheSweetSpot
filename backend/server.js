import express from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import {initDB} from './dbconnection.js';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 5550;

app.use(express.json());

const db = await initDB();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: {error: "Too many login attempts. Try again later."},
    standardHeaders: true,
    legacyHeaders: false,
});

const emailOrderLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000, // 3 hours
    max: 2, // 2 orders max per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "You’ve reached the limit. Only 2 orders allowed every 3 hours.",
        });
    }
});

app.get("/api/admin/menu", async (req, res) => {
    const [rows] = await db.query('SELECT * FROM menu');
    return res.status(200).json(rows);
});

app.get("/api/admin/menu/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({message: "Menu item not found"});
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

app.put("/api/admin/menu/:id", async (req, res) => {
    const {id} = req.params;
    const {title, price, description, image_url} = req.body;
    console.log(title, price, description, image_url);
    try {
        const [existingMenuItem] = await db.query('SELECT * FROM menu WHERE id = ?', [id]);
        if (existingMenuItem.length === 0) {
            return res.status(404).json({message: 'Menu item not found'});
        }

        const query = 'UPDATE menu SET title = ?, price = ?, description = ?, image_url = ? WHERE id = ?';
        const [result] = await db.query(query, [title, price, description, image_url, id]);

        console.log("Update result:", result);

        if (result.affectedRows && result.affectedRows > 0) {
            return res.status(200).json({message: 'Menu item updated successfully'});
        } else {
            return res.status(500).json({message: 'Failed to update menu item'});
        }
    } catch (error) {
        console.error("Error updating menu item:", error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.post("/api/admin/login", loginLimiter, async (req, res) => {
    try {
        const inputPassword = req.body.password;
        const inputUsername = req.body.username;

        console.log(inputUsername);
        console.log(inputPassword);
        const storedHash = await findUserHashedPassword(inputUsername);

        if (!storedHash) {
            return res.status(404).json({error: "User not found"});
        }

        const isPasswordValid = await verifyPassword(inputPassword, storedHash);

        if (isPasswordValid) {
            return res.status(200).json({message: "Logged in successfully!"});
        } else {
            return res.status(401).json({error: "Invalid password"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Invalid credentials"});
    }
});

app.post('/api/email', emailOrderLimiter, async (req, res) => {
    const { user_name, phone_number, cart, message, delivery_method } = req.body;

    const calculatePrice = () => {
        return cart.reduce((sum, item) => {
            return sum + item.quantity * item.price;
        }, 0);
    };

    // TODO: Change email destination in mailOptions
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, //here
        subject: `NEW ORDER - ${user_name}`,
        html:
            `
        <h2>Order Details</h2>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p><strong>Delivery:</strong> ${delivery_method}</p>
        <p><strong>Message:</strong> ${message}</p>
        <h3>Cart:</h3>
        <ul>
          ${cart.map(item => `<li>${item.food} <strong>x ${item.quantity}</strong> (${item.price} Ft)</li>`).join('\n')}
        </ul>
        <h2>Total Price: ${calculatePrice()} Ft</h2>
        <p><em>Sent from Sweet Spot App</em></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const verifyPassword = async (inputPassword, storedHash) => {
    return await bcrypt.compare(inputPassword, storedHash);
};

const findUserHashedPassword = async (inputUsername) => {
    const [rows] = await db.query('SELECT password_hash FROM admin WHERE username = ?', [inputUsername]);

    if (rows.length === 0) {
        return null;
    }
    return rows[0].password_hash;
};

app.listen(PORT, function () {
    console.log(`Your server is running on port: ${PORT}`);
});