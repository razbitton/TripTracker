import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Links() {
  const navigate = useNavigate();

  const links = [
    {
      title: "שירות לקוחות",
      description: "צור קשר עם שירות הלקוחות שלנו",
      icon: Phone,
      color: "bg-blue-500",
      action: () => window.open("tel:*2222")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4" dir="rtl">
      <div className="max-w-md mx-auto pt-8 pb-32">
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Home"))}
            className="rounded-full"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">קישורים חשובים</h1>
        </div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <Card 
              key={index} 
              className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={link.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-500">{link.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg border-0 mt-8">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-t-lg">
            <CardTitle className="text-center">אפליקציית דרייביט</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">
              משאיות זמינות 24/7 בכל רחבי הארץ
            </p>
            <p className="text-sm text-gray-500">
              גרסה 1.0.0
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 