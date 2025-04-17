import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, CreditCard, Truck } from "lucide-react";
import httpHome from "../Api/httpHome";
import { addToCart$ } from "../store/addToCart";

const Cart = () => {
  const api = httpHome();
  // Mock cart items
  const navigate = useNavigate();
  const [items, setItems] = useState([]) as any;

  useEffect(() => {
    if (localStorage.getItem("trideFairToken")) {
      api
        .getCart({ user_id: localStorage.getItem("trideFairUserId") })
        .then((res) => {
          setItems(res?.data);
          addToCart$.cartItems.set(res?.data?.length);
        });
    } else {
      navigate("/login");
    }
  }, []);

  // Navugate to checkout page
  const navigateToCheckout = () => {
    navigate("/checkout");
  };

  const updateQuantity = (id: number, change: number) => {
    api
      .updateCartProduct({
        user_id: localStorage.getItem("trideFairUserId"),
        cart_id: id,
        // qty: change,
        // add the Quantity in previous state
        qty: Math.max(
          1,
          items.find((item: any) => item.id === id)?.qty + change
        ),
      })
      .then((res) => {
        if (res?.status == 1) {
          setItems(
            items.map((item) =>
              item.id === id
                ? { ...item, qty: Math.max(1, item.qty + change) }
                : item
            )
          );
        }
      });
    // setItems(
    //   items.map((item) =>
    //     item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    //   )
    // );
  };

  const removeItem = (id: number) => {
    api
      .deleteCartProduct({
        user_id: localStorage.getItem("trideFairUserId"),
        cart_id: id,
      })
      .then((res) => {
        if (res?.status == 1) {
          setItems(items.filter((item: any) => item.id !== id));
          addToCart$.cartItems.set(addToCart$.cartItems.get() - 1);
        }
      });
  };
  const subtotal = (items ?? []).reduce(
    (sum: number, item: any) =>
      sum + (Number(item.price) || 0) * (Number(item.qty) || 1),
    0
  );

  const shipping = (items ?? []).reduce(
    (sum: number, item: any) => sum + (Number(item.shipping_cost) || 0),
    0
  );

  const tax = subtotal * 0; // Adjust if needed

  const total = subtotal + shipping + tax || 0; // Ensuring a valid number

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {items?.length > 0 ? (
            <div className="bg-white rounded-lg shadow">
              {items.map((item: any, index: any) => (
                <div
                  key={item?.product_id}
                  className={`p-6 ${index !== 0 ? "border-t" : ""}`}
                >
                  <div className="flex gap-6">
                    <img
                      src={
                        "https://tridefair.com/storage/images/products/" +
                        item?.product_image
                      }
                      alt={item?.product_name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium mb-1">
                            {item?.product_name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Sold by {item?.seller}
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() => updateQuantity(item?.id, -1)}
                                className="px-3 py-1 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1 border-x">
                                {item?.qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-3 py-1 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item?.id)}
                              className="text-red-600 hover:text-red-700 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <span className="text-xl font-bold">
                          ${(item?.price * item?.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items?.length > 0 && (
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 font-bold text-lg">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigateToCheckout()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Truck className="h-4 w-4 mr-2" />
                Estimated delivery: 2-4 business days
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
