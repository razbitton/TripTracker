import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Input } from "@/components/ui/input";

export default function Billing() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [addFivePercent, setAddFivePercent] = useState(true); // Changed default to true
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const price = addFivePercent ? numericAmount * 1.05 : numericAmount;
    setFinalPrice(price);
  }, [amount, addFivePercent]);

  return (
    <div className="min-h-screen bg-gray-100 p-4" dir="rtl">
      <div className="max-w-md mx-auto pt-8 pb-40">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Home"))}
            className="rounded-full w-16 h-16"
          >
            <ArrowRight className="w-12 h-12" />
          </Button>
          <h1 className="text-4xl font-bold text-gray-900">חיוב</h1>
        </div>

        <div className="text-center space-y-8">
          <div className="bg-yellow-100 p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900">חיוב בכרטיסי אשראי</h2>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-800">ציון הסכום בשקלים</h3>
            
            <div className="relative max-w-xs mx-auto">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-24 text-4xl text-right pr-6 pl-20 bg-white rounded-xl border-gray-300 border-2"
              />
              <Edit className="w-14 h-14 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            
            <div 
              className="flex items-center justify-center gap-4 cursor-pointer p-4"
              onClick={() => setAddFivePercent(!addFivePercent)}
            >
              <div className={`w-10 h-10 rounded-full border-4 ${addFivePercent ? 'border-red-500 bg-red-500' : 'border-gray-400'}`}></div>
              <span className="text-2xl font-bold text-gray-900">הוספת 5%</span>
            </div>
          </div>

          <Card className="bg-yellow-100 border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">מחיר סופי לתשלום: </span>
                <span className="text-5xl font-bold text-gray-900">₪{finalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-6">
            <Button className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold py-6 text-2xl rounded-xl">
              ביטול
            </Button>
            <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-2xl rounded-xl">
              חיוב
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 