import React from "react";
import TopBar from "../components/TopBar";
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      <MapBackground />
      <Logo />
      <TopBar />
    </div>
  );
} 