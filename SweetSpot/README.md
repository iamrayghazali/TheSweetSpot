# SweetSpot

fonts: Caveat, Loto.


SweetSpot is a web application that allows users to browse a menu, place orders, and select between delivery or pickup options. It integrates with emailJS for order confirmation emails and features a responsive design using Material-UI and React.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for creating beautiful and responsive designs.
- **EmailJS**: Used to send order confirmations via email.
- **Vite**: A next-generation build tool that provides fast and optimized development.
- **PropTypes**: For runtime type-checking of props in React components.
- **React Router DOM**: For handling routing and navigation between pages in the app.

### Development Tools
- **ESLint**: A tool for identifying and fixing linting issues in JavaScript/React code.
- **Vite Plugin for React**: For optimizing React projects during build and development.
- **@eslint/js**: For linting JavaScript code.
- **@types/react** and **@types/react-dom**: TypeScript types for React.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

## Features
- **Menu page**: Displays a list of menu items with descriptions and images. Users can select items to add to their cart.
- **Order page**: Users can enter their details (name, email, phone) and select delivery or pickup. The cart details are sent via email to the store owner.
- **Home page**: Features a carousel with images of food and restaurant ambiance. There are buttons for ordering and viewing the menu.

## Contributing

** Contributions are welcome! Feel free to submit issues and pull requests. **

Fork the repository.

Create a new branch.

Commit your changes.

Push your branch and create a pull request.

## Components
- **Navbar**: Displays navigation links for "Home", "Menu", "Order", and "Instagram".
- **MenuItemCard**: A card component for displaying each menu item.
- **Order**: The form where users add their selected menu items to the cart and submit the order.
- **HomePage**: The homepage with a carousel and a short introduction to the restaurant.

## Folder Structure

The folder structure for SweetSpot is organized to follow best practices for React applications:

```
/sweetspot
  /public         # Static assets (e.g., images, favicon, etc.)
  /src
    /components   # Reusable React components like Navbar, MenuItemCard, etc.
    /pages        # Pages of the application (HomePage, MenuPage, OrderPage)
    /assets       # CSS styles and other assets used across the app
    /hooks        # Custom React hooks, if any
    /utils        # Utility functions for API calls or other logic
    App.js        # Main app component where routing and other logic happens
    index.js      # Entry point for the app, rendering the root component
  /node_modules   # Installed npm dependencies
  package.json    # Project configuration and dependencies
  README.md       # This file
```

### Why this structure?
- **/public**: Contains static files that can be directly accessed, like the favicon and other assets that are not processed by Webpack.
- **/src/components**: The components folder holds reusable components to keep the code modular.
- **/src/pages**: Each page is kept in this folder, separated for easier management and scalability as the project grows.
- **/src/assets**: Includes CSS files and any media used by the app, keeping styling and assets organized.
- **/src/hooks and /src/utils**: These folders help in managing the logic and reusable functions separate from components for cleaner code.

## Future Features
- Add footer with contact information and social media links.
- Implement a user authentication system for order history.
- Add more interactive features such as live order tracking.