import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CentralAddButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        size="lg"
        className="w-20 h-20 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg"
        onClick={() => navigate(createPageUrl("PublishTrip"))}
      >
        <Plus className="w-12 h-12" />
      </Button>
    </div>
  );
} 