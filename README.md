
# 🥘 Sweet Spot — Full Stack Nigerian Food Ordering Platform

Welcome to **The Sweet Spot**, a full-stack web application designed for ordering authentic Nigerian cuisine in Budapest, Hungary. This platform connects hungry customers with the best homemade meals, allows easy ordering, and keeps users updated with the latest news from the kitchen.

---

## 📖 Table of Contents


1. [About The Project](#-about-the-project)
2. [Tech Stack](#-tech-stack)
3. [Folder Structure](#-folder-structure)
4. [Getting Started](#-getting-started)
   - [Prerequisites](#-prerequisites)
   - [Installation](#-installation)
   - [Running Locally](#-running-locally)
   - [Environment Variables](#-environment-variables)
5. [API Documentation](#-api-documentation)
6. [Contact](#-contact)
7. [License](#-license)

---

## 📌 About The Project

**Sweet Spot** is built to simplify the ordering process for Nigerian food lovers in Budapest. It offers a smooth browsing and ordering experience through a responsive web app, complete with an admin interface for managing the menu and keeping content fresh.

Customers can:
- Browse dishes visually.
- Place food orders.
- Get updates and news from the kitchen.
- View the restaurant’s Instagram-like feed.

Admins can:
- Log in securely.
- Add/edit/remove menu items.
- View and manage orders.

## 🧰 Tech Stack

### Backend
- [![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/en/)  Node.js
- [![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)  Express.js
- [![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)  MySQL
- [![Nodemailer](https://img.shields.io/badge/-Nodemailer-E5584F?logo=gmail&logoColor=white)](https://nodemailer.com/about/)  Nodemailer

### Frontend
- [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)](https://react.dev/)  React
- [![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)  Vite

---

## 📁 Folder Structure

```
sweet-spot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── styles/
│   └── package.json
├── backend/
│   ├── dbconnection.js
│   ├── server.js
│   ├── testdata.js
│   └── .env.example
├── .gitignore
├── README.md
```

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- MySQL

### 💻 Installation

#### 1. Clone the repo

```bash
git clone https://github.com/yourusername/sweet-spot.git
cd sweet-spot
```

#### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

### 🏃‍♂️ Running Locally

#### 💻 On Windows / macOS / Linux:

```bash
# In backend/
npm run dev
# or
nodemon server.js

# In frontend/
npm run dev
```

---

## 🔐 Environment Variables

All secrets are managed with `.env` files.
Use `.env.example` to share variable names, rename from `.env.example` to `.env`. This file should be kept private!
Use a service like Gmail SMTP, Mailgun, or SendGrid for email delivery.

---

## 📚 API Documentation

Note that most endpoints are for the admin interface only.

### `GET /api/admin/menu`

Returns all menu items.

### `GET /api/admin/menu/:id`

Returns one menu item based on the menu item's ID.

### `PUT /api/admin/menu/:id`

Updates one menu item that matches the item's ID.

### `POST /api/admin/login`

Admin login endpoint. Requires `username` and `password`.

### `POST /api/email`

Endpoint for sending emails as orders.

---

## 👤 Contact

📧 ghazali.raydan@gmail.com  
📍 Based in Budapest, Hungary  

GitHub: [@iamrayghazali](https://github.com/iamrayghazali)

---

## 📜 License

This project is licensed under the MIT License.  
