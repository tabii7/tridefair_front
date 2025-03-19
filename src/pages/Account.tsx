import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  Settings,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";

const Account = () => {
  const [location, setLocation] = useState("Fetching location..."); // Default loading message
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("trideFairUser") || "{}");
  const user = {
    name: loginUser?.name,
    email: loginUser?.email,
    // profileImage: loginUser?.profile_pic,
    profileImage:
      "data:image/png;base64,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",
    // joined: "January 2024",
    location: location,
  };

  const menuItems = [
    { icon: Package, label: "Orders", link: "/orders", count: 5 },
    { icon: Heart, label: "Wishlist", link: "/wishlist", count: 12 },
    { icon: CreditCard, label: "Payment Methods", link: "/payments" },
    { icon: MapPin, label: "Addresses", link: "/addresses" },
    { icon: Bell, label: "Notifications", link: "/notifications", count: 3 },
    { icon: Shield, label: "Security", link: "/security" },
    { icon: Settings, label: "Settings", link: "/settings" },
  ];

  useEffect(() => {
    // Automatically fetch location when the component mounts
    getLocation();
  }, []); // Empty dependency array ensures this runs only once on mount

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name || "Address unavailable"; // Return the address or a fallback
    } catch (error) {
      return "Address unavailable"; // Handle fetch errors
    }
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch address using reverse geocoding
          const address = await getAddress(latitude, longitude);
          setLocation(address); // Update location state with the fetched address
        },
        (error) => {
          setLocation("Location unavailable"); // Handle errors
        }
      );
    } else {
      setLocation("Geolocation not supported"); // Handle lack of geolocation support
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <img src={user?.profileImage} alt="User" />
                {/* <User className="h-10 w-10 text-gray-500" /> */}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                {/* <p className="text-sm text-gray-400">
                  Member since {user.joined}
                </p> */}
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {user.location}
              </div>
              <button
                className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                onClick={() => {
                  localStorage.removeItem("trideFairToken");
                  localStorage.removeItem("trideFairUserId");
                  localStorage.removeItem("trideFairUser");
                  navigate("/login");
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <item.icon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                      {item.count}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
