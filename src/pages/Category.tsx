import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Sliders, ChevronDown } from "lucide-react";
import httpHome from "../Api/httpHome"; // Import your API service
import { categoryProducts$ } from "../store/categoryProducts";
import { observer } from "@legendapp/state/react";

const Category = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [condition, setCondition] = useState("all");
  const [products, setProducts] = useState([]); // State for filtered products
  const [originalProducts, setOriginalProducts] = useState([]); // State for original products
  const [subcategories, setSubcategories] = useState([]); // State for subcategories
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [category, setCategory] = useState([]);
  const productsApi = httpHome(); // Initialize your API service

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await productsApi.categoryProducts(id); // Call the API

        if (response.status === 1) {
          // Ensure the data structure is correct
          if (response.data) {
            // setProducts(response.data.products.data || []);
            setOriginalProducts(response.data.products.data || []); // Store original products
            categoryProducts$.categoryProducts.set(
              response.data.products.data || []
            );
            setSubcategories(response.data.subcategories || []);
            setCategory(response.data.category || []);
          } else {
            console.log("Invalid data structure in API response.");
          }
        } else {
          setError("Failed to fetch data. Please reload.");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        setError("Failed to fetch data. Please reload.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }
  if (categoryProducts$?.categoryProducts?.get().length == 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>No Product Found</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const isDigitalCategory = id == 4;

  const sortByFilter = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedProducts = [...products].sort((a: any, b: any) => {
      if (sortBy === "price_low") {
        return a.product_price - b.product_price;
      } else if (sortBy === "price_high") {
        return b.product_price - a.product_price;
      } else if (sortBy === "rating") {
        return b.avg_ratting - a.avg_ratting;
      } else {
        return 0;
      }
    });
    setProducts(sortedProducts);
  };

  const priceRangeFilter = (val: string) => {
    setPriceRange(val);
    if (val === "all") {
      // Reset to original products
      // setProducts(originalProducts);
      setProducts(categoryProducts$.categoryProducts.get());
    } else {
      const [minPrice, maxPrice] = val.split("-").map(Number);
      // const filteredProducts = originalProducts.filter(
      const filteredProducts = categoryProducts$?.categoryProducts
        ?.get()
        .filter(
          (product) =>
            product.product_price >= minPrice &&
            (maxPrice ? product.product_price <= maxPrice : true)
        );
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {isDigitalCategory
              ? "Digital Marketplace"
              : category.category_name?.charAt(0).toUpperCase() +
                category.category_name?.slice(1)}
          </h1>
          {isDigitalCategory && (
            <p className="text-gray-600 text-lg">
              Elevate Your Craft with Quality Digital Designs
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => sortByFilter(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Sliders className="h-5 w-5" />
              <h2 className="font-semibold">Filters</h2>
            </div>

            {isDigitalCategory ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  {Object.entries(subcategories).map(([key, category]) => (
                    <div key={key} className="mb-4">
                      <h4 className="text-sm font-medium mb-2 text-blue-600">
                        {category.subcategory_name}
                      </h4>
                      <div className="space-y-2 pl-2">
                        {/* {category.subcategories.map((sub) => (
                          <label key={sub} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded text-blue-600" />
                            <span className="text-gray-700">{sub}</span>
                          </label>
                        ))} */}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <select
                    value={priceRange}
                    onChange={(e) => priceRangeFilter(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-10">Under $10</option>
                    <option value="10-25">$10 to $25</option>
                    <option value="25-50">$25 to $50</option>
                    <option value="50+">Over $50</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-medium mb-2">File Format</h3>
                  <div className="space-y-2">
                    {["PNG", "JPG", "SVG", "PSD", "AI", "PDF", "TTF/OTF"].map(
                      (format) => (
                        <label
                          key={format}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">{format}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Original filters for non-digital categories
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <select
                    value={priceRange}
                    onChange={(e) => priceRangeFilter(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-100">Under $100</option>
                    <option value="100-500">$100 to $500</option>
                    <option value="500-1000">$500 to $1000</option>
                    <option value="1000+">Over $1000</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Condition</h3>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Conditions</option>
                    <option value="new">New</option>
                    <option value="used_like_new">Used - Like New</option>
                    <option value="used_good">Used - Good</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Free Shipping</h3>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Show only items with free shipping</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts$?.categoryProducts?.get()?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img
                      src={
                        product.productimage?.[0]?.image ||
                        "https://via.placeholder.com/500"
                      }
                      alt={product.product_name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-2">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{product.avg_ratting || 0}</span>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviews?.length || 0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        ${product.product_price}
                      </span>
                      {product.discounted_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.discounted_price}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      {product.category_name}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Category);
