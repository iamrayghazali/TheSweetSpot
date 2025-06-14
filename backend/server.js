import express from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import {initDB} from './dbconnection.js';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = 5550;

app.use(express.json());
app.use(helmet());

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

app.get("/api/menu", async (req, res) => {
    const [rows] = await db.query('SELECT * FROM menu');
    return res.status(200).json(rows);
});

app.get("/api/menu/:id", async (req, res) => {
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

app.delete("/api/admin/menu/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await db.query("DELETE FROM menu WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Item not found"});
        }

        res.status(200).json({message: "Item deleted successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
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

// TODO: Change email destination in mailOptions
app.post('/api/email', emailOrderLimiter, async (req, res) => {
    const {user_name, user_email, phone_number, cart, message, delivery_method} = req.body;

    const calculatePrice = () => {
        return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    };

    const total_price = calculatePrice();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `NEW ORDER - ${user_name}`,
        html: `
            <h2>Order Details</h2>
            <p><strong>Name:</strong> ${user_name}</p>
            <p><strong>Phone:</strong> ${phone_number}</p>
            <p><strong>Delivery:</strong> ${delivery_method}</p>
            <p><strong>Message:</strong> ${message}</p>
            <h3>Cart:</h3>
            <ul>
              ${cart.map(item => `<li>${item.food} <strong>x ${item.quantity}</strong> (${item.price} Ft)</li>`).join('\n')}
            </ul>
            <h2>Total Price: ${total_price} Ft</h2>
            <p><em>Sent from Sweet Spot App</em></p>
        `
    };

    const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: `🎉 Thanks for your order, ${user_name}!`,
        html: `
      <div style="font-family: 'Arial', sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; background: #fff3f8; border-radius: 10px; border: 1px solid #ffd6e8;">
        <h1 style="color: #d6336c;">Sweet Spot 🍰</h1>
        <h2 style="margin-top: 0;">Hey ${user_name},</h2>
        <p>Thank you for placing an order with us! Here’s a summary of what you asked for:</p>

        <hr style="border: none; border-top: 1px solid #ffd6e8;" />

        <p><strong>📞 Phone:</strong> ${phone_number}</p>
        <p><strong>🚚 Delivery method:</strong> ${delivery_method}</p>
        <p><strong>📝 Note:</strong> ${message || "No special requests"}</p>

        <h3 style="margin-top: 30px;">🛒 Your Cart</h3>
        <ul style="padding-left: 20px;">
          ${cart.map(item => `
            <li style="margin-bottom: 5px;">
              <strong>${item.food}</strong> x ${item.quantity} – ${item.price} Ft
            </li>
          `).join('')}
        </ul>

        <h2 style="color: #d6336c;">Total: ${total_price} Ft</h2>

        <p>We’ll get started right away and be in touch if needed. You’ll hear from us soon!</p>

        <p style="margin-top: 40px;"><em>With love,</em><br><strong>The Sweet Spot Team 💖</strong></p>
      </div>
    `
    };

    try {
        // Save order to database
        // 1. Insert into `orders` table
        const [orderResult] = await db.query(`
            INSERT INTO orders (customer_name,
                                email,
                                phone_number,
                                special_requests,
                                order_date,
                                delivery_type,
                                delivery_date)
            VALUES (?, ?, ?, ?, NOW(), ?, NULL)
        `, [user_name, user_email, phone_number, message, delivery_method]);

        const orderId = orderResult.insertId; // 2. Get inserted order ID

        // 3. Insert each cart item into `order_items`
        for (const item of cart) {
            await db.query(`
                        INSERT INTO order_items (order_id, menu_id, quantity)
                        VALUES (?, ?, ?)`,
                [orderId, item.id, item.quantity]
            );
        }

        // Send the email
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(customerMailOptions); // goes to user

        res.json({success: true});
    } catch (error) {
        console.error('Order error:', error);
        res.status(500).json({success: false, error: error.message});
    }
});

app.get('/api/settings', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT order_status FROM settings LIMIT 1');
        res.json({ orderStatus: rows[0].order_status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch settings' });
    }
});

app.patch('/api/settings/switch', async (req, res) => {
    const { orderStatus } = req.body;
    try {
        await db.query('UPDATE settings SET order_status = ? WHERE id = 1', [orderStatus]);
        res.json({ success: true, orderStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not update settings' });
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

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, function () {
    console.log(`Your server is running on port: ${PORT}`);
});