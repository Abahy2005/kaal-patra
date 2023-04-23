import React, { useEffect, useState } from "react";
import CapsulesList from "./CapsulesList";

function CapsulePage() {
  const [capsules, setCapsules] = useState(() => {
    const storedCapsules = localStorage.getItem("capsules");
    return storedCapsules ? JSON.parse(storedCapsules) : [];
  });

  const handleReset = (id) => {
    const newCapsules = capsules.filter((_, index) => index !== id);
    setCapsules(newCapsules);
  };

  useEffect(() => {
    localStorage.setItem("capsules", JSON.stringify(capsules));
  }, [capsules]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Capsules</h1>
        </div>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {capsules.length > 0 ? (
            <CapsulesList
              capsules={capsules.map((capsule, index) => ({
                ...capsule,
                number: index + 1,
              }))}
              onReset={handleReset}
            />
          ) : (
            <p className="text-gray-600">No capsules found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CapsulePage;
