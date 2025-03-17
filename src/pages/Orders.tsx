import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Star, Download, Truck } from 'lucide-react';

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-02-07',
      total: 599.98,
      status: 'Delivered',
      items: [
        {
          id: 1,
          title: 'Premium Product 1',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
          quantity: 2
        }
      ],
      tracking: '1Z999AA1234567890',
      deliveryDate: '2024-02-05'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-02-01',
      total: 199.99,
      status: 'In Transit',
      items: [
        {
          id: 2,
          title: 'Premium Product 2',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
          quantity: 1
        }
      ],
      tracking: '1Z999AA1234567891',
      deliveryDate: '2024-02-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow">
            {/* Order Header */}
            <div className="border-b p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <h2 className="font-semibold">Order {order.id}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  <button className="text-blue-600 text-sm hover:underline flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Invoice
                  </button>
                </div>
              </div>
            </div>

            {/* Order Items */}
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="font-medium hover:text-blue-600">
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <div className="mt-2">
                    <button className="text-sm text-blue-600 hover:underline mr-4">
                      Write a Review
                    </button>
                    <button className="text-sm text-blue-600 hover:underline">
                      Buy Again
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}

            {/* Tracking Info */}
            <div className="border-t p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span>Tracking Number: {order.tracking}</span>
                </div>
                <button className="flex items-center text-blue-600 hover:underline">
                  Track Package
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;