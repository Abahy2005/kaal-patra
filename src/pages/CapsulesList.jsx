import React, { useState, useEffect } from "react";

function CapsuleItem({ capsule, onDelete, index }) {
  const { file, expiryTime, uploadUrl } = capsule;
  const [remainingTime, setRemainingTime] = useState(Math.max(0, expiryTime - Date.now()));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Math.max(0, expiryTime - Date.now());
      setRemainingTime(time);
      setIsExpired(time <= 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  // Convert IPFS URL to IPFS gateway URL
  const gatewayUrl = uploadUrl.replace("ipfs://", "https://ipfs.io/ipfs/");

  const viewable = isExpired && expiryTime > 0;

  return (
    <li className="py-4 flex">
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{`Time-Capsule: ${index + 1}`}</p>
        {remainingTime > 0 && (
          <p className="text-sm text-gray-500">
            Unlock in {Math.floor(remainingTime / 1000)} seconds...
          </p>
        )}
        {viewable && (
          <a
            href={gatewayUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 mt-2 mx-2"
          >
            View uploaded file
          </a>
        )}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 mt-2"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

function CapsulesList({ capsules, onReset }) {
  const handleReset = (index) => {
    onReset(index);
  };

  return (
    <ul className="mt-4 border-t border-gray-200 divide-y divide-gray-200">
      {capsules.map((capsule, index) => (
        <CapsuleItem
          key={index}
          capsule={capsule}
          index={index}
          onDelete={() => handleReset(index)}
        />
      ))}
    </ul>
  );
}

export default CapsulesList;
