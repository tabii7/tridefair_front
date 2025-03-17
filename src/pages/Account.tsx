import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Package, Heart, Settings, CreditCard, 
  MapPin, Bell, Shield, LogOut 
} from 'lucide-react';

const Account = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joined: 'January 2024',
    location: 'Buford, GA 30519'
  };

  const menuItems = [
    { icon: Package, label: 'Orders', link: '/orders', count: 5 },
    { icon: Heart, label: 'Wishlist', link: '/wishlist', count: 12 },
    { icon: CreditCard, label: 'Payment Methods', link: '/payments' },
    { icon: MapPin, label: 'Addresses', link: '/addresses' },
    { icon: Bell, label: 'Notifications', link: '/notifications', count: 3 },
    { icon: Shield, label: 'Security', link: '/security' },
    { icon: Settings, label: 'Settings', link: '/settings' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-400">Member since {user.joined}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {user.location}
              </div>
              <button className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center">
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