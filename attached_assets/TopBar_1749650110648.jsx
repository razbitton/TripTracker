import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SideMenu from "./SideMenu";

export default function TopBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-40 p-4 flex justify-between items-center">
        <Button 
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-10 py-4 rounded-lg shadow-lg text-xl"
          onClick={() => navigate(createPageUrl("Billing"))}
        >
          חיוב
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 w-16 h-16"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-14 h-14 text-gray-700" />
        </Button>
      </div>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
} 