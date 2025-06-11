import React from "react";

export default function Logo() {
  return (
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-700">דרייביט</h1>
        <div className="w-8 h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-full rounded-b-none relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-600"></div>
        </div>
      </div>
    </div>
  );
}
