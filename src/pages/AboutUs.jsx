import React from "react";
import team from "../assets/team.png";
import mission from "../assets/mission.png";
import future from "../assets/future.png";

const AboutUs = () => {
  return (
    <div className=" bg-[url(../assets/About.gif)]">
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-10 text-center text-white">
            About Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 bg-opacity-10 text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg  bg-cover backdrop-blur-lg">
              <div className="flex justify-center">
                <img className="shadow-lg" src={team} alt="Our Team" />
              </div>
              <h2 className="text-2xl font-semibold mt-4 text-center text-white">
                Meet Our Team
              </h2>
              <p className="mt-4 text-white">
                We are a group of enthusiastic college students who are
                passionate about preserving memories and creating a platform for
                future generations. Our goal is to develop a decentralized time
                capsule platform that empowers people to store their cherished
                memories and messages in a secure and accessible manner.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-10 p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg  bg-cover backdrop-blur-lg">
              <div className="flex justify-center">
                <img className="shadow-lg" src={mission} alt="Our Mission" />
              </div>
              <h2 className="text-2xl font-semibold mt-4 text-center text-white">
                Our Mission
              </h2>
              <p className="mt-4 text-white">
                Our mission is to democratize access to time capsule technology
                by leveraging the power of decentralization. We believe that
                everyone should have the ability to preserve their memories and
                messages for future generations without relying on centralized
                institutions or platforms.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-10 p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg  bg-cover backdrop-blur-lg">
              <div className="flex justify-center">
                <img className="shadow-lg" src={future} alt="future" />
              </div>
              <h2 className="text-2xl font-semibold mt-4 text-center text-white">
                Our Technology
              </h2>
              <p className="mt-4 text-white">
                Our platform utilizes cutting-edge blockchain technology to
                ensure the security, redundancy, and accessibility of all time
                capsules. Each capsule is encrypted and distributed across a
                decentralized network of nodes, ensuring that the data remains
                safe and retrievable for generations to come.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
