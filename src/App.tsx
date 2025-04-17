import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerRegistration from "./pages/SellerRegistration";
import { addToCart$ } from "./store/addToCart";
import httpHome from "./Api/httpHome";
import CheckoutPage from "./pages/Checkout";
import { error$ } from "./store/customErrors";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("trideFairToken");

// Wrapper component to protect private routes
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  const api = httpHome();
  error$.message.set("");

  useEffect(() => {
    if (isAuthenticated()) {
      api
        .getCartCount({ user_id: localStorage.getItem("trideFairUserId") }) // Replace with dynamic user_id
        .then((response) => {
          if (response?.status === 1) {
            addToCart$.cartItems.set(response?.cartqty);
          }
        });
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:id" element={<Category />} />
              <Route
                path="/login"
                element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/checkout"
                // element={<CheckoutPage />}
                element={<PrivateRoute element={<CheckoutPage />} />}
              />
              <Route
                path="/register"
                element={isAuthenticated() ? <Navigate to="/" /> : <Register />}
              />
              <Route path="/sell" element={<SellerRegistration />} />

              {/* Protected Routes (Require Authentication) */}
              <Route
                path="/cart"
                element={<PrivateRoute element={<Cart />} />}
              />
              <Route
                path="/account"
                element={<PrivateRoute element={<Account />} />}
              />
              <Route
                path="/orders"
                element={<PrivateRoute element={<Orders />} />}
              />
              <Route
                path="/wishlist"
                element={<PrivateRoute element={<Wishlist />} />}
              />

              {/* <Route
              path="/checkout"
              element={<PrivateRoute element={<CheckoutPage />} />}
            /> */}

              {/* Catch-all Route - Redirect to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Elements>
  );
}

export default App;
