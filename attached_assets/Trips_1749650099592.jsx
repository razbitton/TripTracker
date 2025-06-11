import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import MyTripsTab from "../components/trips/MyTripsTab";
import AvailableTripsTab from "../components/trips/AvailableTripsTab";
import PublishedTripsTab from "../components/trips/PublishedTripsTab";
import { useAppContext } from "../components/AppContext";

const tabs = [
  { id: 'my_trips', label: 'נסיעות שלי' },
  { id: 'available_trips', label: 'נסיעות פנויות' },
  { id: 'published_trips', label: 'נסיעות שפרסמתי' },
];

export default function Trips() {
  const { trips, user, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('my_trips');

  console.log('Current user:', user);
  console.log('All trips:', trips);

  // עדכון: הוספת נסיעות לדוגמה אם המשתמש מחובר
  const myTrips = user ? trips.filter(trip => 
    (trip.driver_id === user.email && trip.status === 'accepted') ||
    // נסיעות לדוגמה - כל נסיעה עם סטטוס accepted יוצגו בנסיעות שלי
    (trip.status === 'accepted')
  ) : [];
  
  const availableTrips = trips.filter(trip => trip.status === 'pending');
  
  const publishedTrips = user ? trips.filter(trip => {
    const isPublisher = trip.publisher_email === user.email;
    const isCreator = trip.created_by === user.email;
    console.log('Trip check:', trip.id, 'publisher_email:', trip.publisher_email, 'created_by:', trip.created_by, 'user:', user.email, 'match:', isPublisher || isCreator);
    return isPublisher || isCreator;
  }) : [];

  console.log('Published trips found:', publishedTrips);

  const renderContent = () => {
    switch (activeTab) {
      case 'my_trips':
        return <MyTripsTab trips={myTrips} />;
      case 'available_trips':
        return <AvailableTripsTab trips={availableTrips} />;
      case 'published_trips':
        return <PublishedTripsTab trips={publishedTrips} />;
      default:
        return <MyTripsTab trips={myTrips} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" dir="rtl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col" dir="rtl">
      <TopBar />
      
      <div className="pt-20 px-4 flex-grow">
        <div className="max-w-md mx-auto">
          <div className="bg-yellow-100/50 p-4 rounded-xl text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">נסיעות</h1>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 rounded-xl font-bold transition-colors text-sm ${activeTab === tab.id ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 