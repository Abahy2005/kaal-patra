import React from "react";
import time from "./assets/time.png";
function FeaturesPage() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12">
          Kaalpatra Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Decentralized Storage"
            description="Kaalpatra uses decentralized storage technology to ensure that your memories and messages are stored securely and are easily accessible to you or your loved ones in the future."
            icon="https://img.icons8.com/cute-clipart/64/000000/cloud.png"
          />
          <FeatureCard
            title="Encryption"
            description="Kaalpatra encrypts your messages and memories using advanced encryption algorithms, ensuring that your personal data is secure and private."
            icon="https://img.icons8.com/cute-clipart/64/000000/lock.png"
          />
          <FeatureCard
            title="Time Capsule"
            description="Kaalpatra provides a unique and innovative way to capture and preserve your memories and messages for future generations. You can create a time capsule and choose when it will be opened, ensuring that your messages and memories are only shared when you want them to be."
            icon={time}
          />
          <FeatureCard
            title="Blockchain Technology"
            description="Kaalpatra is built on blockchain technology, which provides a secure and transparent way to store and share data. This ensures that your messages and memories are tamper-proof and can be verified by anyone in the future."
            icon="https://img.icons8.com/cute-clipart/64/000000/blockchain-technology.png"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img src={icon} alt={`${title} icon`} className="h-10 w-10 mr-4" />
        <h2 className="text-xl font-extrabold">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeaturesPage;
