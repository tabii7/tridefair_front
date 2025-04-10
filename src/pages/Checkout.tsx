import React, { useState, useEffect } from 'react';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product_name: "European And American Christmas Women's Solid Color Bra Panties Set",
      price: 8.46,
      qty: 1,
      shipping_cost: 0.00,
      est_shipping_days: 4,
      product_image: "https://via.placeholder.com/150"
    }
  ]);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);

  // Form state for new address
  const [addressForm, setAddressForm] = useState({
    country: '',
    firstName: '',
    lastName: '',
    street_address: '',
    street_address_2: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    confirmEmail: '',
    countryCode: '',
    phoneNumber: ''
  });

  // Form state for edit address
  const [editAddressForm, setEditAddressForm] = useState({
    country: '',
    firstName: '',
    lastName: '',
    street_address: '',
    street_address_2: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    confirmEmail: '',
    countryCode: '',
    phoneNumber: ''
  });

  // Load countries and country codes
  useEffect(() => {
    // Mock API call for countries
    const fetchCountries = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockCountries = [
          { code: 'US', name: 'United States' },
          { code: 'PK', name: 'Pakistan' },
          { code: 'CA', name: 'Canada' },
          { code: 'GB', name: 'United Kingdom' }
        ];
        
        const mockCountryCodes = [
          { code: '+1', country: 'US', name: 'United States' },
          { code: '+92', country: 'PK', name: 'Pakistan' },
          { code: '+1', country: 'CA', name: 'Canada' },
          { code: '+44', country: 'GB', name: 'United Kingdom' }
        ];
        
        setCountries(mockCountries);
        setCountryCodes(mockCountryCodes);
        
        // Set default country to Pakistan
        setAddressForm(prev => ({ ...prev, country: 'PK', countryCode: '+92' }));
        setEditAddressForm(prev => ({ ...prev, country: 'PK', countryCode: '+92' }));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingCost = cartItems.reduce((sum, item) => sum + item.shipping_cost, 0);
  const tax = 0.00; // Assuming no tax for this example
  const grandTotal = subtotal + shippingCost + tax;

  // Handle quantity changes
  const handleQuantityChange = (id, action) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = action === 'increase' ? item.qty + 1 : Math.max(1, item.qty - 1);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle address form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle edit address form changes
  const handleEditAddressChange = (e) => {
    const { name, value } = e.target;
    setEditAddressForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setEditAddressForm({
      country: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      street_address: address.street_address,
      street_address_2: address.street_address_2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      email: address.email,
      confirmEmail: address.email, // Assuming same as email for confirmation
      countryCode: address.countryCode,
      phoneNumber: address.phoneNumber
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
      alert('Please select a shipping address');
      return;
    }
    if (!acceptTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    // In a real app, you would handle the payment process here
    alert('Proceeding to payment...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Review Order Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Review Order</h1>
        
        {/* Cart Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Items</h2>
          
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0">
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
                    <p className="text-gray-800 font-semibold">USD {item.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, 'decrease')}
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.qty}</span>
                        <button 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, 'increase')}
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
                    
                    {/* Delivery Info */}
                    <div className="mt-4 pl-3 border-l-2 border-gray-200">
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm">Est. delivery: {item.est_shipping_days} Days</p>
                      <p className="text-sm font-semibold">USD {item.shipping_cost.toFixed(2)}</p>
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
            <p>You agree to the Global Shipping Program <a href="#" className="text-blue-600 font-semibold">terms</a>.</p>
            <p>By placing your order, you agree to our <a href="#" className="text-blue-600 font-semibold">User Agreement</a> and <a href="#" className="text-blue-600 font-semibold">Privacy Notice</a>.</p>
          </div>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Ship To</h2>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address, index) => (
                <label 
                  key={index} 
                  className={`border rounded-lg p-4 cursor-pointer ${selectedAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="address" 
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="mr-2"
                      />
                      <span>Country: {address.country}</span>
                    </div>
                    <span className="text-blue-500">✓</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Full name</span>
                      <span>{address.firstName} {address.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span>{address.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span>{address.countryCode}-{address.phoneNumber}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-gray-500">Address</span>
                      <p className="mt-1">{address.street_address}, {address.city}, {address.state} {address.zipCode}</p>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="mt-3 text-sm bg-gray-800 text-white px-3 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                  >
                    Change
                  </button>
                </label>
              ))}
            </div>
          ) : (
            <div className="add-address">
              <form className="space-y-4">
                {/* Country Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">Country or region</label>
                  <select 
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={addressForm.firstName}
                      onChange={handleAddressChange}
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={addressForm.lastName}
                      onChange={handleAddressChange}
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                {/* Address Fields */}
                <div>
                  <label className="block text-sm font-medium mb-1">Street address</label>
                  <input
                    type="text"
                    name="street_address"
                    value={addressForm.street_address}
                    onChange={handleAddressChange}
                    placeholder="Street address"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Street address 2 (optional)</label>
                  <input
                    type="text"
                    name="street_address_2"
                    value={addressForm.street_address_2}
                    onChange={handleAddressChange}
                    placeholder="Street address 2 (optional)"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                
                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State/Province/Region</label>
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      placeholder="State/Province/Region"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={addressForm.zipCode}
                      onChange={handleAddressChange}
                      placeholder="Zip Code"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={addressForm.email}
                      onChange={handleAddressChange}
                      placeholder="Email"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm email</label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={addressForm.confirmEmail}
                      onChange={handleAddressChange}
                      placeholder="Confirm email"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                {/* Phone with Country Code */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Country Code</label>
                    <select
                      name="countryCode"
                      value={addressForm.countryCode}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    >
                      <option value="">Select a country code</option>
                      {countryCodes.map(code => (
                        <option key={code.code + code.country} value={code.code}>
                          {code.code} - {code.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={addressForm.phoneNumber}
                      onChange={handleAddressChange}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save Address
                </button>
              </form>
            </div>
          )}
          
          {/* Edit Address Form */}
          {showEditAddress && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
              <form className="space-y-4">
                {/* Country Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">Country or region</label>
                  <select 
                    name="country"
                    value={editAddressForm.country}
                    onChange={handleEditAddressChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editAddressForm.firstName}
                      onChange={handleEditAddressChange}
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editAddressForm.lastName}
                      onChange={handleEditAddressChange}
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                {/* Address Fields */}
                <div>
                  <label className="block text-sm font-medium mb-1">Street address</label>
                  <input
                    type="text"
                    name="street_address"
                    value={editAddressForm.street_address}
                    onChange={handleEditAddressChange}
                    placeholder="Street address"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Street address 2 (optional)</label>
                  <input
                    type="text"
                    name="street_address_2"
                    value={editAddressForm.street_address_2}
                    onChange={handleEditAddressChange}
                    placeholder="Street address 2 (optional)"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                
                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={editAddressForm.city}
                      onChange={handleEditAddressChange}
                      placeholder="City"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State/Province/Region</label>
                    <input
                      type="text"
                      name="state"
                      value={editAddressForm.state}
                      onChange={handleEditAddressChange}
                      placeholder="State/Province/Region"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={editAddressForm.zipCode}
                      onChange={handleEditAddressChange}
                      placeholder="Zip Code"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editAddressForm.email}
                      onChange={handleEditAddressChange}
                      placeholder="Email"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm email</label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={editAddressForm.confirmEmail}
                      onChange={handleEditAddressChange}
                      placeholder="Confirm email"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                {/* Phone with Country Code */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Country Code</label>
                    <select
                      name="countryCode"
                      value={editAddressForm.countryCode}
                      onChange={handleEditAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    >
                      <option value="">Select a country code</option>
                      {countryCodes.map(code => (
                        <option key={code.code + code.country} value={code.code}>
                          {code.code} - {code.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editAddressForm.phoneNumber}
                      onChange={handleEditAddressChange}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="button" 
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                      // In a real app, you would save the edited address
                      setShowEditAddress(false);
                    }}
                  >
                    Update
                  </button>
                  <button 
                    type="button" 
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                    onClick={() => setShowEditAddress(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Pay With</h2>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            {/* Payment Methods */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'VISA'}
                  onChange={() => handlePaymentMethodChange('VISA')}
                  className="h-4 w-4"
                />
                <span>VISA</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Paypal'}
                  onChange={() => handlePaymentMethodChange('Paypal')}
                  className="h-4 w-4"
                />
                <span>Paypal</span>
              </label>
            </div>
            
            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <label htmlFor="acceptTerms" className="text-sm">
                I agree to the Terms Conditions, Refund Policy & Privacy policy
              </label>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <a 
                href="/" 
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span>Return to shop</span>
              </a>
              
              {/* PayPal Button Container */}
              {paymentMethod === 'Paypal' && (
                <div id="paypal-button-container" className="w-full md:w-auto"></div>
              )}
              
              <button
                onClick={handleProceedToPayment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium w-full md:w-auto"
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Still, Have A Question?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-2">Contact info.</h4>
            <p>Los Angeles, CA</p>
            <p>800tridefair</p>
            <p>info@tridefair.com</p>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p>Home</p>
            <p>Contact Us</p>
            <p>Blogs</p>
            <p>FAQs</p>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            <p>Electronics</p>
            <p>Fashion</p>
            <p>Collectibles & Art</p>
            <p>Digital Store</p>
          </div>
          
          {/* Latest News */}
          <div>
            <h4 className="font-semibold mb-2">Latest News</h4>
            <p>Terms Conditions</p>
            <p>Privacy policy</p>
            <p>About us</p>
            <p>Refund Policy</p>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-8">
          <h4 className="font-semibold mb-2">Subscribe To Our Newsletter</h4>
          <p className="mb-4">Subscribe our newsletter for coupon, offer and exciting promotional discount.</p>
          
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email to Subscribe"
              className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;