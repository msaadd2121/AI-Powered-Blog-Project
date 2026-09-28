import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-0 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 sm:gap-10 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quickblog</h2>

            <p className="text-gray-600 text-sm leading-6 mt-6 max-w-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              <br className="hidden sm:block" />
              Rerum unde quaerat eveniet cumque accusamus atque qui
              <br className="hidden sm:block" />
              error quo enim fugiat?
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-5">Quick Links</h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <a href="#">Home</a>
              <a href="#">Best Sellers</a>
              <a href="#">Offers & Deals</a>
              <a href="#">Contact Us</a>
              <a href="#">FAQs</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-5">Need Help?</h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <a href="#">Delivery Information</a>
              <a href="#">Return & Refund Policy</a>
              <a href="#">Payment Methods</a>
              <a href="#">Track your Order</a>
              <a href="#">Contact Us</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-5">Follow Us</h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-10 pt-5 text-center text-sm text-gray-500">
          Copyright 2025 © QuickBlog GreatStack - All Right Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
