import React from "react";

export default function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
      
      {/* 3D-like map elements */}
      <div className="absolute inset-0">
        {/* Buildings */}
        <div className="absolute top-1/4 left-1/3 w-16 h-20 bg-gradient-to-r from-gray-300 to-gray-400 transform rotate-12 opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-16 bg-gradient-to-r from-gray-300 to-gray-400 transform -rotate-6 opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-24 bg-gradient-to-r from-gray-300 to-gray-400 transform rotate-3 opacity-35"></div>
        
        {/* Roads */}
        <div className="absolute top-1/2 left-0 w-full h-8 bg-gradient-to-r from-gray-400 to-gray-500 transform -rotate-12 opacity-60"></div>
        <div className="absolute top-2/3 left-0 w-full h-6 bg-gradient-to-r from-gray-400 to-gray-500 transform rotate-6 opacity-50"></div>
        
        {/* Road markings */}
        <div className="absolute top-1/2 left-1/4 w-16 h-1 bg-white transform -rotate-12 opacity-80"></div>
        <div className="absolute top-1/2 left-2/4 w-16 h-1 bg-white transform -rotate-12 opacity-80"></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-1 bg-white transform -rotate-12 opacity-80"></div>
      </div>
      
      {/* Truck with location pin */}
      <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        {/* Truck */}
        <div className="relative">
          <div className="w-12 h-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm shadow-lg transform rotate-45"></div>
          <div className="absolute -top-1 -right-1 w-4 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-sm"></div>
        </div>
        
        {/* Location pin shadow */}
        <div className="absolute top-12 left-6 w-8 h-4 bg-gray-600 rounded-full opacity-30 blur-sm"></div>
      </div>
      
      {/* Large location pin */}
      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
        <div className="relative">
          {/* Pin */}
          <div className="w-16 h-20 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-full rounded-b-none shadow-xl relative">
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
          </div>
          {/* Pin point */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-yellow-600"></div>
          {/* Shadow */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-600 rounded-full opacity-40 blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
