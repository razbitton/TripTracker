import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TopBar from "../components/TopBar";
import BottomNavigation from "../components/BottomNavigation";
import CentralAddButton from "../components/CentralAddButton";
import { useAppContext } from "../components/AppContext";

export default function Profile() {
  const { user, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: ""
  });

  const channels = [
    { id: 258596, trips: 18 },
    { id: 258558, trips: 25 }
  ];

  useEffect(() => {
    if(user) {
      setFormData({
        full_name: user?.full_name || "חיים חיימוביץ",
        phone: user?.phone || "055.0485965",
        email: user?.email || ""
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col" dir="rtl">
      <TopBar />
      
      <div className="pt-28 pb-40 px-4 flex-grow">
        <div className="max-w-md mx-auto">
          <div className="bg-yellow-100/50 p-6 rounded-xl text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">פרופיל אישי</h1>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              onClick={() => setActiveTab('channels')}
              className={`font-bold py-6 text-2xl rounded-xl ${
                activeTab === 'channels'
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
            >
              משויך לערוצים
            </Button>
            <Button
              onClick={() => setActiveTab('personal')}
              className={`font-bold py-6 text-2xl rounded-xl ${
                activeTab === 'personal'
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
            >
              פרטים אישיים
            </Button>
          </div>

          {activeTab === 'personal' && (
            <div className="space-y-8">
              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">שם המשתמש</h2>
                <div className="h-20 bg-white rounded-xl border border-gray-300 text-right text-2xl p-6 flex items-center">
                  {formData.full_name}
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">טלפון</h2>
                <div className="h-20 bg-white rounded-xl border border-gray-300 text-right text-2xl text-gray-600 p-6 flex items-center">
                  {formData.phone}
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">אימייל</h2>
                <div className="h-20 bg-white rounded-xl border border-gray-300 text-right text-2xl text-gray-600 p-6 flex items-center">
                  {formData.email}
                </div>
              </div>

              <div className="pt-4">
                  <Button
                      onClick={() => alert('בקשתך לשינוי פרטים נשלחה למנהל.')}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-6 text-2xl rounded-xl"
                  >
                      בקשה לשינוי פרטים
                  </Button>
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="space-y-6">
              {channels.map((channel) => (
                <div key={channel.id} className="bg-white p-8 rounded-xl text-center">
                  <h3 className="text-3xl font-bold text-gray-800">
                    ערוץ {channel.id} | {channel.trips} נסיעות
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
      <CentralAddButton />
    </div>
  );
}
