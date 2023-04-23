import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Web3 from "web3";
import { useDropzone } from "react-dropzone";
import { useStorageUpload } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Your original useEffect for loading the connected wallet
  useEffect(() => {
    const loadConnectedWallet = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const balance = await web3.eth.getBalance(accounts[0]);
          setBalance(web3.utils.fromWei(balance, "ether"));
        } else {
          alert("No wallet connected. Redirecting to homepage...");
          navigate("/");
        }
      } else {
        alert("No wallet detected. Redirecting to homepage...");
        navigate("/");
      }
    };

    loadConnectedWallet();
  }, [navigate]);

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".mp3", ".mp4", ".mkv"];
  const [file, setFile] = useState(() => {
    const storedFile = localStorage.getItem("file");
    return storedFile ? JSON.parse(storedFile) : null;
  });
  const [timeLimit, setTimeLimit] = useState(() => {
    const storedTimeLimit = localStorage.getItem("timeLimit");
    return storedTimeLimit ? Number(storedTimeLimit) : 60;
  });
  const [capsules, setCapsules] = useState(() => {
    const storedCapsules = localStorage.getItem("capsules");
    return storedCapsules ? JSON.parse(storedCapsules) : [];
  });

  const { mutateAsync: upload } = useStorageUpload({
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(percentCompleted);
    },
  });

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    const fileExtension = selectedFile.name.match(/\.[0-9a-z]+$/i)[0];
    const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(fileExtension);
    const isSizeAllowed = selectedFile.size <= MAX_FILE_SIZE;
    if (isExtensionAllowed && isSizeAllowed) {
      setFile(selectedFile);
    } else if (!isExtensionAllowed) {
      alert(
        "Invalid file extension. Allowed extensions are: " +
          ALLOWED_EXTENSIONS.join(", ")
      );
    } else if (!isSizeAllowed) {
      alert("File size must be less than 100MB.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileUpload = async () => {
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 100MB.");
      return;
    }

    try {
      const response = await upload({ data: [file] });
      const uploadUrl = response[0];

      const uploadTime = Date.now();
      const expiryTime = uploadTime + timeLimit * 1000;
      const capsule = {
        file,
        timeLimit,
        uploadTime,
        expiryTime,
        uploadUrl,
      };
      setCapsules([...capsules, capsule]);
      setFile(null);

      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload the file. Please try again.");
    } finally {
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedCapsules = capsules.map((capsule) => {
        const remainingTime = capsule.expiryTime - Date.now();
        return {
          ...capsule,
          remainingTime: remainingTime > 0 ? remainingTime : 0,
          viewable: remainingTime <= 0,
        };
      });
      setCapsules(updatedCapsules);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [capsules]);

  const logout = () => {
    // Navigate back to the home page
    navigate("/");
  };

  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  const handleReset = (index) => {
    const updatedCapsules = capsules.filter((_, i) => i !== index);
    setCapsules(updatedCapsules);
  };

  useEffect(() => {
    localStorage.setItem("capsules", JSON.stringify(capsules));
  }, [capsules]);

  useEffect(() => {
    localStorage.setItem("timeLimit", timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    localStorage.setItem("file", JSON.stringify(file));
  }, [file]);

  const [activeCapsules, setActiveCapsules] = useState(() => {
    const activeCapsulesCount = capsules.filter(
      (capsule) => capsule.remainingTime > 0
    ).length;
    return activeCapsulesCount;
  });

  useEffect(() => {
    const activeCapsulesCount = capsules.filter(
      (capsule) => capsule.remainingTime > 0
    ).length;
    setActiveCapsules(activeCapsulesCount);
  }, [capsules]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 hidden sm:block">
              Welcome to the Dashboard
            </h1>
            {account && (
              <div className="flex flex-row sm:flex-row items-center justify-between">
                <Link to="/capsules">
                  <div className="relative inline-block items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                      />
                    </svg>

                    {activeCapsules > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {activeCapsules}
                      </span>
                    )}
                  </div>
                </Link>

                <button
                  className="bg-red-500 ml-4 text-white px-3 py-1 rounded hover:bg-red-400"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div
          {...getRootProps()}
          className="text-black flex flex-col border-4 border-dashed w-full h-32 py-12 items-center justify-center"
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-lg font-medium text-gray-900">{file.name}</p>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 30.5V35c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4.5M24 11c3.866 0 7 3.134 7 7v3h-2v-3c0-2.757-2.243-5-5-5s-5 2.243-5 5v3h-2v-3c0-3.866 3.134-7 7-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M23.999 26.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zM31.495 14.008a2 2 0 112.83 2.83l-4.248 4.249a2 2 0 01-2.828 0 2 2 0 010-2.828l4.246-4.251zM16.662 28.842a2 2 0 112.83-2.83l4.246 4.251a2 2 0 010 2.828 2 2 0 01-2.828 0l-4.248-4.249z"
                />
              </svg>
              <p className="text-lg font-medium text-gray-900">
                Drag and drop a file
              </p>
              <span>File Must be less than 100MB!</span>
              <span>Only Jpg, ".Jpeg", Png, Gif, Mp3, Mp4</span>
            </>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="timeLimit"
            className="block text-sm font-medium text-gray-700"
          >
            Time limit
          </label>
          <select
            id="timeLimit"
            value={timeLimit}
            onChange={handleTimeLimitChange}
            className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
            <option value={1800}>30 minutes</option>
            <option value={3600}>60 minutes</option>
            <option value={25920000}>30 Days</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            className={`relative w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              uploadProgress > 0 ? "bg-green-500" : ""
            }`}
            onClick={handleFileUpload}
          >
            {uploadProgress > 0 && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-500"
                style={{
                  width: `${uploadProgress}%`,
                }}
              ></div>
            )}
            <span className="relative">
              {uploadProgress > 0 ? `${uploadProgress}%` : "Upload"}
            </span>
          </button>
        </div>

        {/* Remove CapsulesList and Add link to /capsules */}
        {capsules.length > 0 && (
          <div className="mt-8">
            <Link
              to="/capsules"
              className="hover:bg-blue-400 text-white bg-blue-500 p-2 rounded"
            >
              View Your Capsules: {activeCapsules}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
