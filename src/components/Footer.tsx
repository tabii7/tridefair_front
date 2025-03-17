import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const links = {
    'Buy': [
      'Registration',
      'Bidding & Buying Help',
      'Stores',
      'Gift Cards'
    ],
    'Sell': [
      'Start Selling',
      'How to Sell',
      'Business Sellers',
      'Affiliates'
    ],
    'About Tridefair': [
      'Company Info',
      'News',
      'Careers',
      'Policies',
      'Advertise with us'
    ],
    'Help & Contact': [
      'Seller Center',
      'Contact Us',
      'Returns',
      'Money Back Guarantee'
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-bold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link to="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <div className="text-sm">
              <span>© 2024 Tridefair. All rights reserved.</span>
              <div className="flex items-center space-x-4 mt-2">
                <Link to="#" className="hover:text-white">Privacy Policy</Link>
                <Link to="#" className="hover:text-white">Terms of Service</Link>
                <Link to="#" className="hover:text-white">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;