import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpHome from "../Api/httpHome";
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  User,
  Heart,
  Bell,
  ChevronDown,
  Package,
  Settings,
  LogOut,
  Store,
  Home,
  ChevronRight,
  HelpCircle,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { addToCart$ } from "../store/addToCart";
import { observer } from "@legendapp/state/react";
import { categoryProducts$ } from "../store/categoryProducts";
const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [categories, setcategories] = useState([]);

  const [location, setLocation] = useState("Fetching location..."); // Default loading message
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically fetch location when the component mounts
    getLocation();
  }, []); // Empty dependency array ensures this runs only once on mount

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

  const Category = httpHome();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Category.categories();
        setcategories(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const menuSections = [
    {
      title: "My Tridefair",
      items: [
        { name: "Home", icon: Home, link: "/" },
        { name: "Recently Viewed", icon: Package, link: "/recent" },
        { name: "Purchase History", icon: Package, link: "/orders" },
        { name: "Watchlist", icon: Heart, link: "/wishlist" },
        { name: "Selling", icon: Store, link: "/sell" },
      ],
    },
    {
      title: "Categories",
      items: categories.map((cat) => ({
        name: cat?.category_name,
        // icon: cat?.icon,
        icon: Package,
        link: `/category/${cat?.id}`,
      })),
    },
    {
      title: "Help & Settings",
      items: [
        { name: "Customer Service", icon: HelpCircle, link: "/help" },
        { name: "Payment Methods", icon: CreditCard, link: "/payments" },
        { name: "Messages", icon: MessageCircle, link: "/messages" },
        { name: "Account Settings", icon: Settings, link: "/settings" },
      ],
    },
  ];

  const searchproduct = async (query: String) => {
    let requestBody = {
      search_query: query,
    };
    try {
      await Category.searchProducts(requestBody).then((response) => {
        // setcategories(response?.data?.data || []);
        categoryProducts$.categoryProducts.set(response?.data?.data || []);
        categoryProducts$.searchQuery.set(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem("trideFairToken");
    localStorage.removeItem("trideFairUserId");
    localStorage.removeItem("trideFairUser");
    addToCart$.cartItems.set(0);
    navigate("/login");
  };
  return (
    <nav className="bg-blue-900 text-white">
      <div className="">
        {/* Top Bar */}
        <div className="px-4 py-2 flex flex-wrap border-b border-blue-800">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="flex items-center ">
                <button
                  onClick={() => setShowMainMenu(!showMainMenu)}
                  className="p-2 hover:bg-blue-800 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <Link to="/" className="text-2xl font-bold">
                  Tridefair
                </Link>
              </div>

              {/* Main Menu Dropdown */}
              {showMainMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMainMenu(false)}
                  />
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-50 text-gray-800">
                    {menuSections.map((section, index) => (
                      <div key={index} className="py-2">
                        <h3 className="px-4 py-2 text-sm font-semibold text-gray-500">
                          {section.title}
                        </h3>
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.link}
                            className="flex items-center px-4 py-2 hover:bg-gray-100"
                            onClick={() => setShowMainMenu(false)}
                          >
                            {/* <item.icon className="h-5 w-5 mr-3 text-gray-600" /> */}
                            <span>{item.name}</span>
                            <ChevronRight className="h-4 w-4 ml-auto" />
                          </Link>
                        ))}
                        {index < menuSections.length - 1 && (
                          <div className="border-b border-gray-200 my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Search Bar */}
          <div
            className="px-4 py-3 flex items-center space-x-4 sm:w-full md:w-[50%] lg:w-[60%] xl:w-[60%]"
            // style={{ width: "70%" }}
          >
            <div className="flex-1 flex">
              <div className="relative">
                <button
                  className="h-10 px-4 bg-blue-700 text-white rounded-l-lg border-r border-blue-600 flex items-center space-x-1 hover:bg-blue-600"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  <span>All Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showCategories && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                      >
                        {category.category_name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 relative">
                <input
                  name="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 px-4 text-gray-900 focus:outline-none border-0 rounded-r-lg"
                />
                <Search
                  onClick={(e) => searchproduct(searchQuery)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/sell"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <Store className="h-5 w-5" />
              <span>Sell</span>
            </Link>
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-gray-200"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/account"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <button
                    // onClick={() => {
                    //   localStorage.removeItem("trideFairToken");
                    //   localStorage.removeItem("trideFairUserId");
                    //   localStorage.removeItem("trideFairUser");
                    //   navigate("/login");
                    // }}
                    onClick={() => handleSignOut()}
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
            <Bell className="h-5 w-5 cursor-pointer" />
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {addToCart$.cartItems.get()}
              </span>
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div
          className="px-4 py-2 flex items-center space-x-6 text-sm overflow-x-auto bg-blue-800"
          style={{ justifyContent: "center" }}
        >
          {categories.slice(0, 10).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="whitespace-nowrap hover:text-gray-300"
            >
              {category?.category_name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default observer(Navbar);
