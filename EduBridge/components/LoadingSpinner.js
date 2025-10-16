import React from "react";

const LoadingSpinner = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-gray-300 font-medium">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
