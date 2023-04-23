import cap from "../assets/capsule.png";
import logo from "../assets/kaalpatra.png";
import blockChain from "../assets/blockchain.jpg";
import { useNavigate } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import Web3 from "web3";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const handleConnect = () => {
    // connect the wallet here
    navigate("/how");
  };
  const gotoabout= () => {
    navigate("./about");
  }
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      // Check if the user has a wallet installed
      if (!window.ethereum) {
        alert("Please install MetaMask to connect your wallet.");
        return;
      }

      // Create an instance of the Web3 class
      const web3 = new Web3(window.ethereum);

      // Request user permission to access their wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Retrieve the user's account address
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Redirect to the dashboard page
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hidden sm:block min-h-screen bg-[url('../assets/bg3.gif')] text-white ">
      <header className="w-full py-4 bg-opacity-0">
        <div className="container mx-auto flex justify-between items-center px-4 ">
          <div className="flex items-center">
            <img className=" shadow-2xl  " src={logo} alt="Kaalpatra" />
          </div>
          <div className="flex items-center">
          <button className="btnS" onClick={gotoabout}>
                AboutUs
              </button>
          <div className="flex items-center">
            {account ? (
              <p>Connected account: {account}</p>
            ) : (
              <button className="btnS" onClick={connectWallet}>
                Connect wallet
              </button>
            )}
          </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4">
        <div
          className="h-screen bg-cover bg-no-repeat bg-center w-full flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('/images/bg.jpg')",
            opacity: "0.8",
          }}
        >
          <h1 className="text-6xl font-bold leading-tight">
            Store your memories securely on the blockchain
          </h1>
          <p className="mt-5 text-xl">
            A decentralized time capsule for your precious moments.
          </p>
          <div className="mt-8">
            <a href="#intoContainer">
              <button className="btnS text-white py-2 px-6 opacity-90 rounded">
                {/* <FiPlus className="inline-block mr-2" /> */}
                Get Started!
              </button>
            </a>
          </div>
        </div>

        <div
          id="intoContainer"
          className="bg-gray-900 w-full py-16 rounded-xl bg-opacity-90 bg-cover backdrop-blur-lg rounded-b-none"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">What is Kaalpatra?</h2>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
              <div className="max-w-lg lg:mr-10">
                <h3 className="text-2xl font-bold mb-4">
                  A Time Capsule on the Blockchain
                </h3>
                <p className="text-lg">
                  Kaalpatra is a decentralized time capsule that allows you to
                  store your memories securely on the blockchain. It ensures
                  that your data is tamper-proof and can be accessed by you or
                  your loved ones at any time in the future.
                </p>
              </div>
              <img
                className="rounded-2xl shadow-2xl"
                src={cap}
                alt="Time Capsule"
                width={450}
                height={250}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
              <img
                className="rounded-2xl shadow-2xl"
                src={blockChain}
                alt="Blockchain"
                width={450}
                height={250}
              />

              <div className="max-w-lg lg:ml-10">
                <h3 className="text-2xl font-bold mb-4">How Does It Work?</h3>
                <p className="text-lg">
                  Kaalpatra uses blockchain technology to ensure the security
                  and immutability of your data. When you create a time capsule,
                  it is stored on the Ethereum blockchain, which means that it
                  is completely decentralized and cannot be tampered with.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 w-full py-16 rounded-2xl bg-opacity-90 bg-cover backdrop-blur-lg rounded-t-none">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Want to know How it Works?
            </h2>
            <div className="flex justify-center">
              <button className="btnS" onClick={handleConnect}>
                Read Docs!
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-gray-900 w-full py-10 sm:py-12 rounded-2xl mt-4 rounded-b-none">
          <div className="container mx-auto text-center flex justify-center items-center">
            <p className="text-gray-500 text-sm mr-2">Made with ❤️ by</p>
            <img
              className=""
              src={logo}
              alt="Kaalpatra"
              width={100}
              height={100}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
