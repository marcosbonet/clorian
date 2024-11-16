# **Event Tickets App**

A ticket-selling application for events, built with **React** and styled using **TailwindCSS**. This project is a technical solution implementing key features such as product management, a persistent shopping cart, sorting, search, and multi-language support.

---

## **Key Features**

- **Product List:** Displays event tickets in alphabetical order with key details.
- **Product Details:** View detailed information about a selected product.
- **Shopping Cart Management:**
  - Add products to the cart with quantity control.
  - Restrict adding expired products.
  - Persist cart state even after page reloads.
- **Sorting and Search:**
  - Sort by name or description.
  - Filter products using a search bar.
- **Responsive Interface:** Optimized for mobile, tablet, and desktop devices.
- **Multi-language Support:** At least two supported languages (English and Spanish).
- **Performance Optimizations:** Utilizes `React.memo`, lazy loading with `React.lazy`, and memoization with `useMemo`.

---

## **Technologies Used**

### **Frontend**

- **React:** The main library for building the user interface.
- **React Router:** For navigation between views.
- **TailwindCSS:** A modern CSS framework for responsive design.
- **Day.js:** Library for date manipulation.

### **State Management**

- **Context API:** For managing global state for the shopping cart.

### **Persistence**

- **Local Storage:** To store the cart data persistently.

---

## **Installation**

1. **C## lone the Repository**
   ```
   git clone https://github.com/marcosbonet/CLORIANfrontend
   cd frontend-test
   Install Dependencies Ensure you have Node.js and npm installed. Then run:
   ```

npm install
Run the Application To start the development server:

npm start
The app will be available at: http://localhost:3000.

Project Structure
graphql

src/
├── assets/
│ └── products.json # Product data (event tickets)
├── components/
│ ├── ProductList.js # Product listing component
│ ├── ProductDetails.js # Product detail view
│ ├── Cart.js # Shopping cart component
├── store/
│ └── CartContext.js # Context API for global cart management
├── pages
├── i18n
├── App.js # Main application component
├── index.js # Application entry point
└── styles/
└── index.css # Base CSS file with TailwindCSS
Features
Products
Product List: Sorted alphabetically by name.
Expired Products: Products with past validity dates are disabled.
Search and Filter: Find products matching the entered text.
Cart
Advanced Management:
Add up to 10 units per product.
Calculates subtotal for each product and a grand total.
Clear Cart: Remove all items from the cart with one click.
Persistence: Cart state remains intact even after a page reload.
Performance Optimizations
Improved Performance through:
React.memo to prevent unnecessary re-renders.
React.lazy for lazy component loading.
useMemo for memoizing expensive calculations.
Available Scripts

## Start the Development Server

npm start
Launches the app in development mode.

## Build for Production

npm run build
Builds the app for production into the build/ folder.

## Run Tests

npm test
Runs unit tests using Jest and React Testing Library.

Next Steps
Enhance multi-language support with a library like react-i18next.
Implement more robust tests for the shopping cart and search functionalities.
Author
Created by Marcos Bonet - GitHub:
https://github.com/marcosbonet
