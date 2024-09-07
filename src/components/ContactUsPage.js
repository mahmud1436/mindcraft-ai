import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          For any inquiries, feel free to reach us at support@mindcraft.com or call us at (123) 456-7890.
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Your Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Your Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
