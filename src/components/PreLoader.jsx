import React from "react";

const PreLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <span className="ml-4 text-lg font-semibold text-blue-700">Loading...</span>
  </div>
);

export default PreLoader;
