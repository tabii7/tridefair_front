import React, { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product_name:
        "European And American Christmas Women's Solid Color Bra Panties Set",
      price: 8.46,
      qty: 1,
      shipping_cost: 0.0,
      est_shipping_days: 4,
      product_image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      product_name:
        "European And American Christmas Women's Solid Color Bra Panties Set",
      price: 8.46,
      qty: 1,
      shipping_cost: 0.0,
      est_shipping_days: 4,
      product_image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      product_name:
        "European And American Christmas Women's Solid Color Bra Panties Set",
      price: 8.46,
      qty: 1,
      shipping_cost: 0.0,
      est_shipping_days: 4,
      product_image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      product_name:
        "European And American Christmas Women's Solid Color Bra Panties Set",
      price: 8.46,
      qty: 1,
      shipping_cost: 0.0,
      est_shipping_days: 4,
      product_image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      product_name:
        "European And American Christmas Women's Solid Color Bra Panties Set",
      price: 8.46,
      qty: 1,
      shipping_cost: 0.0,
      est_shipping_days: 4,
      product_image: "https://via.placeholder.com/150",
    },
  ]);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);

  // Form state for new address
  const [addressForm, setAddressForm] = useState({
    country: "",
    firstName: "",
    lastName: "",
    street_address: "",
    street_address_2: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    confirmEmail: "",
    countryCode: "",
    phoneNumber: "",
  });

  // Form state for edit address
  const [editAddressForm, setEditAddressForm] = useState({
    country: "",
    firstName: "",
    lastName: "",
    street_address: "",
    street_address_2: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    confirmEmail: "",
    countryCode: "",
    phoneNumber: "",
  });

  // Load countries and country codes
  useEffect(() => {
    // Mock API call for countries
    const fetchCountries = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockCountries = [
          { code: "US", name: "United States" },
          { code: "PK", name: "Pakistan" },
          { code: "CA", name: "Canada" },
          { code: "GB", name: "United Kingdom" },
        ];

        const mockCountryCodes = [
          { code: "+1", country: "US", name: "United States" },
          { code: "+92", country: "PK", name: "Pakistan" },
          { code: "+1", country: "CA", name: "Canada" },
          { code: "+44", country: "GB", name: "United Kingdom" },
        ];

        setCountries(mockCountries);
        setCountryCodes(mockCountryCodes);

        // Set default country to Pakistan
        setAddressForm((prev) => ({
          ...prev,
          country: "PK",
          countryCode: "+92",
        }));
        setEditAddressForm((prev) => ({
          ...prev,
          country: "PK",
          countryCode: "+92",
        }));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shippingCost = cartItems.reduce(
    (sum, item) => sum + item.shipping_cost,
    0
  );
  const tax = 0.0; // Assuming no tax for this example
  const grandTotal = subtotal + shippingCost + tax;

  // Handle quantity changes
  const handleQuantityChange = (id, action) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty =
            action === "increase" ? item.qty + 1 : Math.max(1, item.qty - 1);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Handle address form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit address form changes
  const handleEditAddressChange = (e) => {
    const { name, value } = e.target;
    setEditAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setEditAddressForm({
      country: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      street_address: address.street_address,
      street_address_2: address.street_address_2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      email: address.email,
      confirmEmail: address.email, // Assuming same as email for confirmation
      countryCode: address.countryCode,
      phoneNumber: address.phoneNumber,
    });
    setShowEditAddress(true);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedAddress && addresses.length > 0) {
      alert("Please select a shipping address");
      return;
    }
    if (!acceptTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // In a real app, you would handle the payment process here
    alert("Proceeding to payment...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Review Order Section */}
      <h1 className="text-2xl font-bold mb-6">Review Order</h1>
      <div className="mb-8 flex gap-2  h-[500px] overflow-auto">
        {/* Cart Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Your Items</h2>

          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product_name}</h3>
                    <p className="text-gray-800 font-semibold">
                      USD {item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
                          }
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.qty}</span>
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item.id, "increase")
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="text-red-600 text-sm underline hover:text-red-800"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items in your cart</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Item({cartItems.length})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold border-t border-gray-200 pt-3 mb-4">
            <span>Grand total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <div className="bg-gray-100 p-3 rounded text-center text-xs">
            <p>
              You agree to the Global Shipping Program{" "}
              <a href="#" className="text-blue-600 font-semibold">
                terms
              </a>
              .
            </p>
            <p>
              By placing your order, you agree to our{" "}
              <a href="#" className="text-blue-600 font-semibold">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 font-semibold">
                Privacy Notice
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Shipping Address
        </h2>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {addresses.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Saved Addresses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address, index) => (
                  <label
                    key={index}
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:border-blue-400 ${
                      selectedAddress?.id === address.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="relative">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddress?.id === address.id}
                            onChange={() => setSelectedAddress(address)}
                            className="absolute opacity-0 h-0 w-0"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedAddress?.id === address.id
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAddress?.id === address.id && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-3 font-medium text-gray-700">
                          {address.country}
                        </span>
                      </div>
                      {selectedAddress?.id === address.id && (
                        <span className="text-blue-500 font-bold">
                          ✓ Selected
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 ml-8">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Full name</span>
                        <span className="font-medium">
                          {address.firstName} {address.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">{address.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-medium">
                          {address.countryCode}-{address.phoneNumber}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="text-gray-500">Address</span>
                        <p className="mt-1 font-medium">
                          {address.street_address}, {address.city},{" "}
                          {address.state} {address.zipCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAddress(address);
                        }}
                      >
                        Edit Address
                      </button>
                    </div>
                  </label>
                ))}
              </div>

              <button
                type="button"
                className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                onClick={() => {
                  setShowEditAddress(true);
                  setEditAddressForm(initialAddressState);
                }}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add New Address
              </button>
            </div>
          ) : (
            <div className="add-address">
              <h3 className="text-lg font-semibold mb-6 text-gray-700">
                Add Shipping Address
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Country or region
                    </label>
                    <select
                      name="country"
                      value={addressForm.country}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={addressForm.firstName}
                      onChange={handleAddressChange}
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={addressForm.lastName}
                      onChange={handleAddressChange}
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Address Fields */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street_address"
                      value={addressForm.street_address}
                      onChange={handleAddressChange}
                      placeholder="Street address"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Street address 2 (optional)
                    </label>
                    <input
                      type="text"
                      name="street_address_2"
                      value={addressForm.street_address_2}
                      onChange={handleAddressChange}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      State/Province/Region
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      placeholder="State/Province/Region"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={addressForm.zipCode}
                      onChange={handleAddressChange}
                      placeholder="ZIP/Postal Code"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={addressForm.email}
                      onChange={handleAddressChange}
                      placeholder="Email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Confirm email
                    </label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={addressForm.confirmEmail}
                      onChange={handleAddressChange}
                      placeholder="Confirm email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Phone with Country Code */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex gap-3">
                      <div className="w-1/3">
                        <select
                          name="countryCode"
                          value={addressForm.countryCode}
                          onChange={handleAddressChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        >
                          <option value="">Code</option>
                          {countryCodes.map((code) => (
                            <option
                              key={code.code + code.country}
                              value={code.code}
                            >
                              {code.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={addressForm.phoneNumber}
                          onChange={handleAddressChange}
                          placeholder="Phone number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                  >
                    Save Shipping Address
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Edit Address Modal */}
          {showEditAddress && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {editAddressForm.id ? "Edit Address" : "Add New Address"}
                    </h3>
                    <button
                      onClick={() => setShowEditAddress(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Country Selection */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Country or region
                        </label>
                        <select
                          name="country"
                          value={editAddressForm.country}
                          onChange={handleEditAddressChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Name Fields */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={editAddressForm.firstName}
                          onChange={handleEditAddressChange}
                          placeholder="First name"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={editAddressForm.lastName}
                          onChange={handleEditAddressChange}
                          placeholder="Last name"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>

                      {/* Address Fields */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street_address"
                          value={editAddressForm.street_address}
                          onChange={handleEditAddressChange}
                          placeholder="Street address"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Street address 2 (optional)
                        </label>
                        <input
                          type="text"
                          name="street_address_2"
                          value={editAddressForm.street_address_2}
                          onChange={handleEditAddressChange}
                          placeholder="Apartment, suite, etc. (optional)"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* City, State, ZIP */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={editAddressForm.city}
                          onChange={handleEditAddressChange}
                          placeholder="City"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          State/Province/Region
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={editAddressForm.state}
                          onChange={handleEditAddressChange}
                          placeholder="State/Province/Region"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={editAddressForm.zipCode}
                          onChange={handleEditAddressChange}
                          placeholder="ZIP/Postal Code"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editAddressForm.email}
                          onChange={handleEditAddressChange}
                          placeholder="Email"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Confirm email
                        </label>
                        <input
                          type="email"
                          name="confirmEmail"
                          value={editAddressForm.confirmEmail}
                          onChange={handleEditAddressChange}
                          placeholder="Confirm email"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>

                      {/* Phone with Country Code */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Phone Number
                        </label>
                        <div className="flex gap-3">
                          <div className="w-1/3">
                            <select
                              name="countryCode"
                              value={editAddressForm.countryCode}
                              onChange={handleEditAddressChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              required
                            >
                              <option value="">Code</option>
                              {countryCodes.map((code) => (
                                <option
                                  key={code.code + code.country}
                                  value={code.code}
                                >
                                  {code.code}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1">
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={editAddressForm.phoneNumber}
                              onChange={handleEditAddressChange}
                              placeholder="Phone number"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        className="px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowEditAddress(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-6 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
                        onClick={() => {
                          // Save logic here
                          setShowEditAddress(false);
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mb-8 ">
        <div className=" bg-white rounded-lg border border-gray-200 p-6">
          <div
            className="flex items-center gap-3 text-2xl font-bold mb-6
          
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span>Pay With</span>
          </div>

          <div className="space-y-4">
            {/* Credit Card Option */}
            <div
              className={`border ${
                paymentMethod === "card" ? "border-black" : "border-gray-300"
              } rounded-lg p-4 cursor-pointer w-[50%]`}
              onClick={() => handlePaymentMethodChange("card")}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      paymentMethod === "card"
                        ? "bg-black"
                        : "border border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex gap-5 items-center ">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-5"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                    alt="Mastercard"
                    className="h-7"
                  />
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAgVBMVEX///8Aeb4Ac7sAdbwAb7m42Ozo8/kAbrkYgsIAd71Wo9MAcboAer4Abbn0+fz7/f7v9vvZ6/XC3u/R5vMnisY0kcpLntCXx+R5t9zW6fSu0+qmz+hsr9hkq9bh7/dCms6MwOHI4vGeyuVbp9QehcOFvd8sjcgAZLR0tNuRxOI5lctibkRZAAAIfklEQVR4nO1baZPqKhCVxRAEo2ZxibtGn+P//4EPMqtD0yHReVWvKqfuh1ujkpPeG5rBoEePHj169OjRo0ePHj16/J8wma6Owwak2S757xgl2Wk5KipNGEXBJInz+/kw3P09p9XinBMuFGXmqfIdBIb9iCrOqS425V9Syw53rTiTn09ltbwMQR+zjy9SruLRKfoTTsl6roWqCZjnCE5JXOXXa57HmhmZKIZxk0yp+DycvJpUdKmUYvUDOJfV/LYYZrtomiTJNJody8P2HjOuUKkxQYvF9LWkYkG1XZqrarQ4QotHw8tdG8oYM6Xyt5c552RRCWpXpTw+l5iJzBZ7IhhGjIr89BpVHu+8lhRXxVuzQ62WMae4xO7p86QmS8LNYlrRfRn2mtPDh3B94HLzrIlld2stmvF7Gf6j6SEWqF/y6/ApVmttRSVFvGhnENGGcVST9PKEhS0p00RTdW4fpNMCdUo2nncNr5MtN6wIj9ddfp0sae0pXkXmx06skvnYvq+4zzr9fDAoY1SRXHcxsOle1Ga16W4EswLjpZVs4UYfSOaWFVOHzqQMpiOByYu25jWpF2Ts9Awra54YL81YS14bG3gY62Ts7kJ+XqRVxF/wF7EaDHB50TgLXyqVzLrw4gWsBgPcvvg1OBFNc2V+IJYvYTVI7gKJX4SPQhfaWr8WwV9vwi5WCC0p3sKWKU2VqVW4cBuRogU1k0HhfppT2xd4vxtdQO1GI7+DXPC8fQ+J2EtrouLiI32p/pmDtMi48BGb7FFe3of9wMoEE8ILzwusc8EUaHVRbLqbvcfdM42V0kw3p90zt+0NrMJoxI31emmZmEIO8Kq4Gvm5iVVGjHnyDfhZmtchyE/LhO3xCKyjkhzzRsKagv3ZPJnFYNm3lu9LI7Ssv19BjazRqlCB5vqNmTUCOJCebKnaSMuIuoIMbFIoLKhSXFzLWliQHk7q02obaGkVr4DP1ygtPNYnNmbxG/DJkH01WQ20iBY58F6TK9alSQ29yidK5XHXmf422SZaxgr2QHxZ4LELy8A2OkDyTO78WwXNtMCHPHzBAc39mxP1LzlQMS7HP1YIoCUhE95i4pLU33CURv2scnN0Rn4m2wBaRAFpYkixGCG2Xlobq0Pg4/nDe4bQIsKtIZOqmxYnhZGWcnU4fIzQQbQoIHRUi0T6QpfN0lDQehRWGC3C3epujW4Xcl8dYX+m9s6fs19VXBgtenWsa4f6IvcloCUHXfv2q0cIowW4lklACC3mMy6jLOmaVpL/escwWpBroc2ZJHCxZtODJE4ScPw6kBatnLd/w4tnuLi1qgfc9CGUtqBF3HZgiG9ewjZvK0B1d/48/20QobRcX1wR1ObhgGrfxX2kY1rhtJxSOEIDKhAELGx8EE65nOnfwSaUFnUkn6DFjSpAWgcB6XfovGAoLSC73tEIASSGwXt34trD2lkpmJbbEswxV4Sr4jqaKifDutVbMC23nhzhtMDOpqblbP+5sSY4QLjxEaUl29DqLi0gNOPSgptr2/W4W20np2MJptVWidorLXezqXzC5B0T3qOeCCux9kSngEg7Bwg3kTWUELAnniiUAGbO40JpuVG7bkO9oFewsilNqeDWYm7bGZx8nIyB92RAPrY4mixD3QTgmGmwtByvrreDvPBsJ1l1scrR76EjLSA+lHhhAzfWtlaQ0gmB2e/pi0BaQKvYsIfqOcmxGYs7nznuE1o0uy+Pnhz4iuY6nrqVjaPFwBbDlfsEd0Rfi2FVD4h+p7s0ZFBnh1u8ryGbmecz11DrPYC2tDSww9KwlXTw0BrYZh84gFo9vmUQLQ6UmiP0kMV/QFEna0CWjw1s2B6Euy/UsMHlOwow+Y/CeTyqftpqCK0x8J01vjfv3w60OUtDx4glb7e/RaFiwOnsfgJw3G9YbbkNy+CxTW+mxaAdxRU6FOdJiO+oIzq0wZgU35unjbQkuD+7xE9h0cN6W6eBe+S76qtKbaQFnpBOq06x9B22hYXVnH3NgDTREnPoEU7GfxQWfnZX970CrDCyigfRgllNK4acYngK028shPfcbla8zzRgtDQTWzD+XPBz9KaDzlpcHN6kSM6cNdDi8gD+dIeec6q88WC83nf1+cUpFlL7aTFReDLIGbesgDkQ64xeXe/OlMOnWVHMRXzx1SZYJNXe2uEnjpIRPfYe06YjAao4kvrmG4qLKrQRQ0/HvnCzAkfCWwqKfLrwT+qhzbQGdvAhJFfzblS3mMlpAL6TG6RCi1TasRHorLIThgwtaNxey4eLKRg0h84qO2AVY1mHeY96AIzspjdylNYCu5yjA5VtprGmVzukMYbHIVohKnBW7aaxZrEpGKRnTKMFdgVazgDtH46jtrw8CS4YsxzdlYRrAhRDTa285s+McR0rVIPi3OGlDS8r5qJ7/FoTbCSj66RtWg/Pcd1xnjK5KWSoWTPVdfYwqy2DqW2XwHos0Jl5RbpP2u72dmnJ89bDx8mSoO0Xr565+TDZ1PcwFB21s7DyKrAamQp4yisc67gOPFxvwufT0z1Fh8i4DpzpRDCbK1r7jd4ESWxSzilaMVA+D6qvmnCq6lafCTIvmy4P7Q4FxW878OrJqfIvRLf3S0VSqWoz9MfX2Xqk8Us+bBwvX3jFLdt+EKOcVqNDGv0OhMmsXO5jrrDKyjRr8a3rDQovsVjUdiyZECwuzre3cng8Zsd0uD5s5rmmAr/ZJjmvln9wTXF3udLP605M2bt/lNlLiva/nKJjy4RRrvenl163+8ZkuMnZD0VJWf/D+BjV2auD+n55XWsAIEkv+5gJIykpv26ZwiD2tqeRKcnPi5dEhAZE6WK7v8Za4ldypY7zYrRcZ//hdeHBJJo13GBOs9305bdKe/To0aNHjx49evTo0aPHH+NfTPl9riEqI10AAAAASUVORK5CYII="
                    alt="Discover"
                    className="h-7"
                  />
                </div>
              </div>
            </div>

            {/* PayPal Option */}
            <div
              className={`border ${
                paymentMethod === "paypal" ? "border-black" : "border-gray-300"
              } rounded-lg p-4 cursor-pointer w-[50%]`}
              onClick={() => handlePaymentMethodChange("paypal")}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      paymentMethod === "paypal"
                        ? "bg-black"
                        : "border border-gray-300"
                    }`}
                  >
                    {paymentMethod === "paypal" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                    alt="PayPal"
                    className="h-6 mr-3"
                  />
                  <span className="text-lg">Paypal</span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6 mb-6">
              <label className="flex items-start cursor-pointer">
                <div className="flex items-center h-5">
                  <div
                    className={`h-5 w-5 border rounded flex items-center justify-center ${
                      acceptTerms ? "bg-black border-black" : "border-gray-400"
                    }`}
                    onClick={() => setAcceptTerms(!acceptTerms)}
                  >
                    {acceptTerms && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-black font-medium underline">
                    Terms Conditions
                  </a>
                  ,{" "}
                  <a href="#" className="text-black font-medium underline">
                    Refund Policy
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-black font-medium underline">
                    Privacy policy
                  </a>
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-50 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Return to shop
              </button>

              {/* PayPal Button Container (if needed) */}
              {paymentMethod === "paypal" && (
                <div
                  id="paypal-button-container"
                  className="hidden md:block"
                ></div>
              )}

              <button
                onClick={handleProceedToPayment}
                className={`px-6 py-3 bg-black text-white rounded-lg font-medium ${
                  !acceptTerms && "opacity-70 cursor-not-allowed"
                }`}
                disabled={!acceptTerms}
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
