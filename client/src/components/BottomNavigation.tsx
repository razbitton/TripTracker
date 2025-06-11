import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, Bell, Home } from "lucide-react";
import { useLocation } from "wouter";
import { createPageUrl } from "@/utils";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { icon: ExternalLink, path: "links" },
    { icon: User, path: "profile" },
    { icon: Bell, path: "notifications", hasNotification: true },
    { icon: Home, path: "home" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 px-4 z-40 pointer-events-none">
      <div className="relative w-full h-full max-w-md mx-auto">
        <div 
          className="absolute bottom-0 w-full h-24 bg-white rounded-3xl shadow-lg"
          style={{
            maskImage: 'radial-gradient(circle at 50% 0, transparent 50px, black 52px)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 0, transparent 50px, black 52px)',
          }}
        ></div>
        <div className="absolute bottom-0 w-full h-24 flex justify-around items-center pointer-events-auto">
          {navItems.slice(0, 2).map((item) => {
            const isActive = location === createPageUrl(item.path);
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="icon"
                className={`relative p-4 w-16 h-16 ${isActive ? 'text-yellow-500' : 'text-gray-600'}`}
                onClick={() => setLocation(createPageUrl(item.path))}
              >
                <item.icon className="w-16 h-16" />
              </Button>
            );
          })}
          
          <div className="w-28"></div>
          
          {navItems.slice(2).map((item) => {
            const isActive = location === createPageUrl(item.path);
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="icon"
                className={`relative p-4 w-16 h-16 ${isActive ? 'text-yellow-500' : 'text-gray-600'}`}
                onClick={() => setLocation(createPageUrl(item.path))}
              >
                <item.icon className="w-16 h-16" />
                {item.hasNotification && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full"></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
